<template>
  <section>
    <StepperProcessingRecord/>
    <StepperNavigation/>
    <Welcome/>
    <GeneralInformation/>
    <DataControllers/>
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
import JsonContent from '@/views/JsonContent.vue'
import DataControllers from '@/views/DataControllers.vue'
import GeneralInformation from '@/views/GeneralInformation.vue'
import Purposes from '@/views/Purposes.vue'
import DataCategories from '@/views/DataCategories.vue'
import Recipients from '@/views/Recipients.vue'
import SecurityMeasures from '@/views/SecurityMeasures.vue'
import DataTransfers from '@/views/DataTransfers.vue'
import Welcome from '@/views/Welcome.vue'</script>
