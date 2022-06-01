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
        <div class="columns-2 gap-0">
          <USelect v-model="dataTransferLegalBasis.transferLegalBasisType" label="Type"
                   :list="transferLegalBasisType"
                   :rounded-top-left="true"/>
          <UInput v-model="dataTransferLegalBasis.proofUrl" label="Proof url" :rounded-top-right="true"/>
        </div>
        <UInput v-model="dataTransferLegalBasis.description" label="Description"
                :rounded-bottom-left="true" :rounded-bottom-right="true"/>
      </div>
      <div class="pt-3 space-x-2">
        <UButton type="secondary" v-on:click="toggleDisplay(!formsDisplayed.dataProcessor, false, false)" label="Data processor"
                 :icon="formsDisplayed.dataProcessor ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        </UButton>
        <UButton type="secondary" v-on:click="toggleDisplay(false, !formsDisplayed.externalOrganization, false)" label="External organization"
                 :icon="formsDisplayed.externalOrganization ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        </UButton>
        <UButton type="secondary" v-on:click="toggleDisplay(false, false, !formsDisplayed.internalDepartment)" label="Internal department"
                 :icon="formsDisplayed.internalDepartment ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        </UButton>
      </div>
      <div>
        <FormDataProcessor :data-processor="dataTransferLegalBasis.recipient.dataProcessor" :nested="true"/>
        <FormExternalOrganization :external-organization="dataTransferLegalBasis.recipient.externalOrganization" :nested="true"/>
        <FormInternalDepartment :internal-department="dataTransferLegalBasis.recipient.internalDepartment" :nested="true"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import USelect from '@/components/basic/USelect.vue'
import {transferLegalBasisType} from '/src/data/enums.js'
import FormDataProcessor from '@/components/form/recipients/FormDataProcessor.vue'
import UButton from '@/components/basic/UButton.vue'
import {mdiArrowDownDropCircle, mdiArrowUpDropCircle} from '@mdi/js'
import FormExternalOrganization from '@/components/form/recipients/FormExternalOrganization.vue'
import FormInternalDepartment from '@/components/form/recipients/FormInternalDepartment.vue'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataTransferLegalBasis: {
    type: Object,
    required: true
  }
})

function toggleDisplay(dataProcessor, externalOrganization, internalDepartment) {
    storeDisplay.$patch({
    formsDisplayed: {
      dataProcessor,
      externalOrganization,
      internalDepartment
    }
  })
}

</script>
