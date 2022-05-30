<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="isolate -space-y-px rounded-md shadow-sm">
      <div class="columns-2 gap-0">
        <UInput v-model="personalInformation.firstName" label="First name" :rounded-top-left="true"/>
        <UInput v-model="personalInformation.lastName" label="Last name" :rounded-top-right="true"/>
      </div>
      <div class="columns-2 gap-0">
        <UInput v-model="personalInformation.phoneNumber" label="Phone number" :rounded-bottom-left="true"/>
        <UInput v-model="personalInformation.email" label="Email" :rounded-bottom-right="true"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'
import UInput from '@/components/basic/UInput.vue'

const props = defineProps({
  personalInformation: {
    type: Object,
    required: true
  }
})

const store = useStore()
const {current} = storeToRefs(store)
</script>
