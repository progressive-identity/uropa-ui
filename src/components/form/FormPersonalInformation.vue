<template>
  <div v-if="current === 1" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <UInput :model="personalInformation.firstName" label="First name" :beginning="true"/>
        <UInput :model="personalInformation.lastName" label="Last name"/>
        <UInput :model="personalInformation.phoneNumber" label="Phone number"/>
        <UInput :model="personalInformation.email" label="Email" :end="true"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'
import UInput from "@/components/UInput.vue"

const props = defineProps({
  personalInformation: {
    type: Object,
    required: true
  }
})

const store = useStore()
const {current} = storeToRefs(store)
</script>
