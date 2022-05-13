<template>
  <div v-if="current === 1" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="space-y-6 sm:space-y-5">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Address line
            1</label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input type="text" name="lp-name" id="lp-name"
                   class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
          </div>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Address line
            2</label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input type="text" name="lp-email" id="lp-email"
                   class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
          </div>
        </div>
        <div class=" columns-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">City</label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="lp-email" id="lp-email"
                     class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
            </div>
          </div>
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Zip / Postal
              Code</label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="lp-email" id="lp-email"
                     class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
            </div>
          </div>
        </div>
        <div class=" columns-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">State /
              Province</label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="lp-email" id="lp-email"
                     class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
            </div>
          </div>
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Country</label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input type="text" name="lp-email" id="lp-email"
                     class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'

const store = useStore()
const {current} = storeToRefs(store)
</script>
