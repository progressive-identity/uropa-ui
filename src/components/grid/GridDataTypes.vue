<template>
  <div>
    <ul class="py-5 columns-6">
      <li v-for="(purpose, index) in processingRecord.purposes" :key="index">
        <UButton :type="index === state.indexPurpose ? 'primary' : 'secondary'"
                 @click="toggleDataCategories(index)"
                 :label="purpose.name"
                 :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        </UButton>
      </li>
    </ul>
    <ul class="py-3 columns-6">
      <li v-for="(dataCategory, index) in state.dataCategories" :key="index">
        <UButton :type="index === state.indexDataCategory ? 'primary' : 'secondary'"
                 @click="toggleDataTypes(index)"
                 :label="dataCategory.name"
                 :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        </UButton>
      </li>
    </ul>
    <ul class="py-3 columns-6">
      <li v-for="(dataType, index) in state.dataTypes" :key="index">
        <UButton :type="index === state.indexDataType ? 'primary' : 'secondary'"
                 @click="toggleDataLocations(index)"
                 :label="dataType.name"
                 :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        </UButton>
      </li>
    </ul>
  </div>
  <div>
    <!--    <FormDataLocation :data-location="state.dataCategory" :purposes="[]" :edition="state.edition"/>-->
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import {mdiArrowDownDropCircle, mdiArrowUpDropCircle} from '@mdi/js'
import FormDataLocation from '@/components/form/data-categories/FormDataLocation.vue'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({
  purposes: storeData.processingRecord.purposes,
  dataCategories: [],
  dataTypes: [],
  dataLocations: [],
  indexPurpose: -1,
  indexDataCategory: -1,
  indexDataType: -1
})

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

function toggleDataCategories(index) {
  state.indexPurpose = index
  state.dataCategories = state.purposes[index].dataCategories
}

function toggleDataTypes(index) {
  state.indexDataCategory = index
  state.dataTypes = state.dataCategories[index].dataTypes
}

function toggleDataLocations(index) {
  state.indexDataType = index
  state.dataLocations = state.dataTypes[index].dataLocations
}

</script>
