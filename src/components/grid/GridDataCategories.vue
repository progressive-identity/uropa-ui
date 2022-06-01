<template>
  <div>
    <UButton label="New data category" v-on:click="createDataCategory" :icon="mdiPlusCircle"/>
    <div class="py-5">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(dataCategory, index) in storeData.dataCategories" :key="index"
            class="bg-white rounded-lg shadow border-2 px-5 text-sm">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ dataCategory.name }}</h3>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Purposes</dt>
                <ul role="list">
                  <li v-for="purpose in storeData.processingRecord.purposes" class="flex items-center justify-between text-sm">
                    <div class="flex-1 flex items-center pb-2">
                      <span class="flex-1 truncate">{{purpose.name}}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Data types</dt>
                <ul role="list">
                  <li v-for="dataType in dataCategory.dataTypes" class="flex items-center justify-between text-sm">
                    <div class="flex-1 flex items-center pb-2">
                      <span class="flex-1 truncate">{{dataType.name}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </dl>
          </div>
          <div class="py-5 space-x-2 align-bottom">
            <UButton v-on:click="editDataCategory(dataCategory)" :icon="mdiPencil"/>
            <UButton v-on:click="deleteDataCategory(index)" :icon="mdiDelete" type="danger"/>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <FormDataCategory :data-category="state.dataCategory" :purposes="[]" :edition="state.edition"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import FormDataCategory from '@/components/form/data-categories/FormDataCategory.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import DataCategoryTemplate from '../../data/template/DataCategoryTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({dataCategory: DataCategoryTemplate, edition: false})
const storeDisplay = useStoreDisplay()


function createDataCategory() {
  state.dataCategory = DataCategoryTemplate
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      dataCategory: true
    }
  })
}

function editDataCategory(dataCategory) {
  state.dataCategory = dataCategory
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      dataCategory: true
    }
  })
}

function deleteDataCategory(index) {
  // storeData.$patch((state) => {
  //   state.processingRecord.dataCategorys.splice(index, 1)
  // })
  storeDisplay.$patch({
    formsDisplayed: {
      dataCategory: false
    }
  })
}

</script>
