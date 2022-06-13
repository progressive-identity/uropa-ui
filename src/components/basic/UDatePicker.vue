<template>
  <div class="block py-2">
    <label for="name" class="u-label">{{ label }}</label>
    <input type="date" name="todo" id="todo" :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           class="u-input"
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
