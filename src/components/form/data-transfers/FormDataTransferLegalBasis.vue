<template>
  <div class="pt-5">
    <h3>Data transfer legal basis</h3>
    <p class="mt-2 text-sm text-gray-700">Classification that pertains to how an atomic piece of data must be
      treated in order to be compliant with GDPR.</p>
  </div>
  <div class="pt-3">
    <USwitch v-model="dataTransferLegalBasis.isConsent" label="consent"/>
  </div>
  <USelectEnums :list="dataTransferLegalBasisTypes" v-model="dataTransferLegalBasis.legalBasisType"
                label="Type" @update:modelValue="emitChange"/>
    <UInput v-model="dataTransferLegalBasis.source" label="Source" size="xl" type="url"/>
  <UInput v-model="dataTransferLegalBasis.description" label="Description" size="xl"/>
  <div>
    <USelect v-model="dataTransferLegalBasis.recipient.dataProcessor" label="Data processor"
             :list="storeData.processingRecord.recipients.dataProcessors" name-path="legalPerson"/>
    <USelect v-model="dataTransferLegalBasis.recipient.externalOrganization" label="External organization"
             :list="storeData.processingRecord.recipients.externalOrganizations" name-path="legalPerson"/>
    <USelect v-model="dataTransferLegalBasis.recipient.internalDepartment" label="Internal department"
             :list="storeData.processingRecord.recipients.internalDepartments"/>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import {dataTransferLegalBasisTypes} from '@/data/enums.js'
import USelect from '@/components/basic/select/USelect.vue'

const storeDisplay = useStoreDisplay()
const storeData = useStoreData()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataTransferLegalBasis: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const emitChange = (value) => {
  emit('update:modelValue', value)
}

</script>
