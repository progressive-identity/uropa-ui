<template>
  <div class="space-y-5">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Data types</h3>
      <p class="mt-2 text-sm text-gray-700">A data type is the most precise categorization of a data (example :
        email).</p>
    </div>
    <div class="flex flex-col">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
            <tr class="text-left text-sm font-semibold text-gray-900">
              <th scope="col"/>
              <th scope="col" class="py-3.5 pl-4 pr-3">Name</th>
              <th scope="col" class="px-3 py-3.5">Collection mean</th>
              <th scope="col" class="px-3 py-3.5">Optional</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(dataType, index) in dataCategory.dataTypes" :key="dataType.name"
                class="text-sm font-medium text-gray-900">
              <td class="pl-2">
                <div>
                  <UButton v-if="index === dataCategory.dataTypes.length-1" :icon="mdiPlusCircle"
                           @click="createDataType"/>
                </div>
              </td>
              <td>
                <UInput v-model="dataCategory.dataTypes[index].name" label=""/>
              </td>
              <td>
                <USelectEnums v-model="dataType.collectionMean" label="" :list="collectionMeans"/>
              </td>
              <td>
                <USwitch v-model="dataType.isOptional" label=""/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import DataTypeTemplate from '@/data/template/DataTypeTemplate.json'
import USelectEnums from '@/components/basic/USelectEnums.vue'
import USwitch from '@/components/basic/USwitch.vue'
import {mdiPlusCircle} from '@mdi/js'
import {collectionMeans} from '/src/data/enums.js'
import UInput from '@/components/basic/UInput.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()

const props = defineProps({
  dataCategory: {
    type: Object,
    required: true
  }
})

if (props.dataCategory.dataTypes.length === 0) {
  createDataType()
}

function createDataType() {
  props.dataCategory.dataTypes.push({...DataTypeTemplate})
}

</script>
