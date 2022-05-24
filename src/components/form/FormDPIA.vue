<template>
  <div class="space-y-6 sm:space-y-5">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">DPIA</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">The description of the some data related to the data protection
        impact assessment (DPIA) established for the processing according to article 35 GDPR.</p>
    </div>
    <div class="isolate -space-y-px rounded-md shadow-sm">
      <UInput v-model="DPIAInfos.description" label="Description" :rounded-top-left="true" :rounded-top-right="true"/>
      <div class="columns-2 gap-0">
        <UInput v-model="DPIAInfos.date" label="Date" :rounded-bottom-left="true"
                placeholder="The date of the DPIA or the last update of the DPIA"/>
        <UInput v-model="DPIAInfos.path" label="Path"
                placeholder="The path to the DPIA document" :rounded-bottom-right="true"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import {storeToRefs} from 'pinia'
import UInput from "@/components/basic/UInput.vue"

const store = useStore()
const {processingRecord: {DPIAInfos}} = useStoreData()
const {current} = storeToRefs(store)
</script>
