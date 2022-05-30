<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Dpo</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">The Data Protection Officer (DPO) of the legal person.</p>
    </div>
    <div class="space-y-3 divide-y divide-gray-200">
      <FormPersonalInformation :personal-information="dpo.personalInformation"/>
      <FormPostalAddress :postal-address="dpo.postalAddress"/>
    </div>
  </div>
</template>

<script setup>
import FormPersonalInformation from '@/components/form/FormPersonalInformation.vue'
import FormPostalAddress from '@/components/form/FormPostalAddress.vue'

const props = defineProps({
  dpo: {
    type: Object,
    required: true
  }
})

</script>
