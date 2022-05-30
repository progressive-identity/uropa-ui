<template>
  <div v-if="current === 6">
    <UButton label="New data transfer" v-on:click="createDataTransfer" :icon="mdiPlusCircle"/>
    <div class=" py-5">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(dataTransfer, index) in processingRecord.dataTransfers" :key="index"
            class="bg-white rounded-lg shadow border-2 px-5 text-sm">
          <div class="h-1/4 align-top text-gray-900 font-medium columns-2 py-5">
            <p class="w-full truncate">{{ dataTransfer.dataTransferLegalBasis.transferLegalBasisType }}</p>
            <p class="w-full text-right">{{ dataTransfer.country.name }}</p>
          </div>
          <div class="h-2/4">
            <p class="mt-1 text-gray-500">{{ dataTransfer.description }}</p>
          </div>
          <div class="h-1/4 py-5 space-x-2 align-bottom">
            <UButton v-on:click="editDataTransfer(dataTransfer)" :icon="mdiPencil"/>
            <UButton v-on:click="deleteDataTransfer(index)" :icon="mdiDelete" type="danger"/>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="dataTransferVisible">
      <FormDataTransfer :data-transfer="state.dataTransfer" :edition="state.edition"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {useStoreForms} from '@/store/forms.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormDataTransfer from '@/components/form/data-transfers/FormDataTransfer.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import dataTransferTemplate from '../../data/template/DataTransferTemplate.json'

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const storeForms = useStoreForms()
const {dataTransferVisible} = storeToRefs(storeForms)
const state = reactive({dataTransfer: dataTransferTemplate, edition: false})


function createDataTransfer() {
  state.dataTransfer = dataTransferTemplate
  state.edition = false
  storeForms.$patch({
    dataTransferVisible: true
  })
}

function editDataTransfer(dataTransfer) {
  state.dataTransfer = dataTransfer
  state.edition = true
  storeForms.$patch({
    dataTransferVisible: true
  })
}

function deleteDataTransfer(index) {
  storeData.$patch((state) => {
    state.processingRecord.dataTransfers.splice(index, 1)
  })
}

</script>
