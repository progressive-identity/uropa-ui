<template>
  <nav v-if="current >=0" aria-label="Progress">
    <ol class="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0" role="list">
      <li v-for="(step, stepIdx) in stepsProcessingRecord" :key="step.name" class="relative md:flex-1 md:flex">
        <a v-if="step.id < current" class="group flex items-center w-full" v-on:click="changeStep(step.id)">
          <span class="px-6 py-4 flex items-center text-sm font-medium cursor-pointer">
            <span
                class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
              <CheckIcon aria-hidden="true" class="w-6 h-6 text-white"/>
            </span>
            <span class="ml-4 text-sm font-medium text-gray-900">{{ step.name }}</span>
          </span>
        </a>
        <a v-else-if="step.id === current" aria-current="step" class="px-6 py-4 flex items-center text-sm font-medium">
          <span
              class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
            <span class="text-indigo-600">{{ step.id }}</span>
          </span>
          <span class="ml-4 text-sm font-medium text-indigo-600">{{ step.name }}</span>
        </a>
        <!-- Temporary help for development purposes, should be removed afterward-->
        <a v-else class="group flex items-center" v-on:click="changeStep(step.id)">
          <span class="px-6 py-4 flex items-center text-sm font-medium">
            <span
                class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
              <span class="text-gray-500 group-hover:text-gray-900">{{ step.id }}</span>
            </span>
            <span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
          </span>
        </a>
        <template v-if="stepIdx !== stepsProcessingRecord.length - 1">
          <!-- Arrow separator for lg screens and up -->
          <div aria-hidden="true" class="hidden md:block absolute top-0 right-0 h-full w-5">
            <svg class="h-full w-full text-gray-300" fill="none" preserveAspectRatio="none" viewBox="0 0 22 80">
              <path d="M0 -2L20 40L0 82" stroke="currentcolor" stroke-linejoin="round"
                    vector-effect="non-scaling-stroke"/>
            </svg>
          </div>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import {CheckIcon} from '@heroicons/vue/solid'
import {useStore} from '@/store/stepper'
import {storeToRefs} from 'pinia'

const store = useStore()

function changeStep(stepNumber) {
  store.$patch({
    current: stepNumber,
    mainNavigationDisplayed: true
  })
}

const {stepsProcessingRecord, current} = storeToRefs(store)
</script>
