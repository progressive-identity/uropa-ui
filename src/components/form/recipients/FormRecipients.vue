<template>
  <div v-if="current === 4">
    <UStepperBullet v-model="currentRecipients" :steps="stepsRecipients"/>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <GridInternalDepartments v-if="currentRecipients===0" :internal-departments="internalDepartments"/>
        <GridExternalOrganizations v-if="currentRecipients===1" :external-organizations="externalOrganizations"/>
        <GridDataProcessors v-if="currentRecipients===2" :data-processors="dataProcessors"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {storeToRefs} from 'pinia'
import UStepperBullet from '@/components/basic/UStepperBullet.vue'
import GridDataProcessors from '@/components/grid/recipients/GridDataProcessors.vue'
import GridExternalOrganizations from '@/components/grid/recipients/GridExternalOrganizations.vue'
import GridInternalDepartments from '@/components/grid/recipients/GridInternalDepartments.vue'

const {processingRecord: {recipients: {internalDepartments, externalOrganizations, dataProcessors}}} = useStoreData()
const store = useStore()
const {current, stepsRecipients, currentRecipients} = storeToRefs(store)
</script>
