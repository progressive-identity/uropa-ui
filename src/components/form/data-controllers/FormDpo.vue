<template>
  <div class="space-y-6" v-if="formsDisplayed.dpo">
    <div>
      <h3>DPO</h3>
      <p class="form-description">The Data Protection Officer (DPO) of the legal person.</p>
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
import FormPersonalInformation from '@/components/form/data-controllers/FormPersonalInformation.vue'
import FormPostalAddress from '@/components/form/data-controllers/FormPostalAddress.vue'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dpo: {
    type: Object,
    required: true
  }
})

</script>
