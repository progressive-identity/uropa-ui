<template>
  <div v-if="current === 1">
    <UStepperBullet v-model="currentLegalPerson" :steps="stepsLegalPerson"/>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <FormLegalPerson v-if="currentLegalPerson===0" v-model="legalPerson"/>
        <FormRepresentative v-if="currentLegalPerson===1" v-model="representative"/>
        <GridJointControllers v-if="currentLegalPerson===2"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import {storeToRefs} from 'pinia'
import UStepperBullet from '@/components/basic/UStepperBullet.vue'
import FormLegalPerson from '@/components/form/legal-person/FormLegalPerson.vue'
import FormRepresentative from '@/components/form/legal-person/FormRepresentative.vue'
import GridJointControllers from '@/components/grid/GridJointControllers.vue'


const {processingRecord: {legalPerson, representative}} = useStoreData()
const store = useStore()

const {current, stepsLegalPerson, currentLegalPerson} = storeToRefs(store)

</script>
