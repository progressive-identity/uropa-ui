<template>
  <div class="pt-3">
    <div class="flex justify-end space-x-2">
      <UButton type="secondary" v-on:click="previous" v-if="modelValue === 0" label="Previous"/>
      <UButton type="secondary" v-on:click="emit('update:modelValue', modelValue-1)" v-if="modelValue > 0"
               label="Previous"/>
      <UButton type="primary" v-on:click="emit('update:modelValue', modelValue+1)" v-if="modelValue < steps.length-1"
               label="Next"/>
      <UButton type="primary" v-on:click="next" v-if="modelValue === steps.length-1" label="Next"/>
    </div>
  </div>
  <nav aria-label="Progress" class="flex items-center justify-center pt-5">
    <p class="text-sm font-medium">{{ steps[modelValue].name }}</p>
    <ol class="ml-8 flex items-center space-x-5" role="list">
      <li v-for="step in steps" :key="step.name">
        <p v-if="step.id < modelValue"
           class="block w-2.5 h-2.5 bg-indigo-600 rounded-full hover:bg-indigo-900"/>
        <p v-else-if="step.id === modelValue" aria-current="step"
           class="relative flex items-center justify-center">
          <span aria-hidden="true" class="absolute w-5 h-5 p-px flex">
            <span class="w-full h-full rounded-full bg-indigo-200"/>
          </span>
          <span aria-hidden="true" class="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full"/>
        </p>
        <p v-else class="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400"/>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import UButton from "@/components/basic/UButton.vue"
import {useStore} from "@/store/stepper.js"
import {storeToRefs} from "pinia"

const props = defineProps({
      steps: {
        type: Array,
        required: true
      },
      modelValue: {
        type: Number,
        required: true
      }
    }
)
const emit = defineEmits(['update:modelValue'])


const store = useStore()
const {current} = storeToRefs(store)

function next() {
  store.$patch({
    current: store.current + 1
  })
}

function previous() {
  store.$patch({
    current: store.current - 1
  })
}
</script>
