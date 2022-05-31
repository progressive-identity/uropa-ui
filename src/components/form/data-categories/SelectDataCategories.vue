<template>
  <Combobox as="div" v-model="modelValue" multiple>
    <ComboboxLabel class="block text-sm font-medium text-gray-700">{{ title }}</ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxInput disabled="true"
                     class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                     :display-value="(dataCategories)=>dataCategories.map(dataCategory=>dataCategory?.name)"/>
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
      </ComboboxButton>
      <ComboboxOptions v-if="filteredDataCategories.length > 0"
                       class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="dataCategory in filteredDataCategories" :key="dataCategory.id" :value="dataCategory"
                        v-slot="{ active, selected }"
                        v-on:click="emit('update:modelValue', modelValue)">
          <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ dataCategory.name }}
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
</template>

<script setup>
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {storeToRefs} from 'pinia'
import dataCategories from '../../../data/dataCategories.json'
import {computed, ref} from 'vue'
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid'
import {Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions} from '@headlessui/vue'

const store = useStore()
const {current} = storeToRefs(store)
const {processingRecord: {purposes}} = useStoreData()

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: 'Data categories'
  }
})

const emit = defineEmits(['update:modelValue'])

const query = ref('')
const filteredDataCategories = computed(() =>
    query.value === ''
        ? dataCategories
        : dataCategories.filter((dataCategory) => {
          return dataCategory.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

</script>
