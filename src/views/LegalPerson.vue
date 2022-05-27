<template>
  <div v-if="current === 1" class="space-y-8 divide-y divide-gray-200">
    <UStepperBullet v-model="currentLegalPerson" :steps="stepsLegalPerson"/>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <FormLegalPerson v-if="currentLegalPerson===0" v-model="legalPerson"/>
        <FormRepresentative v-if="currentLegalPerson===1" v-model="representative"/>
        <FormJointControllers v-if="currentLegalPerson===2" v-model="jointControllers"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import {storeToRefs} from 'pinia'
import UStepperBullet from "@/components/basic/UStepperBullet.vue"
import FormJointControllers from "@/components/form/LegalPerson/FormJointControllers.vue"
import FormLegalPerson from "@/components/form/LegalPerson/FormLegalPerson.vue"
import FormRepresentative from "@/components/form/LegalPerson/FormRepresentative.vue"


const {processingRecord: {legalPerson, representative, jointControllers}} = useStoreData()
const store = useStore()

const {current, stepsLegalPerson, currentLegalPerson} = storeToRefs(store)

</script>
