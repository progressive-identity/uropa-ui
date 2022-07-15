<template>
  <div v-if="current === 4">
    <UStepperBullet v-model="currentRecipients" :steps="stepsRecipients"/>
    <GridInternalDepartments v-if="currentRecipients===0"/>
    <GridDataProcessors v-if="currentRecipients===1"/>
    <GridExternalOrganizations v-if="currentRecipients===2"/>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import UStepperBullet from '@/components/stepper/StepperBullet.vue'
import GridDataProcessors from '@/components/grid/recipients/GridDataProcessors.vue'
import GridExternalOrganizations from '@/components/grid/recipients/GridExternalOrganizations.vue'
import GridInternalDepartments from '@/components/grid/recipients/GridInternalDepartments.vue'

const store = useStore()
const {current, stepsRecipients, currentRecipients} = storeToRefs(store)

</script>
