<template>
  <div class="block py-2">
    <label for="name" class="u-label">{{ label }}
      <span v-if="required"> *</span>
    </label>
    <input :type="type" :value="modelValue"
           @change="$emit('update:modelValue', $event.target.value); validate($event.target.value);"
           :class="classes"
           :placeholder="placeholder"/>
    <p v-if="!state.valid" v-for="error in state.errors" class="mt-1 text-sm text-red-600" id="error">{{error}}</p>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue'

const state = reactive({valid: true, errors: []})

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'text'
  },
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
    default: 'l'
  }
})

const classes = computed(() => {
  return {
    'u-input': true,
    [`u-input--${props.size}`]: true
  }
})

function validate(value) {
  state.valid = true
  state.errors = []
  if (props.required) {
    isEmpty(value)
  }

  if (state.valid && props.type === 'email') {
    isEMailValid(value)
  }
}

function isEmpty(value) {
  if (value.length ===0) {
    state.valid = false
    state.errors.push('This field cannot be empty')
  }
}

// TODO externalize in a specific file once more rules are defined
function isEMailValid(email) {
   if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
     state.valid = false
    state.errors.push('The email is not valid')
   }
}
</script>
