<template>
  <UButton label="New data transfer" v-on:click="createDataTransfer" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="(dataTransfer, index) in processingRecord.dataTransfers" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ dataTransfer.description }}</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Country</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ dataTransfer.country.name }}</dd>
            </div>
          </dl>
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Type</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ dataTransfer.dataTransferLegalBasis.legalBasisType }}</dd>
            </div>
          </dl>
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Description</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ dataTransfer.dataTransferLegalBasis.description }}</dd>
            </div>
          </dl>
        </div>
        <div class="py-5 space-x-2 align-bottom">
          <UButton v-on:click="editDataTransfer(dataTransfer)" :icon="mdiPencil"/>
          <UButton v-on:click="deleteDataTransfer(index)" :icon="mdiDelete" type="danger"/>
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
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import DataTransferTemplate from '../../data/template/DataTransferTemplate.json'

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
