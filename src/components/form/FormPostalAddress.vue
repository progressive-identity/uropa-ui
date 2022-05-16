<template>
  <div v-if="current === 1" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="space-y-6 sm:space-y-5">
        <div class="isolate -space-y-px rounded-md shadow-sm">
          <div
              class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label for="name" class="block text-xs font-medium text-gray-900">Address line 1</label>
            <input type="text" name="name" id="name"
                   class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                   placeholder="Jane Doe"/>
          </div>
          <div
              class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label for="name" class="block text-xs font-medium text-gray-900">Address line 2</label>
            <input type="text" name="name" id="name"
                   class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                   placeholder="Jane Doe"/>
          </div>
          <div class="columns-2">
            <div
                class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label for="name" class="block text-xs font-medium text-gray-900">City</label>
              <input type="text" name="name" id="name"
                     class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"/>
            </div>
            <div
                class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label for="name" class="block text-xs font-medium text-gray-900">Zip / Postal code</label>
              <input type="text" name="name" id="name"
                     class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"/>
            </div>
          </div>
          <div class="columns-2">
            <div
                class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label for="name" class="block text-xs font-medium text-gray-900">State / Province</label>
              <input type="text" name="name" id="name"
                     class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"/>
            </div>
            <div
                class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label for="name" class="block text-xs font-medium text-gray-900">Country</label>
              <SelectCountry/>
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
import SelectCountry from "@/components/SelectCountry"

const store = useStore()
const {current} = storeToRefs(store)
</script>
