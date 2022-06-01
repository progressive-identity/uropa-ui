<template>
  <div>
    <span class="text-gray-900 align-top pr-3" v-if="label">{{ label }}</span>
    <Switch v-model="modelValue" :onChange="emit('update:modelValue', modelValue)"
            :class="[modelValue ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
    <span aria-hidden="true"
          :class="[modelValue ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"/>
    </Switch>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {Switch} from '@headlessui/vue'
import {useStoreDisplay} from '@/store/display.js'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>
