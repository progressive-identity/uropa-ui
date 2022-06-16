<template>
  <div v-if="formsDisplayed.dataTransfer">
    <div>
      <h3>Data transfer</h3>
      <p class="mt-2 text-sm text-gray-700">Description of the data transfer including the country, the recipient (legal
        person) and the legal basis.</p>
    </div>
    <div class="pt-3">
      <USelect v-model="dataTransfer.country" :list="countries" label="Country" size="s"/>
      <UInput v-model="dataTransfer.description" label="Description" size="xl"/>
      <FormDataTransferLegalBasis :data-transfer-legal-basis="dataTransfer.dataTransferLegalBasis"/>
      <div class="space-x-2">
        <UButton label="Back" v-on:click="closeDataTransfer" type="secondary"/>
        <UButton label="Save" v-on:click="saveDataTransfer"/>
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
import USelect from '@/components/basic/select/USelect.vue'
import countries from './../../../data/countries.json'
import FormDataTransferLegalBasis from '@/components/form/data-transfers/FormDataTransferLegalBasis.vue'

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

function emptyDataTransfer() {
  props.dataTransfer.name = ''
  props.dataTransfer.description = ''
  props.dataTransfer.dataTransferType = ''
}

function saveDataTransfer() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataTransfer: false
    }
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.dataTransfers.push({...props.dataTransfer}))
    emptyDataTransfer()
  }
}

function closeDataTransfer() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataTransfer: false
    }
  })
}

</script>
