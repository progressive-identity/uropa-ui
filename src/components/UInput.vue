<template>
  <div
      class="relative border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
      v-bind:class="{'rounded-tl-lg': roundedTopLeft, 'rounded-tr-lg': roundedTopRight,  'rounded-bl-lg': roundedBottomLeft,  'rounded-br-lg': roundedBottomRight}">
    <label for="name" class="block text-xs font-medium text-gray-900">{{ label }}</label>
    <input type="text" name="todo" id="todo" :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
           :placeholder="placeholder"/>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    roundedTopLeft: {
      type: Boolean,
      required: false,
      default: false
    },
    roundedTopRight: {
      type: Boolean,
      required: false,
      default: false
    },
    roundedBottomLeft: {
      type: Boolean,
      required: false,
      default: false
    },
    roundedBottomRight: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>
