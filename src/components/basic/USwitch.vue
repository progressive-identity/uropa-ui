<template>
  <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ">
    <input type="checkbox" name="toggle" id="toggle"
           :checked="modelValue"
           class="absolute block w-6 h-6 rounded-full appearance-none cursor-pointer text-indigo-700 focus:ring-0 focus:ring-offset-0"
           v-bind:class="{'right-0': modelValue}"
           @input="(event) => $emit('update:modelValue', event.target.checked)"/>
    <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
  </div>
  <label for="toggle" class="text-xs font-medium text-gray-900">main</label>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    modelValue: {
      type: Boolean,
      required: true
    },
    emits: ['update:modelValue']
  }
}
</script>
