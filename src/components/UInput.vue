<template>
  <div
      class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
    <label for="name" class="block text-xs font-medium text-gray-900">{{label}}</label>
    <input type="text" name="todo" id="todo" v-model="model"
           class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
           :placeholder="placeholder"/>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  }
})
</script>
