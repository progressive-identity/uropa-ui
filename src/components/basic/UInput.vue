<template>
  <div class="block py-2">
    <label for="name" class="u-label">{{ label }}
      <span v-if="required"> *</span>
    </label>
    <input :type="type" :value="modelValue"
           @change="$emit('update:modelValue', $event.target.value); validate(state, props, $event.target.value);"
           :class="classes"
           :placeholder="placeholder"/>
    <p v-if="!state.valid" v-for="error in state.errors" class="mt-1 text-sm text-red-600" id="error">{{ error }}</p>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue'
import {validate} from '@/composable/useValidation.js'

const state = reactive({valid: true, errors: []})

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'l'
  }
})

const classes = computed(() => {
  return {
    'u-input': true,
    [`u-input--${props.size}`]: true
  }
})


</script>
