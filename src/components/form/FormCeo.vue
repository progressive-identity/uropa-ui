<template>
  <div v-if="ceoVisible" class="space-y-8 divide-y divide-gray-200">
    <FormPersonalInformation :personal-information="ceo.personalInformation"/>
  </div>
</template>

<script setup>
import {useStoreForms} from '@/store/forms'
import {storeToRefs} from 'pinia'
import FormPersonalInformation from "@/components/form/FormPersonalInformation"

const store = useStoreForms()
const {ceoVisible} = storeToRefs(store)

const props = defineProps({
  ceo: {
    type: Object,
    required: true
  }
})

</script>
