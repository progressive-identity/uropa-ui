<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Data transfer legal basis</h3>
        <p class="mt-2 text-sm text-gray-700">Classification that pertains to how an atomic piece of data must be
          treated in order to be compliant with GDPR.</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div>
          <USwitch v-model="dataTransferLegalBasis.isConsent" label="consent" class="pb-3"/>
        </div>
          <USelectEnums :list="transferLegalBasisType" v-model="dataTransferLegalBasis.legalBasisType"
                           label="Type" @update:modelValue="emitChange"/>
        <div class="gap-0">
          <UInput v-model="dataTransferLegalBasis.proofUrl" label="Proof url" />
        </div>
        <UInput v-model="dataTransferLegalBasis.description" label="Description"
                 />
      </div>
      <div>
        <USelect v-model="dataTransferLegalBasis.recipient.dataProcessor" label="Data processor"
                 :list="storeData.processingRecord.recipients.dataProcessors"/>
        <USelect v-model="dataTransferLegalBasis.recipient.externalOrganization" label="External organization"
                 :list="storeData.processingRecord.recipients.externalOrganizations"/>
        <USelect v-model="dataTransferLegalBasis.recipient.internalDepartment" label="Internal department"
                 :list="storeData.processingRecord.recipients.internalDepartments"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import USelectEnums from '@/components/basic/USelectEnums.vue'
import {transferLegalBasisType} from '@/data/enums.js'
import USelect from '@/components/basic/USelect.vue'

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
