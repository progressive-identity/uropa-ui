<template>
  <UButton label="New data transfer" v-on:click="createDataTransfer" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(dataTransfer, index) in processingRecord.dataTransfers" :key="index"
          class="u-grid">
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>
              <UIcon size="24" :path="mdiSwapHorizontal"/>
              {{ dataTransfer.description }}
            </h3>
          </div>
          <GridButtons @edit="editDataTransfer(dataTransfer)" @delete="deleteDataTransfer(index)"/>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiEarth"/>
                Country
              </dt>
              <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ dataTransfer.country.name }}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiGavel"/>
                Type
              </dt>
              <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ dataTransfer.dataTransferLegalBasis.legalBasisType }}
              </dd>
            </div>
            <div v-if="dataTransfer.dataTransferLegalBasis.recipients.dataProcessors.length > 0">
              <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                  <dt class="flex items-center text-sm font-medium text-gray-500">
                    <UIcon :path="mdiAccountWrench"/>
                    Data processors
                  </dt>
                  <ul role="list">
                    <li v-for="dataProcessor in dataTransfer.dataTransferLegalBasis.recipients.dataProcessors"
                        class="flex items-center justify-between text-sm">
                      <div class="flex-1 flex items-center pb-2">
                        <span class="flex-1 truncate">- {{ dataProcessor.legalEntity.name }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </dl>
            </div>
            <div v-if="dataTransfer.dataTransferLegalBasis.recipients.externalOrganizations.length > 0">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiAccountSwitch"/>
                  External organizations
                </dt>
                <ul role="list">
                  <li v-for="externalOrganization in dataTransfer.dataTransferLegalBasis.recipients.externalOrganizations"
                      class="flex items-center justify-between text-sm">
                    <div class="flex-1 flex items-center pb-2">
                      <span class="flex-1 truncate">- {{ externalOrganization.legalEntity.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="dataTransfer.dataTransferLegalBasis.recipients.internalDepartments.length > 0">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiAccountGroup"/>
                  Internal departments
                </dt>
                <ul role="list">
                  <li v-for="internalDepartment in dataTransfer.dataTransferLegalBasis.recipients.internalDepartments"
                      class="flex items-center justify-between text-sm">
                    <div class="flex-1 flex items-center pb-2">
                      <span class="flex-1 truncate">- {{ internalDepartment.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="dataTransfer.dataTransferLegalBasis.recipients.jointDataControllers.length > 0">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiHandshake"/>
                  Internal departments
                </dt>
                <ul role="list">
                  <li v-for="jointDataController in dataTransfer.dataTransferLegalBasis.recipients.jointDataControllers"
                      class="flex items-center justify-between text-sm">
                    <div class="flex-1 flex items-center pb-2">
                      <span class="flex-1 truncate">- {{ jointDataController.legalEntity.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </dl>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormDataTransfer :data-transfer="state.dataTransfer" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormDataTransfer from '@/components/form/data-transfers/FormDataTransfer.vue'
import {
  mdiAccountGroup,
  mdiAccountSwitch,
  mdiAccountWrench,
  mdiEarth,
  mdiGavel,
  mdiHandshake,
  mdiPlusCircle,
  mdiSwapHorizontal
} from '@mdi/js'
import DataTransferTemplate from '../../data/template/DataTransferTemplate.json'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({dataTransfer: DataTransferTemplate, edition: false})
const storeDisplay = useStoreDisplay()


function createDataTransfer() {
  state.dataTransfer = structuredClone(DataTransferTemplate)
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      dataTransfer: true
    }
  })
}

function editDataTransfer(dataTransfer) {
  state.dataTransfer = dataTransfer
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      dataTransfer: true
    }
  })
}

function deleteDataTransfer(index) {
  storeData.$patch((state) => {
    state.processingRecord.dataTransfers.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      dataTransfer: false
    }
  })
}

</script>
