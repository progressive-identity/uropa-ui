<template>
  <UButton label="New data processor" v-on:click="createDataProcessor" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(dataProcessor, index) in dataProcessors" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="h-1/4 align-top text-gray-900 font-medium columns-2 py-5">
          <p class="w-full truncate">{{ dataProcessor.processorAgreementPath }}</p>
        </div>
        <div class="h-1/4 py-5 space-x-2 align-bottom">
          <UButton v-on:click="editDataProcessor(dataProcessor)" :icon="mdiPencil"/>
          <UButton v-on:click="deleteDataProcessor(index)" :icon="mdiDelete" type="danger"/>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="dataProcessorVisible">
    <FormDataProcessor :data-processor="state.dataProcessor" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {useStoreForms} from '@/store/forms.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormDataProcessor from '@/components/form/recipients/FormDataProcessor.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import dataProcessorTemplate from '../../../data/template/recipients/DataProcessorTemplate.json'

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const storeForms = useStoreForms()
const {dataProcessorVisible} = storeToRefs(storeForms)
const state = reactive({dataProcessor: dataProcessorTemplate, edition: false})

const props = defineProps({
  dataProcessors: {
    type: Object,
    required: true
  }
})

function createDataProcessor() {
  state.dataProcessor = dataProcessorTemplate
  state.edition = false
  storeForms.$patch({
    dataProcessorVisible: true
  })
}

function editDataProcessor(dataProcessor) {
  state.dataProcessor = dataProcessor
  state.edition = true
  storeForms.$patch({
    dataProcessorVisible: true
  })
}

function deleteDataProcessor(index) {
  storeData.$patch((state) => {
    state.processingRecord.recipients.dataProcessors.splice(index, 1)
  })
}

</script>
