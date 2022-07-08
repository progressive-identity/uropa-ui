<template>
  <div v-if="current === 1">
    <UStepperBullet v-model="currentDataControllers" :steps="stepsDataControllers"/>
    <FormLegalPerson title="Data controller"
                     description="A data controller is an entity that determines the purposes and the means of the processing of the personal data."
                     v-if="currentDataControllers===0" v-model="processingRecord.legalPerson"/>
    <FormRepresentative v-if="currentDataControllers===1" v-model="processingRecord.representative"/>
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
import LegalPersonTemplate from '@/data/template/LegalPersonTemplate.json'


const {processingRecord} = useStoreData()
const store = useStore()
processingRecord.legalPerson = structuredClone(LegalPersonTemplate)
processingRecord.representative = structuredClone(LegalPersonTemplate)

const {current, stepsDataControllers, currentDataControllers} = storeToRefs(store)

</script>
