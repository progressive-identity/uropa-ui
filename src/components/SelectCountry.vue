<template>
  <div class="relative border border-gray-300 px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
    <label for="location" class="block text-xs font-medium text-gray-900">Country</label>
    <select id="location" name="location"
            class="block border-0 p-0 w-full pl-3 pr-10 text-base  sm:text-sm ring-0 focus:ring-0">
      <option v-for="country in countries">{{ country.name }}</option>
    </select>
  </div>
</template>

<script setup>
import countries from './../data/countries.json'

// TODO use the model
const props = defineProps({
  country: {
    type: Object,
    required: true
  }
})

const selected = countries.filter(e => e.name === 'France').pop()

// TODO try to use command palettes later
// query.value === '' ? [] : countries.filter((country) => {
//   return country.name.toLowerCase().includes(query.value.toLowerCase())
// })

</script>
