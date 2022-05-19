<template>
  <div v-if="dpoVisible" class="space-y-8 divide-y divide-gray-200">
    <FormPersonalInformation :personal-information="dpo.personalInformation"/>
    <FormPostalAddress :postal-address="dpo.postalAddress"/>
  </div>
</template>

<script setup>
import {useStoreForms} from '@/store/forms'
import {storeToRefs} from 'pinia'
import FormPersonalInformation from "@/components/form/FormPersonalInformation"
import FormPostalAddress from "@/components/form/FormPostalAddress"

const store = useStoreForms()
const {dpoVisible} = storeToRefs(store)

const props = defineProps({
  dpo: {
    type: Object,
    required: true
  }
})

</script>
