<template>
  <div class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="columns-2 gap-0">
          <UInput v-model="postalAddress.address1" label="Address line 1" />
          <UInput v-model="postalAddress.address2" label="Address line 2" />
        </div>
        <div class="columns-2 gap-0">
          <UInput v-model="postalAddress.city" label="City"/>
          <UInput v-model="postalAddress.zipCode" label="Zip / Postal code"/>
        </div>
        <div class="columns-2 gap-0">
          <UInput v-model="postalAddress.state" label="State / Province" />
          <USelect v-model="postalAddress.country" :list="countries" label="Country" />
        </div>
      </div>
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
