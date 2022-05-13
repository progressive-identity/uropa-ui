<template>
  <div v-if="ceoVisible" class="space-y-8 divide-y divide-gray-200">
    <FormPersonalInformation/>
    <FormPostalAddress/>
  </div>
</template>

<script setup>
import {useStoreForms} from '@/store/forms'
import {storeToRefs} from 'pinia'
import FormPersonalInformation from "@/components/form/FormPersonalInformation"
import FormPostalAddress from "@/components/form/FormPostalAddress"

const store = useStoreForms()
const {ceoVisible} = storeToRefs(store)
</script>
