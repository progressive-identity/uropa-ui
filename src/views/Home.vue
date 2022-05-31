<template>
  <section class="px-0 md:px-6 py-24">
    <StepperProcessingRecord/>
    <StepperNavigation/>
    <GeneralInformation/>
    <LegalPerson/>
    <Purposes/>
    <DataCategories/>
    <Recipients/>
    <SecurityMeasures/>
    <DataTransfers/>
    <JsonContent/>
  </section>
</template>

<script setup>
import StepperProcessingRecord from '@/components/stepper/StepperProcessingRecord.vue'
import StepperNavigation from '@/components/stepper/StepperNavigation.vue'
import JsonContent from '@/components/JsonContent.vue'
import LegalPerson from '@/views/LegalPerson.vue'
import GeneralInformation from '@/views/GeneralInformation.vue'
import Purposes from '@/views/Purposes.vue'
import DataCategories from '@/views/DataCategories.vue'
import Recipients from '@/views/Recipients.vue'
import SecurityMeasures from '@/views/SecurityMeasures.vue'
import DataTransfers from '@/views/DataTransfers.vue'</script>
