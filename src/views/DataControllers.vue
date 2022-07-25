<template>
  <div v-if="current === 1">
    <UStepperBullet v-model="currentDataControllers" :steps="stepsDataControllers"/>
    <FormLegalEntity title="Data controller"
                     description="A data controller is an entity that determines the purposes and the means of the processing of the personal data."
                     v-if="currentDataControllers===0" v-model="ropa.dataController"/>
    <FormRepresentative v-if="currentDataControllers===1" v-model="ropa.representative"/>
    <GridJointDataControllers v-if="currentDataControllers===2"/>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import {storeToRefs} from 'pinia'
import UStepperBullet from '@/components/stepper/StepperBullet.vue'
import FormLegalEntity from '@/components/form/data-controllers/FormLegalEntity.vue'
import FormRepresentative from '@/components/form/data-controllers/FormRepresentative.vue'
import GridJointDataControllers from '@/components/grid/GridJointDataControllers.vue'

const store = useStore()
const {current, stepsDataControllers, currentDataControllers} = storeToRefs(store)
const {ropa} = useStoreData()
</script>
