<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="formsDisplayed.dataProcessor">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Data processor</h3>
        <p class="mt-2 text-sm text-gray-700">Information about the data processor that is a recipient of the data
          processed. Useful to manage authorisations, contracts and other legal instruments.</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <UInput v-model="dataProcessor.processorAgreementPath" label="Agreement path" />
        <UMultiSelect v-model="dataProcessor.dataCategoriesDisclosed" label="Data categories disclosed" :list="storeData.dataCategories"/>
        <FormLegalPerson v-model="dataProcessor.legalPerson"/>
      </div>
      <div class="space-x-2" v-if="!nested">
        <UButton label="Back" v-on:click="closeDataProcessor" type="secondary"/>
        <UButton label="Save" v-on:click="saveDataProcessor"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import UMultiSelect from '@/components/basic/UMultiSelect.vue'
import FormLegalPerson from '@/components/form/legal-person/FormLegalPerson.vue'
import LegalPersonTemplate from '@/data/template/LegalPersonTemplate.json'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataProcessor: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  },
  nested: {
    type: Boolean,
    required: false,
    default: false
  }
})

function emptyDataProcessor() {
  props.dataProcessor.processorAgreementPath = ''
  props.dataProcessor.legalPerson = LegalPersonTemplate
  props.dataProcessor.dataCategoriesDisclosed = []
}

function saveDataProcessor() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataProcessor: false
    }
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.recipients.dataProcessors.push({...props.dataProcessor}))
    emptyDataProcessor()
  }
}

function closeDataProcessor() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataProcessor: false
    }
  })
}

</script>
