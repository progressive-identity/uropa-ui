<template>
  <div class="space-y-6" v-if="formsDisplayed.dpo">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">DPO</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">The Data Protection Officer (DPO) of the legal person.</p>
    </div>
    <div class="space-y-3">
      <FormPersonalInformation :personal-information="dpo.personalInformation"/>
      <FormPostalAddress :postal-address="dpo.postalAddress"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreDisplay} from '@/store/display.js'
import FormPersonalInformation from '@/components/form/legal-person/FormPersonalInformation.vue'
import FormPostalAddress from '@/components/form/legal-person/FormPostalAddress.vue'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dpo: {
    type: Object,
    required: true
  }
})

</script>
