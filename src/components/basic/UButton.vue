<template>
  <button type="button" v-on:click="actionOnClick"
          class="inline-flex items-center px-3 py-3 border border-transparent shadow-sm text-white font-medium rounded-md text-gray-700 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    <UIcon v-if="icon" :path="icon"/>
    {{ label }}
  </button>
</template>

<script setup>
import UIcon from "@/components/basic/UIcon.vue"

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  actionOnClick: {
    type: Function,
    required: true
  }
})
</script>
