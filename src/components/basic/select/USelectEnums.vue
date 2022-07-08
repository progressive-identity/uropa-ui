<template>
  <div class="block py-2">
    <Listbox :modelValue="modelValue" @update:modelValue="update">
      <ListboxLabel class="u-label"> {{ label }}</ListboxLabel>
      <div class="relative">
        <div>
          <div
              class="mt-1 border border-gray-300 relative z-0 flex shadow-sm rounded-md divide-x divide-gray-300 max-w-xs">
            <div class="relative flex items-center py-2 pl-3 pr-4 border border-transparent grow">
              <p class="text-sm">{{ modelValue }}</p>
            </div>
            <ListboxButton
                class="relative flex items-center p-2 rounded-l-none rounded-r-md text-sm font-medium
                focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500">
              <ChevronDownIcon class="h-5 w-5" aria-hidden="true"/>
            </ListboxButton>
          </div>
        </div>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
          <ListboxOptions
              class="absolute overflow-auto z-10 mt-2 rounded-md shadow-lg overflow-visible bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5">
            <ListboxOption as="template" v-for="element in list" :key="element.name" :value="element.name"
                           v-slot="{ active, selected }">
              <li :class="[active ? 'text-white bg-primary-500' : 'text-gray-900', 'cursor-default select-none relative p-4 text-sm']">
                <div class="flex flex-col">
                  <div class="flex justify-between">
                    <p :class="selected ? 'font-semibold' : 'font-normal'">
                      {{ element.name }}
                    </p>
                    <span v-if="selected" :class="active ? 'text-white' : 'text-primary-500'">
                    <CheckIcon class="h-5 w-5 ml-1" aria-hidden="true"/>
                  </span>
                  </div>
                  <p :class="[active ? 'text-primary-200' : 'text-gray-500', 'mt-2']">
                    {{ element.description }}
                  </p>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon, ChevronDownIcon} from '@heroicons/vue/solid'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// for reference since this seems a bit tricky : https://github.com/tailwindlabs/headlessui/discussions/1446
const update = (value) => {
  emits('update:modelValue', value)
}

</script>
