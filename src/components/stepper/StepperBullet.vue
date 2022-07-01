<template>
  <div class="pt-3">
    <div class="flex justify-end space-x-2">
      <UButton type="secondary" v-on:click="previous" v-if="modelValue === 0" label="Previous"/>
      <UButton type="secondary" v-on:click="emit('update:modelValue', modelValue-1)" v-if="modelValue > 0"
               label="Previous"/>
      <UButton type="primary" v-on:click="next" label="Next"/>
      <UButton v-if="steps.find(e => e.id === modelValue).optional" type="primary" v-on:click="skip" label="Skip"/>
      <DownloadButton/>
    </div>
  </div>
  <nav aria-label="Progress" class="flex items-center justify-center pt-5">
    <ol class="ml-8 flex space-x-5" role="list">
      <li v-for="step in steps" :key="step.name">
        <div v-if="step.id < modelValue">
          <p class="block rounded-full relative flex items-center justify-center">
            <span aria-hidden="true"
                  class="relative hover:bg-primary-700 block w-2.5 h-2.5 bg-primary-500 rounded-full"/>
          </p>
          <p class="py-2 text-sm font-medium text-gray-900">{{ step.name }}
            <br/><span v-if="step.optional" class="flex justify-center font-light italic">(optional)</span>
          </p>
        </div>
        <div v-else-if="step.id === modelValue" aria-current="step">
          <p class="relative flex items-center justify-center">
          <span aria-hidden="true" class="absolute w-5 h-5 p-px flex">
            <span class="w-full h-full rounded-full bg-primary-200"/>
          </span>
            <span aria-hidden="true" class="relative block w-2.5 h-2.5 bg-primary-500 rounded-full"/>
          </p>
          <p class="py-2 text-sm font-medium text-primary-500">{{ step.name }}
            <br/><span v-if="step.optional" class="flex justify-center font-light italic">(optional)</span>
          </p>
        </div>
        <div v-else>
          <p class="block rounded-full relative flex items-center justify-center">
            <span aria-hidden="true" class="relative hover:bg-gray-500 block w-2.5 h-2.5 bg-gray-300 rounded-full"/>
          </p>
          <p class="py-2 text-sm font-medium text-gray-500">{{ step.name }}
            <br/><span v-if="step.optional" class="flex justify-center font-light italic">(optional)</span>
          </p>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import {isFormValid} from '@/utils/validation.js'
import DownloadButton from '@/components/stepper/DownloadButton.vue'

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
const storeDisplay = useStoreDisplay()

store.$patch({
  mainNavigationDisplayed: false
})

async function next() {
  if (await isFormValid()) {
    storeDisplay.$reset()
    if (props.modelValue === props.steps.length - 1) {
      store.current++
      store.$patch({
        mainNavigationDisplayed: true
      })
    } else {
      emit('update:modelValue', props.modelValue + 1)
    }
  }
}


async function skip() {
  storeDisplay.$reset()
  if (props.modelValue === props.steps.length - 1) {
    store.current++
    store.$patch({
      mainNavigationDisplayed: true
    })
  } else {
    emit('update:modelValue', props.modelValue + 1)
  }
}

function previous() {
  store.current--
  storeDisplay.$reset()
  store.$patch({
    mainNavigationDisplayed: true
  })
}

</script>
