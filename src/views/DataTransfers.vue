<template>
  <div v-if="current === 6">
    <GridDataTransfers/>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import GridDataTransfers from '@/components/grid/GridDataTransfers.vue'

const store = useStore()
const {current} = storeToRefs(store)
</script>
