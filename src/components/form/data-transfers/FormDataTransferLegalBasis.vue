<template>
  <div class="pt-5">
    <h3>Data transfer legal basis</h3>
    <p class="form-description">Classification that pertains to how an atomic piece of data must be
      treated in order to be compliant with GDPR.</p>
  </div>
  <div class="pt-3">
    <USwitch v-model="dataTransferLegalBasis.isConsent" label="consent"/>
  </div>
  <USelectEnums :list="dataTransferLegalBasisTypes" v-model="dataTransferLegalBasis.legalBasisType"
                label="Type" @update:modelValue="emitChange"/>
  <UInput v-model="dataTransferLegalBasis.description" label="Description" size="xl"
          placeholder="ex: standard contractual clauses" :required="true"/>
  <UInput v-model="dataTransferLegalBasis.source" label="Source" size="xl" type="url"
          placeholder="ex: URL, internal path to the agreement, BCR, etc."/>
  <div class="flex justify-start space-x-5">
    <UCheckboxes v-model="dataTransferLegalBasis.recipients.dataProcessors" label="Data processors"
                 :list="storeData.ropa.recipients.dataProcessors" name-path="legalEntity"/>
    <UCheckboxes v-model="dataTransferLegalBasis.recipients.externalOrganizations" label="External organizations"
                 :list="storeData.ropa.recipients.externalOrganizations" name-path="legalEntity"/>
    <UCheckboxes v-model="dataTransferLegalBasis.recipients.internalDepartments" label="Internal departments"
                 :list="storeData.ropa.recipients.internalDepartments"/>
    <UCheckboxes v-model="dataTransferLegalBasis.recipients.jointDataControllers" label="Joint data controllers"
                 :list="storeData.ropa.jointDataControllers" name-path="legalEntity"/>
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
import UCheckboxes from '@/components/basic/UCheckboxes.vue'

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
