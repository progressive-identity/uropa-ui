<template>
  <div>
    <UButton label="New data category" v-on:click="createDataCategory" :icon="mdiPlusCircle"/>
    <div class=" py-5">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(dataCategory, index) in processingRecord.dataCategories" :key="index"
            class="bg-white rounded-lg shadow border-2 px-5 text-sm">
          <div class="h-1/4 align-top text-gray-900 font-medium columns-2 py-5">
            <p class="w-full truncate">{{ dataCategory.name }}</p>
            <p class="w-full text-right" v-if="dataCategory.isMain">main</p>
          </div>
          <div class="h-2/4">
            <p class="mt-1 text-gray-500">{{ dataCategory.description }}</p>
          </div>
          <div class="h-1/4 align-top text-gray-900 font-medium py-5">
          </div>
          <div class="h-1/4 py-5 space-x-2 align-bottom">
            <UButton v-on:click="editDataCategory(dataCategory)" :icon="mdiPencil"/>
            <UButton v-on:click="deleteDataCategory(index)" :icon="mdiDelete" type="danger"/>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <FormDataCategory :data-category="state.dataCategory" purposes="[]" :edition="state.edition"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStoreData} from '@/store/data.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormDataCategory from '@/components/form/data-categories/FormDataCategory.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import DataCategoryTemplate from '../../data/template/DataCategoryTemplate.json'
import {useStoreDisplay} from '@/store/display.js'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({dataCategory: DataCategoryTemplate, edition: false, dataCategoryVisible: false})
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
