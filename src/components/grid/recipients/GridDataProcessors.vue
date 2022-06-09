<template>
  <UButton label="New data processor" v-on:click="createDataProcessor" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="(dataProcessor, index) in dataProcessors" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ dataProcessor.legalPerson.name }}</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Data categories disclosed</dt>
              <ul role="list">
                <li v-for="dataCategories in dataProcessor.dataCategoriesDisclosed"
                    class="flex items-center justify-between text-sm">
                  <div class="flex-1 flex items-center pb-2">
                    <span class="flex-1 truncate">{{ dataCategories.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </dl>
        </div>
        <div class="py-5 space-x-2 align-bottom">
          <UButton v-on:click="editDataProcessor(dataProcessor)" :icon="mdiPencil"/>
          <UButton v-on:click="deleteDataProcessor(index)" :icon="mdiDelete" type="danger"/>
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
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import dataProcessorTemplate from '../../../data/template/recipients/DataProcessorTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({dataProcessor: dataProcessorTemplate, edition: false})
const storeDisplay = useStoreDisplay()

const props = defineProps({
  dataProcessors: {
    type: Object,
    required: true
  }
})

function createDataProcessor() {
  state.dataProcessor = dataProcessorTemplate
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
