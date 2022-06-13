<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Data source</h3>
        <p class="mt-2 text-sm text-gray-700">Abstraction of the medium on which Personal data is stored. It could be a
          hard drive on site, a SaaS, or even an archive room.</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="columns-2 gap-0 py-2">
          <UInput v-model="dataSource.name" label="Name" placeholder="The name of the data source (ex: name of database, server etc.)" />
          <UInput v-model="dataSource.storageType" label="Storage type" placeholder="Provides useful information on the storage type" />
        </div>
        <USelect v-model="dataSource.country" :list="countries" label="Country"
                 />
      </div>
    </div>
  </div>
</template>

<script setup>
import UInput from '@/components/basic/UInput.vue'
import USelect from '@/components/basic/USelect.vue'
import countries from './../../../data/countries.json'

const props = defineProps({
  dataSource: {
    type: Object,
    required: true
  }
})

</script>
