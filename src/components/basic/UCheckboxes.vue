<template>
  <div class="block py-2">
    <label for="name" class="u-label">{{ label }}
      <span v-if="required && label.length > 0"> *</span>
    </label>
    <p v-if="!state.valid" v-for="error in state.errors" class="form-error" id="error">{{ error }}</p>
    <fieldset class="py-2 space-y-5">
      <div v-for="(element, index) in list" class="relative flex items-start">
        <div class="flex items-center h-5">
          <input :id="element.name" :name="element.name" v-model="state.checkBoxes[index]" type="checkbox"
                 @click="modifyList(element, index)"
                 @change="validate(state, props, modelValue)"
                 class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"/>
        </div>
        <div class="ml-3 text-sm">
          <label :for="element.name" class="text-sm">{{ element.name }}</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script setup>
import {onMounted, reactive} from 'vue'
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

function initCheckboxes() {
  props.list.forEach((elementFromList, index) => {
    if (props.modelValue.find(elementFromModel => elementFromModel.name === elementFromList.name)) {
      state.checkBoxes[index] = true
    }
  })
}

function modifyList(element, index) {
  if (!state.checkBoxes[index]) {
    props.modelValue.push(element)
  } else {
    const existingIndex = props.modelValue.findIndex(e => e.name === element.name)
    props.modelValue.splice(existingIndex, 1)
  }
}

</script>
