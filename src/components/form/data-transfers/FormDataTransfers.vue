<template>
  <div v-if="current === 6" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        DATA TRANSFERS
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper.js'
import {storeToRefs} from 'pinia'

const store = useStore()
const {current} = storeToRefs(store)
</script>
