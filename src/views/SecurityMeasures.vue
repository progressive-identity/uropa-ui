<template>
  <div v-if="current === 5">
    <GridSecurityMeasures/>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import GridSecurityMeasures from '@/components/grid/GridSecurityMeasures.vue'

const store = useStore()
const {current} = storeToRefs(store)
</script>
