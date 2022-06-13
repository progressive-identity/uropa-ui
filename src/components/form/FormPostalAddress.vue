<template>
  <div>
    <USelect v-model="postalAddress.country" :list="countries" label="Country" size="s"/>
    <UInput v-model="postalAddress.address1" label="Address line 1" size="xl"/>
    <UInput v-model="postalAddress.address2" label="Address line 2" size="xl"/>
    <div class="columns-3 gap-0">
      <UInput v-model="postalAddress.city" label="City"/>
      <UInput v-model="postalAddress.state" label="State / Province"/>
      <UInput v-model="postalAddress.zipCode" label="Zip / Postal code" type="number" size="s"/>
    </div>
  </div>
</template>

<script setup>
import UInput from '@/components/basic/UInput.vue'
import USelect from '@/components/basic/USelect.vue'
import countries from './../../data/countries.json'

const props = defineProps({
  postalAddress: {
    type: Object,
    required: true
  }
})

</script>
