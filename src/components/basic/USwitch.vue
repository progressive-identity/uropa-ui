<template>
  <SwitchGroup as="div" class="flex items-center pt-2 pb-2">
    <SwitchLabel v-if="label" as="span" class="mr-3">
      <span class="u-label">{{ label }}</span>
    </SwitchLabel>
    <Switch :modelValue="modelValue" @update:modelValue="update"
            :class="[modelValue ? 'bg-primary-500' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500']">
    <span aria-hidden="true"
          :class="[modelValue ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"/>
    </Switch>
  </SwitchGroup>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue'
import {useStoreDisplay} from '@/store/display.js'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const update = (value) => {
  emits('update:modelValue', value)
}

</script>
