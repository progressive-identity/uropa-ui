<template>
  <div v-if="current === 2">
    <GridPurposes/>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import GridPurposes from '@/components/grid/GridPurposes.vue'

const store = useStore()
const {current} = storeToRefs(store)

</script>
