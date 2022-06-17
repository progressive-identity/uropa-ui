<template>
  <div v-if="current === 1">
    <UStepperBullet v-model="currentDataControllers" :steps="stepsDataControllers"/>
    <FormLegalPerson title="Data controller" description="TODO on Uropa"
                     v-if="currentDataControllers===0" v-model="legalPerson"/>
    <FormRepresentative v-if="currentDataControllers===1" v-model="representative"/>
    <GridJointControllers v-if="currentDataControllers===2"/>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import {storeToRefs} from 'pinia'
import UStepperBullet from '@/components/stepper/StepperBullet.vue'
import FormLegalPerson from '@/components/form/data-controllers/FormLegalPerson.vue'
import FormRepresentative from '@/components/form/data-controllers/FormRepresentative.vue'
import GridJointControllers from '@/components/grid/GridJointControllers.vue'


const {processingRecord: {legalPerson, representative}} = useStoreData()
const store = useStore()

const {current, stepsDataControllers, currentDataControllers} = storeToRefs(store)

</script>
