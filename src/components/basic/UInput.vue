<template>
  <div class="block py-2">
    <label for="name" class="u-label">{{ label }}
      <span v-if="required"> *</span>
    </label>
    <input type="text" :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           class="u-input"
           :class="'max-w-'+size"
           :placeholder="placeholder"/>
    <p v-if="required" class="mt-1 text-sm text-red-600" id="email-error">This field is mandatory.</p>
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
    },
    size: {
      type: String,
      required: false,
      default: 'xl'
    }
  },
  emits: ['update:modelValue']
}
</script>
