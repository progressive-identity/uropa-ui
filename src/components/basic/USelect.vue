<template>
  <div>
    <Combobox as="div" :modelValue="modelValue" @update:modelValue="update">
      <ComboboxLabel class="u-label">{{ label }}</ComboboxLabel>
      <div class="relative overflow-auto columns-2">
        <ComboboxInput @change="query = $event.target.value"
                       class="u-input"
                       :display-value="(e)=>e.name"/>
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </ComboboxButton>
        <ComboboxOptions v-if="filteredList.length > 0"
                         class="overflow-auto z-10 mt-1 max-h-60 w-full py-1 text-sm">
          <ComboboxOption v-for="element in filteredList" :key="element.name" :value="element"
                          v-slot="{ active, selected }">
            <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ element.name }}
            </span>
              <span v-if="selected"
                    :class="['absolute inset-y-0 flex left-0 items-center pl-1.5', active ? 'text-white' : 'text-primary-600']">
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
    type: Object,
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
