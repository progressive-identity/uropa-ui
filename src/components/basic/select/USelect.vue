<template>
  <div class="block py-2">
    <Combobox as="div" :modelValue="modelValue" @update:modelValue="update">
      <ComboboxLabel class="u-label">{{ label }}
        <span v-if="required && label.length > 0"> *</span>
      </ComboboxLabel>
      <div class="relative" :class="classes">
        <ComboboxInput @change="query = $event.target.value; validate(state, props, $event.target.value);"
                       class="text-sm border-0 w-full p-0 focus:ring-0"
                       :display-value="(e)=>namePath ? e[namePath].name:e.name"/>
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center px-2">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </ComboboxButton>
        <ComboboxOptions v-if="filteredList.length > 0"
                         class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="element in filteredList" :key="namePath ? element[namePath].name:element.name"
                          :value="element"
                          v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-primary-500 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ namePath ? element[namePath].name : element.name }}
            </span>
              <span v-if="selected"
                    :class="['absolute inset-y-0 flex left-0 items-center pl-1.5', active ? 'text-white' : 'text-primary-500']">
              <CheckIcon class="h-5 w-5" aria-hidden="true"/>
            </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
    <p v-if="!state.valid" v-for="error in state.errors" class="form-error" id="error">{{ error }}</p>
  </div>
</template>

<script setup>
import {computed, reactive, ref} from 'vue'
import {validate} from '@/composable/useValidation.js'
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid'
import {Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions} from '@headlessui/vue'

const state = reactive({valid: true, errors: []})

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'l'
  },
  list: {
    type: Array,
    required: true
  },
  namePath: {
    type: String,
    default: null
  }
})

const classes = computed(() => {
  return {
    'u-input': true,
    [`u-input--${props.size}`]: true
  }
})

const emits = defineEmits(['update:modelValue'])

// for reference since this seems a bit tricky : https://github.com/tailwindlabs/headlessui/discussions/1446
const update = (value) => {
  emits('update:modelValue', value)
}

const query = ref('')
const filteredList = computed(() => {
      const sortedList = props.list.sort(function (a, b) {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
      })
      return query.value === ''
          ? sortedList
          : sortedList.filter((e) => {
            return e.name.toLowerCase().includes(query.value.toLowerCase())
          })
    }
)

</script>
