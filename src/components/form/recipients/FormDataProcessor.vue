<template>
  <div v-if="formsDisplayed.dataProcessor">
    <div>
      <h3>Data processor</h3>
      <p class="form-description">Information about the data processor that is a recipient of the data
        processed. Useful to manage authorisations, contracts and other legal instruments.</p>
    </div>
    <div class="pt-3">
      <UMultiSelect v-model="dataProcessor.dataCategoriesDisclosed" label="Data categories disclosed"
                    :list="storeData.getUniqueDataCategories"/>
      <FormLegalPerson v-model="dataProcessor.legalPerson"/>
      <UInput v-model="dataProcessor.processorAgreementPath" label="Agreement path" placeholder="The path of the binding agreement with processor" size="xl"/>
    </div>
    <div class="space-x-2 pt-3">
      <UButton label="Back" v-on:click="closeDataProcessor" type="secondary"/>
      <UButton label="Save" v-on:click="saveDataProcessor"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import UMultiSelect from '@/components/basic/select/UMultiSelect.vue'
import FormLegalPerson from '@/components/form/data-controllers/FormLegalPerson.vue'

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
  }
})

function saveDataProcessor() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataProcessor: false
    }
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.recipients.dataProcessors.push({...props.dataProcessor}))
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
