<template>
  <FormLegalPerson v-model="modelValue" title="Representative"/>
</template>

<script setup>
import FormLegalPerson from '@/components/form/data-controllers/FormLegalPerson.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
</script>
