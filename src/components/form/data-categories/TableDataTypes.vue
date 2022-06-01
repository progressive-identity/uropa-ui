<template>
  <div class="px-4 sm:px-6 lg:px-8 space-y-5">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Data types</h1>
        <p class="mt-2 text-sm text-gray-700">A DataType is the most precise categorization of a data (example :
          email).</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <UButton label="Add" v-on:click="createDataType" type="primary" :icon="mdiPlusCircle"/>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Collection mean</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Optional</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Edit</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="dataType in dataCategory.dataTypes" :key="dataType.name">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{
                    dataType.name
                  }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ dataType.collectionMean }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <UIcon :path="mdiCheck" v-if="dataType.isOptional"/>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <UIcon class="cursor-pointer" :path="mdiPencil" v-on:click="editDataType(dataType)"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div>
      <FormDataType :data-type="state.dataType" :data-category="dataCategory" :edition="state.edition"/>
    </div>
  </div>
</template>
<script setup>
import {reactive} from 'vue'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UIcon from '@/components/basic/UIcon.vue'
import FormDataType from '@/components/form/data-categories/FormDataType.vue'
import {mdiCheck, mdiPencil, mdiPlusCircle} from '@mdi/js'
import DataTypeTemplate from '@/data/template/DataTypeTemplate.json'

const state = reactive({dataType: DataTypeTemplate, edition: false})
const storeDisplay = useStoreDisplay()

const props = defineProps({
  dataCategory: {
    type: Object,
    required: true
  }
})

function createDataType() {
  state.dataType = DataTypeTemplate
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      dataType: true
    }
  })
}

function editDataType(dataType) {
  state.dataType = dataType
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      dataType: true
    }
  })
}

</script>
