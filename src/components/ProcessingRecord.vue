<template>
  <div class="h-screen">
    <StepperProcessingRecord/>
    <StepperNavigation/>
    <FormGeneralInformation/>
    <FormLegalPerson/>
    <FormRepresentative/>
    <FormJointControllers/>
    <FormPurposes/>
    <FormDataCategories/>
    <FormRecipients/>
    <FormSecurityMeasures/>
    <FormDataTransfers/>
    <JsonContent/>
  </div>
</template>

<script setup>

import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'
import FormGeneralInformation from "@/components/form/FormGeneralInformation"
import FormDataCategories from "@/components/form/FormDataCategories.vue"
import FormDataTransfers from "@/components/form/FormDataTransfers"
import FormLegalPerson from "@/components/form/FormLegalPerson"
import FormPurposes from "@/components/form/FormPurposes"
import FormRecipients from "@/components/form/FormRecipients"
import FormSecurityMeasures from "@/components/form/FormSecurityMeasures"
import StepperProcessingRecord from "@/components/stepper/StepperProcessingRecord"
import StepperNavigation from "@/components/stepper/StepperNavigation"
import JsonContent from "@/components/JsonContent"
import FormJointControllers from "@/components/form/FormJointControllers.vue"
import FormRepresentative from "@/components/form/FormRepresentative.vue"

const store = useStore()
const {current} = storeToRefs(store)
</script>
