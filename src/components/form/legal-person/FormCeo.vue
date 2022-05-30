<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Ceo</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">The highest-ranking person of the legal person.</p>
    </div>
    <div class="space-y-8 divide-y divide-gray-200">
      <FormPersonalInformation :personal-information="ceo.personalInformation"/>
    </div>
  </div>
</template>

<script setup>
import FormPersonalInformation from '@/components/form/FormPersonalInformation.vue'

const props = defineProps({
  ceo: {
    type: Object,
    required: true
  }
})

</script>
