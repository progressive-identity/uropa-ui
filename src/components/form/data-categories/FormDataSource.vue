<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Data source</h3>
        <p class="mt-2 text-sm text-gray-700">Abstraction of the medium on which PersonalData is stored. It could be a
          hard drive on site, a SaaS, or even an archive room.</p>
      </div>
      <div>
        <USwitch v-model="dataSource.isOptional" label="optional"/>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="columns-2 gap-0 py-2">
          <UInput v-model="dataSource.name" label="Name" :rounded-top-left="true"/>
          <UInput v-model="dataSource.storageType" label="Storage type" :rounded-top-right="true"/>
        </div>
        <USelect v-model="dataSource.country.name" :list="countries" label="Country" :rounded-bottom-left="true"
                 :rounded-bottom-right="true"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import UInput from '@/components/basic/UInput.vue'
import USelect from '@/components/basic/USelect.vue'
import USwitch from '@/components/basic/USwitch.vue'
import countries from './../../../data/countries.json'

const props = defineProps({
  dataSource: {
    type: Object,
    required: true
  }
})

</script>
