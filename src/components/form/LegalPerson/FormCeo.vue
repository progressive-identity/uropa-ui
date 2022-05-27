<template>
  <div class="space-y-8 divide-y divide-gray-200">
    <FormPersonalInformation :personal-information="ceo.personalInformation"/>
  </div>
</template>

<script setup>
import FormPersonalInformation from "@/components/form/FormPersonalInformation.vue"

const props = defineProps({
  ceo: {
    type: Object,
    required: true
  }
})

</script>
