<template>
  <div>
    <div class="flex justify-start space-x-5">
      <UInput v-model="personalInformation.firstName" label="First name"/>
      <UInput v-model="personalInformation.lastName" label="Last name"/>
    </div>
    <div class="flex justify-start space-x-5">
      <UInput v-model="personalInformation.phoneNumber" label="Phone number" type="tel" size="s"/>
      <UInput v-model="personalInformation.email" label="Email" type="email" size="m"/>
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
