<template>
  <UButton label="New data transfer" v-on:click="createDataTransfer" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="(dataTransfer, index) in processingRecord.dataTransfers" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="align-top text-gray-900 font-medium columns-2 py-5">
          <p class="w-full truncate">{{ dataTransfer.dataTransferLegalBasis.transferLegalBasisType }}</p>
          <p class="w-full text-right">{{ dataTransfer.country.name }}</p>
        </div>
        <p class="mt-1 text-gray-500">{{ dataTransfer.description }}</p>
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
import dataTransferTemplate from '../../data/template/DataTransferTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({dataTransfer: dataTransferTemplate, edition: false})
const storeDisplay = useStoreDisplay()


function createDataTransfer() {
  state.dataTransfer = dataTransferTemplate
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
