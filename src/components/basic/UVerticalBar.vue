<template>
  <div
      class="flex items-center px-5 py-2 border shadow-sm font-medium text-sm rounded-md bg-gray-50 cursor-pointer columns-2">
    <div class="w-full px-5 align-middle text-gray-700">{{ label.toUpperCase() }}</div>
    <div class="right-0">
      <UIcon :size="24" class="align-middle text-gray-700" :path="mdiPlay" :class="rotate?'inline-flex rotate-90':''"/>
    </div>
  </div>
</template>

<script setup>
import UIcon from '@/components/basic/UIcon.vue'
import {mdiPlay} from '@mdi/js'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  rotate: {
    type: Boolean,
    required: false
  }
})

</script>
