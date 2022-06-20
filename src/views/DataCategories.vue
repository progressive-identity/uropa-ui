<template>
  <div v-if="current === 3">
    <UStepperBullet v-model="currentDataCategories" :steps="stepsDataCategories"/>
    <GridDataCategories v-if="currentDataCategories===0"/>
    <GridDataLocations v-if="currentDataCategories===1"/>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'
import UStepperBullet from '@/components/stepper/StepperBullet.vue'
import GridDataCategories from '@/components/grid/GridDataCategories.vue'
import GridDataLocations from '@/components/grid/GridDataLocations.vue'

const store = useStore()

const {current, stepsDataCategories, currentDataCategories} = storeToRefs(store)

</script>
