<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="isolate -space-y-px rounded-md shadow-sm">
      <div class="columns-2 gap-0">
        <UInput v-model="personalInformation.firstName" label="First name"/>
        <UInput v-model="personalInformation.lastName" label="Last name"/>
      </div>
      <div class="columns-2 gap-0">
        <UInput v-model="personalInformation.phoneNumber" label="Phone number" type="tel"/>
        <UInput v-model="personalInformation.email" label="Email" type="email"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import UInput from '@/components/basic/UInput.vue'

const props = defineProps({
  personalInformation: {
    type: Object,
    required: true
  }
})

</script>
