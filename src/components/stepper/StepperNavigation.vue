<template>
  <div class="pt-5">
    <div class="flex justify-end">
      <button type="button" v-on:click="previous"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Previous
      </button>
      <button type="button" v-on:click="next" v-if="current < steps.length"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Next
      </button>
      <button type="button" v-on:click="next" v-if="current === steps.length"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Finish
      </button>
    </div>
  </div>
</template>
<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from "pinia/dist/pinia.esm-browser"

const store = useStore()
const {steps, current} = storeToRefs(store)

const next = async () => {
  store.$patch({
    current: store.current + 1
  })
}
const previous = async () => {
  store.$patch({
    current: store.current - 1
  })
}

</script>
