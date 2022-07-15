<template>
  <div class="block py-2">
    <label for="name" class="u-label">{{ label }}
      <span v-if="required && label.length > 0"> *</span>
    </label>
    <input :type="type" :value="modelValue"
           @change="$emit('update:modelValue', $event.target.value.trim()); validate(state, props, $event.target.value);"
           :class="classes"
           :placeholder="placeholder"/>
    <UIcon v-if="modelValue.length > 0" :path="mdiClose"
           class="z-5 text-gray-300 cursor-pointer relative right-6"
           @click="$emit('update:modelValue', '');validate(state, props, $event.target.value);"/>
    <p v-if="!state.valid" v-for="error in state.errors" class="form-error" id="error">{{ error }}</p>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue'
import {validate} from '@/composable/useValidation.js'
import UIcon from '@/components/basic/UIcon.vue'
import {mdiClose} from '@mdi/js'

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
