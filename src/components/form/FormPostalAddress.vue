<template>
  <div class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <UInput v-model="postalAddress.address1" label="Address line 1" :beginning="true"/>
        <UInput v-model="postalAddress.address2" label="Address line 2"/>
        <UInput v-model="postalAddress.city" label="City"/>
        <UInput v-model="postalAddress.zipCode" label="Zip / Postal code"/>
        <UInput v-model="postalAddress.state" label="State / Province"/>
        <SelectCountry :country="postalAddress.country"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'
import SelectCountry from "@/components/SelectCountry"
import UInput from "@/components/UInput.vue"

const props = defineProps({
  postalAddress: {
    type: Object,
    required: true
  }
})

const store = useStore()
const {current} = storeToRefs(store)
</script>
