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
          <div
              class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label for="name" class="block text-xs font-medium text-gray-900">Name</label>
                        <input type="text" name="name" id="name" v-model="processingRecord.name"
                               class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                               placeholder="TODO"/>
          </div>
          <div
              class="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label for="job-title" class="block text-xs font-medium text-gray-900">Internal ID</label>
            <input type="text" name="job-title" id="job-title"
                   class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"/>
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

const store = useStore()
const {processingRecord} = useStoreData()
const {current} = storeToRefs(store)
</script>
