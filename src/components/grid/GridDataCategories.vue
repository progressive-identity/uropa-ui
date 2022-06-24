<template>
  <div>
    <div>
      <UButton label="New data category" @click="createDataCategory" :icon="mdiPlusCircle"/>
    </div>
    <div class="py-5">
      <ul role="list" class="u-grid">
        <li v-for="(dataCategory, index) in storeData.uniqueDataCategories" :key="index"
            class="u-grid">
          <div class="relative px-4 py-5">
            <div class="flex items-center">
              <h3>{{ dataCategory.name }}</h3>
            </div>
            <GridButtons @edit="editDataCategory(dataCategory)" @delete="deleteDataCategory(dataCategory)"/>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiScaleBalance"/>
                  Purposes
                </dt>
                <ul role="list">
                  <li v-for="purpose in storeData.getPurposesByDataCategory(dataCategory)"
                      class="flex items-center justify-between text-sm">
                    <div class="flex-1 flex items-center pb-2">
                      <span class="flex-1 truncate">{{ purpose.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="dataCategory?.dataTypes?.length > 0"
                   class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiCardAccountDetails"/>
                  Data types
                </dt>
                <ul role="list">
                  <li v-for="dataType in dataCategory.dataTypes" class="flex items-center justify-between text-sm">
                    <div class="flex-1 flex items-center pb-2">
                      <span class="flex-1 truncate">{{ dataType.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="dataCategory?.dataSubjectTypes?.length > 0"
                   class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiFaceWoman"/>
                  Data subjects
                </dt>
                <ul role="list">
                  <li v-for="dataSubjectType in dataCategory?.dataSubjectTypes"
                      class="flex items-center justify-between text-sm">
                    <div class="flex-1 flex items-center pb-2">
                      <span class="flex-1 truncate">{{ dataSubjectType.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </dl>
          </div>
        </li>
      </ul>
    </div>
    <div id="formDataCategory">
      <USelect v-if="formsDisplayed.dataCategory" v-model="state.dataCategory"
               :list="predefinedDataCategories" @click="loadDataCategory"
               label="Load a template" class="py-5"/>
      <FormDataCategory :data-category="state.dataCategory" :purposes="state.purposes" :edition="state.edition"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import USelect from '@/components/basic/select/USelect.vue'
import FormDataCategory from '@/components/form/data-categories/FormDataCategory.vue'
import {mdiCardAccountDetails, mdiFaceWoman, mdiPlusCircle, mdiScaleBalance} from '@mdi/js'
import DataCategoryTemplate from '@/data/template/data-categories/DataCategoryTemplate.json'
import DataSubjectTypeTemplate from '@/data/template/data-categories/DataSubjectTypeTemplate.json'
import DataTypeTemplate from '@/data/template/DataTypeTemplate.json'
import predefinedDataCategories from '@/data/dataCategories.json'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)
const state = reactive({dataCategory: DataCategoryTemplate, edition: false, purposes: []})

async function createDataCategory() {
  state.dataCategory = structuredClone(DataCategoryTemplate)
  state.edition = false
  state.purposes = []
  await scrollToForm()
}

async function loadDataCategory() {
  if (state.dataCategory.name !== '') {
    state.edition = false
    state.purposes = []
    storeDisplay.$patch({
      formsDisplayed: {
        subDataCategory: true,
        dataType: true,
        dataSubjectType: true
      }
    })

    //FIXME not sure it should be done here
    if (state.dataCategory?.dataTypes?.length === 0) {
      state.dataCategory.dataTypes.push(structuredClone(DataTypeTemplate))
    }
    if (state.dataCategory?.dataSubjectTypes?.length === 0) {
      state.dataCategory.dataSubjectTypes.push(structuredClone(DataSubjectTypeTemplate))
    }
  }
}

async function editDataCategory(dataCategory) {
  state.dataCategory = dataCategory
  state.edition = true
  state.purposes = storeData.getPurposesByDataCategory(dataCategory)
  await scrollToForm()
}

async function deleteDataCategory(dataCategoryToDelete) {
  storeData.processingRecord?.purposes.forEach((purpose, indexPurpose) => {
    purpose?.dataCategories.forEach((dataCategory, indexDataCategory) => {
      if (dataCategory.name === dataCategoryToDelete.name) {
        storeData.$patch((state) => {
          state.processingRecord.purposes[indexPurpose].dataCategories.splice(indexDataCategory, 1)
        })
      }
    })
  })
}

async function scrollToForm() {
  // FIXME is this the right way to do it ?
  // TODO once finalized this behaviour should be reported on the other grids components
  await displayForm()
  const top = document.getElementById('formDataCategory').offsetTop
  window.scroll(0, top)
}

async function displayForm() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataCategory: true,
      subDataCategory: true
    }
  })
}

</script>
