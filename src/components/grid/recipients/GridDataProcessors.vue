<template>
  <UButton label="New data processor" v-on:click="createDataProcessor" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(dataProcessor, index) in processingRecord.recipients.dataProcessors" :key="index"
          class="u-grid">
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>
              <UIcon size="24" :path="mdiAccountWrench"/>
              {{ dataProcessor.legalPerson.name }}
            </h3>
          </div>
          <GridButtons @edit="editDataProcessor(dataProcessor)" @delete="deleteDataProcessor(index)"/>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl v-if="dataProcessor.legalPerson.dpo.personalInformation.firstName"
              class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFaceManShimmer"/>
                DPO
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  dataProcessor.legalPerson.dpo.personalInformation.lastName.toUpperCase() + ' ' + dataProcessor.legalPerson.dpo.personalInformation.firstName
                }}
              </dd>
            </div>
          </dl>
          <dl v-if="dataProcessor.legalPerson.ceo.personalInformation.firstName"
              class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFaceWomanShimmer"/>
                CEO
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  dataProcessor.legalPerson.ceo.personalInformation.lastName.toUpperCase() + ' ' + dataProcessor.legalPerson.ceo.personalInformation.firstName
                }}
              </dd>
            </div>
          </dl>
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFormatListBulletedSquare"/>
                Disclosed
              </dt>
              <ul role="list">
                <li v-for="dataCategories in dataProcessor.dataCategoriesDisclosed"
                    class="flex items-center justify-between text-sm">
                  <div class="flex-1 flex items-center pb-2">
                    <span class="flex-1 truncate">- {{ dataCategories.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </dl>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormDataProcessor :data-processor="state.dataProcessor" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormDataProcessor from '@/components/form/recipients/FormDataProcessor.vue'
import {
  mdiAccountWrench,
  mdiFaceManShimmer,
  mdiFaceWomanShimmer,
  mdiFormatListBulletedSquare,
  mdiPlusCircle
} from '@mdi/js'
import DataProcessorTemplate from '../../../data/template/recipients/DataProcessorTemplate.json'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({dataProcessor: DataProcessorTemplate, edition: false})
const storeDisplay = useStoreDisplay()

function createDataProcessor() {
  state.dataProcessor = structuredClone(DataProcessorTemplate)
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      dataProcessor: true
    }
  })
}

function editDataProcessor(dataProcessor) {
  state.dataProcessor = dataProcessor
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      dataProcessor: true
    }
  })
}

function deleteDataProcessor(index) {
  storeData.$patch((state) => {
    state.processingRecord.recipients.dataProcessors.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      dataProcessor: false
    }
  })
}

</script>
