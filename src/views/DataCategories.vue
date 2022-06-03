<template>
  <div v-if="current === 3">
    <UStepperBullet v-model="currentDataCategories" :steps="stepsDataCategories"/>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <GridDataCategories v-if="currentDataCategories===0"/>
        <GridDataTypes v-if="currentDataCategories===1"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'
import UStepperBullet from '@/components/basic/UStepperBullet.vue'
import GridDataCategories from '@/components/grid/GridDataCategories.vue'
import GridDataTypes from '@/components/grid/GridDataTypes.vue'

const store = useStore()

const {current, stepsDataCategories, currentDataCategories} = storeToRefs(store)

</script>
