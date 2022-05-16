<template>
  <StepperProcessingRecord/>
  <StepperNavigation/>
  <FormGeneralInformation/>
  <FormLegalPerson/>
  <FormRepresentative/>
  <FormJointControllers/>
  <FormPurposes/>
  <FormRecipients/>
  <FormSecurityMeasures/>
  <FormDataTransfers/>
</template>

<script setup>
import StepperProcessingRecord from "@/components/stepper/StepperProcessingRecord"
import StepperNavigation from "@/components/stepper/StepperNavigation"
import FormGeneralInformation from "@/components/form/FormGeneralInformation"
import FormLegalPerson from "@/components/form/FormLegalPerson"

import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'
import FormRepresentative from "@/components/form/FormRepresentative"
import FormJointControllers from "@/components/form/FormJointControllers"
import FormPurposes from "@/components/form/FormPurposes"
import FormRecipients from "@/components/form/FormRecipients"
import FormSecurityMeasures from "@/components/form/FormSecurityMeasures"
import FormDataTransfers from "@/components/form/FormDataTransfers"

const store = useStore()
const {current} = storeToRefs(store)
</script>
