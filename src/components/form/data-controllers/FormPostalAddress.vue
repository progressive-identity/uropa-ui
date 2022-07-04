<template>
  <div>
    <USelect v-model="postalAddress.country" :list="countries" label="Country" size="m" :required="true"/>
    <UInput v-model="postalAddress.address1" label="Address line 1" size="xl" :required="true"/>
    <UInput v-model="postalAddress.address2" label="Address line 2" size="xl"/>
    <div class="flex justify-start space-x-5">
      <UInput v-model="postalAddress.city" label="City" size="m" :required="true"/>
      <UInput v-model="postalAddress.state" label="State / Province" size="m"/>
      <UInput v-model="postalAddress.zipCode" label="Zip / Postal code" type="number" size="s" :required="true"/>
    </div>
  </div>
</template>

<script setup>
import UInput from '@/components/basic/UInput.vue'
import USelect from '@/components/basic/select/USelect.vue'
import countries from '../../../data/countries.json'

const props = defineProps({
  postalAddress: {
    type: Object,
    required: true
  }
})

</script>
