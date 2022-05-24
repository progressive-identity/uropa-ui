<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <nav aria-label="Progress" class="flex items-center justify-center">
        <p class="text-sm font-medium">{{stepsDataCategories[currentDataCategories].name}}</p>
    <ol class="ml-8 flex items-center space-x-5" role="list">
      <li v-for="step in stepsDataCategories" :key="step.name">
        <p v-if="step.id < currentDataCategories"
           class="block w-2.5 h-2.5 bg-indigo-600 rounded-full hover:bg-indigo-900" />
        <p v-else-if="step.id === currentDataCategories" aria-current="step"
           class="relative flex items-center justify-center">
          <span aria-hidden="true" class="absolute w-5 h-5 p-px flex">
            <span class="w-full h-full rounded-full bg-indigo-200"/>
          </span>
          <span aria-hidden="true" class="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full"/>
        </p>
        <p v-else class="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400" />
      </li>
    </ol>
  </nav>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'

const store = useStore()

const {stepsDataCategories, currentDataCategories} = storeToRefs(store)
</script>
