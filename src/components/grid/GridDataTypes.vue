<template>
  <div>
    <div class="py-5"
         v-for="(purpose, index) in storeData.processingRecord.purposes" :key="index">
      <UButton type="secondary" @click="toggleDataCategories(index)"
               :label="purpose.name"
               :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
               class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      </UButton>
      <div class="py-3"
           v-for="(dataCategory, index) in purpose.dataCategories" :key="index">
        <UButton type="secondary" @click="toggleDataTypes(index)"
                 :label="dataCategory.name"
                 :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        </UButton>
        <ul class="py-3 columns-5">
          <li v-for="(dataType, index) in dataCategory.dataTypes" :key="index">
            <UButton type="secondary" @click="toggleDataType(index)"
                     :label="dataType.name"
                     :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                     class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            </UButton>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div>
    <FormDataLocation :data-location="state.dataCategory" :purposes="[]" :edition="state.edition"/>
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
const state = reactive({})
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

function toggleDataCategories(index) {

}

function toggleDataTypes(index) {

}

function toggleDataType(index) {

}

</script>
