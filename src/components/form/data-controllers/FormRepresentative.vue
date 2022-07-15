<template>
  <FormLegalEntity v-model="modelValue" title="Representative (optional)"/>
</template>

<script setup>
import FormLegalEntity from '@/components/form/data-controllers/FormLegalEntity.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
</script>
