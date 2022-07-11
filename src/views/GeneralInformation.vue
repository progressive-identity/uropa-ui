<template>
  <div v-if="current === 0">
    <FormGeneralInformation/>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import FormGeneralInformation from '@/components/form/ropa/FormGeneralInformation.vue'

const store = useStore()
const {current} = storeToRefs(store)
</script>
