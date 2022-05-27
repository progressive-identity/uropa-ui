<template>
  <div v-if="current === 4">
    <UStepperBullet v-model="currentRecipients" :steps="stepsRecipients"/>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <FormInternalDepartments v-if="currentRecipients===0" :internal-departments="internalDepartments"/>
        <FormExternalOrganizations v-if="currentRecipients===1" :external-organizations="externalOrganizations"/>
        <FormDataProcessors v-if="currentRecipients===2" :data-processors="dataProcessors"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper.js'
import {useStoreData} from "@/store/data.js"
import {storeToRefs} from 'pinia'
import UStepperBullet from "@/components/basic/UStepperBullet.vue"
import FormDataProcessors from "@/components/form/Recipients/FormDataProcessors.vue"
import FormExternalOrganizations from "@/components/form/Recipients/FormExternalOrganizations.vue"
import FormInternalDepartments from "@/components/form/Recipients/FormInternalDepartments.vue"

const {processingRecord: {recipients: {internalDepartments, externalOrganizations, dataProcessors}}} = useStoreData()
const store = useStore()
const {current, stepsRecipients, currentRecipients} = storeToRefs(store)
</script>
