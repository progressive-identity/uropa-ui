<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Data processor</h3>
        <p class="mt-2 text-sm text-gray-700">Information about the data processor that is a recipient of the data
          processed. Useful to manage authorisations, contracts and other legal instruments.</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <UInput v-model="dataProcessor.processorAgreementPath" label="Agreement path" :rounded-top-left="true"/>
      </div>
      <div class="space-x-2">
        <UButton label="Back" v-on:click="closeDataProcessor" type="secondary"/>
        <UButton label="Save" v-on:click="saveDataProcessor"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStoreData} from "@/store/data.js"
import {useStoreForms} from "@/store/forms.js"
import UButton from "@/components/basic/UButton.vue"
import UInput from "@/components/basic/UInput.vue"

const storeData = useStoreData()
const storeForms = useStoreForms()

const props = defineProps({
  dataProcessor: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function emptyDataProcessor() {
  props.dataProcessor.processorAgreementPath = ''
  props.dataProcessor.legalPerson = {}
  props.dataProcessor.dataCategoriesDisclosed = []
}

function saveDataProcessor() {
  storeForms.$patch({
    dataProcessorVisible: false
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.recipients.dataProcessors.push({...props.dataProcessor}))
    emptyDataProcessor()
  }
}

function closeDataProcessor() {
  storeForms.$patch({
    dataProcessorVisible: false
  })
}

</script>
