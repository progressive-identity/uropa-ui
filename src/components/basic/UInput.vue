<template>
  <div class="block">
    <label for="name" class="block text-xs font-medium text-gray-900">{{ label }}</label>
    <div class="mt-1">
      <input type="text" name="todo" id="todo" :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
             class="border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 rounded-md w-full"
             :placeholder="placeholder"/>
      <p v-if="required" class="mt-2 text-sm text-red-600" id="email-error">This field is mandatory.</p>
    </div>
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
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>
