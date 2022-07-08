<template>
  <div v-if="formsDisplayed.dataTransfer">
    <div>
      <h3>Data transfer</h3>
      <p class="form-description">Description of the data transfer including the country, the recipient (legal
        person) and the legal basis.</p>
    </div>
    <div class="pt-3">
      <USelect v-model="dataTransfer.country" :list="countries" label="Country" size="s" :required="true"/>
      <UInput v-model="dataTransfer.description" label="Description" size="xl"
              placeholder="ex : transfer operated to host the processed data" :required="true"/>
      <FormDataTransferLegalBasis :data-transfer-legal-basis="dataTransfer.dataTransferLegalBasis"/>
      <div class="space-x-2 pt-3">
        <BackButton/>
        <SaveButton :on-save="saveDataTransfer"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USelect from '@/components/basic/select/USelect.vue'
import countries from './../../../data/countries.json'
import FormDataTransferLegalBasis from '@/components/form/data-transfers/FormDataTransferLegalBasis.vue'
import BackButton from '@/components/form/BackButton.vue'
import SaveButton from '@/components/form/SaveButton.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataTransfer: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function saveDataTransfer() {
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.dataTransfers.push({...props.dataTransfer}))
  }
}
</script>
