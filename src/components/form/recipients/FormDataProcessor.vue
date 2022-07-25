<template>
  <div v-if="formsDisplayed.dataProcessor">
    <div>
      <h3>Data processor</h3>
      <p class="form-description">Information about the data processor that is a recipient of the data
        processed. Useful to manage authorisations, contracts and other legal instruments.</p>
    </div>
    <div class="pt-3">
      <UCheckboxes v-model="dataProcessor.dataCategoriesDisclosed" label="Data categories disclosed"
                   :list="storeData.getUniqueDataCategories" :required="true"/>
      <FormLegalEntity v-model="dataProcessor.legalEntity"/>
      <UInput v-model="dataProcessor.processorAgreementPath" label="Agreement path"
              placeholder="The path of the binding agreement with processor" size="xl"/>
    </div>
    <div class="space-x-2 pt-3">
      <BackButton/>
      <SaveButton :on-save="saveDataProcessor"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import FormLegalEntity from '@/components/form/data-controllers/FormLegalEntity.vue'
import BackButton from '@/components/form/BackButton.vue'
import SaveButton from '@/components/form/SaveButton.vue'
import UCheckboxes from '@/components/basic/UCheckboxes.vue'

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
  if (!props.edition) {
    storeData.$patch((state) =>
        state.ropa.recipients.dataProcessors.push({...props.dataProcessor}))
  }
}
</script>
