<template>
  <div v-if="current === 0" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">General Information</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">An inventory of the data processing according to article 30
            GDPR. It must reflect the reality of the personal data processing, to keep track of the usage of personal
            data in the controller system.</p>
        </div>
        <div class="isolate -space-y-px rounded-md shadow-sm">
          <div class="columns-2 gap-0">
            <UInput v-model="processingRecord.name" label="Name" :rounded-top-left="true" :rounded-bottom-left="true"/>
            <UInput v-model="processingRecord.internalId" label="Internal ID"
                    placeholder="The reference of the processing record" :rounded-top-right="true" :rounded-bottom-right="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import {storeToRefs} from 'pinia'
import UInput from "@/components/UInput.vue"

const store = useStore()
const {processingRecord} = useStoreData()
const {current} = storeToRefs(store)
</script>
