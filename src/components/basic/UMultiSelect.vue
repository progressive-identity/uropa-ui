<template>
  <div
      class="relative border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 overflow-visible">
    <Combobox as="div" :modelValue="modelValue" @update:modelValue="update" multiple>
      <ComboboxLabel class="block text-xs font-medium text-gray-900">{{ label }}</ComboboxLabel>
      <div class="relative mt-1">
        <ComboboxInput disabled="true"
                       class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                       :display-value="()=>modelValue.map(e=>e?.name)"/>
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </ComboboxButton>
        <ComboboxOptions v-if="filteredList.length > 0"
                         class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ComboboxOption v-for="element in filteredList" :key="element.name" :value="element"
                          v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ element.name }}
            </span>
              <span v-if="selected"
                    :class="['absolute inset-y-0 left-0 flex items-center pl-1.5', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true"/>
            </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
  </div>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import {computed, ref} from 'vue'
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid'
import {Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions} from '@headlessui/vue'

const storeData = useStoreData()

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  list: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const update = (value) => {
  emits('update:modelValue', value)
}

const query = ref('')
const filteredList = computed(() =>
    query.value === ''
        ? props.list
        : props.list.filter((e) => {
          return e.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

</script>
