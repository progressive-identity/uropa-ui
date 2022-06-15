<template>
  <div>
    <div class="flex flex-wrap">
      <UInput v-model="personalInformation.firstName" label="First name" class="flex-1"/>
      <UInput v-model="personalInformation.lastName" label="Last name" class="flex-1"/>
      <div class="grow"></div>
    </div>
    <div class="flex flex-wrap">
      <UInput v-model="personalInformation.phoneNumber" label="Phone number" type="tel" class="flex-1"/>
      <UInput v-model="personalInformation.email" label="Email" type="email" class="flex-1"/>
      <div class="grow"></div>
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
