<template>
  <div class="block py-2">
    <label for="name" class="u-label">{{ label }}
      <span v-if="required && label.length > 0"> (at least one mut be checked)</span>
    </label>
    <p v-if="!state.valid" v-for="error in state.errors" class="form-error" id="error">{{ error }}</p>
    <fieldset class="py-2 space-y-5">
      <div v-for="(element, index) in list" class="relative flex items-start">
        <div class="flex items-center h-5">
          <input :id="getName(element)" :name="getName(element)" v-model="state.checkBoxes[index]" type="checkbox"
                 @click="modifyList(element, index)"
                 @change="validate(state, props, modelValue)"
                 class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"/>
        </div>
        <div class="ml-3 text-sm">
          <label :for="getName(element)" class="text-sm">{{ getName(element) }}</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script setup>
import {onMounted, onUpdated, reactive} from 'vue'
import {validate} from '@/composable/useValidation.js'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Array,
    required: true
  },
  list: {
    type: Array,
    required: true
  },
  namePath: {
    type: String,
    default: null
  },
  required: {
    type: Boolean,
    default: false
  }
})

const state = reactive({valid: true, errors: [], checkBoxes: Array(props.list.length)})

const emits = defineEmits(['update:modelValue'])

const update = (value) => {
  emits('update:modelValue', value)
}

onMounted(() => {
  initCheckboxes()
})

// FIXME not ideal in term of performance
onUpdated(() => {
  initCheckboxes()
})

function initCheckboxes() {
  props.list.forEach((elementFromList, index) => {
    state.checkBoxes[index] = !!props.modelValue.find(elementFromModel => getName(elementFromModel) === getName(elementFromList))
  })
}

function modifyList(element, index) {
  if (!state.checkBoxes[index]) {
    props.modelValue.push(element)
  } else {
    const existingIndex = props.modelValue.findIndex(e => getName(e) === getName(element))
    props.modelValue.splice(existingIndex, 1)
  }
}

function getName(element) {
  if (props.namePath) {
    return element[props.namePath].name
  } else {
    return element.name
  }
}


</script>
