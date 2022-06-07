<template>
  <div>
    <ul class="py-5 columns-6">
      <li v-for="(purpose, index) in processingRecord.purposes" :key="index">
        <UButton :type="index === state.indexPurpose ? 'primary' : 'secondary'"
                 @click="toggleDataCategories(index)"
                 :label="purpose.name"
                 :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="m-1">
        </UButton>
      </li>
    </ul>
    <ul class="py-3 columns-6">
      <li v-for="(dataCategory, index) in state.dataCategories" :key="index">
        <UButton :type="index === state.indexDataCategory ? 'primary' : 'secondary'"
                 @click="toggleDataTypes(index)"
                 :label="dataCategory.name"
                 :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="m-1">
        </UButton>
      </li>
    </ul>
    <ul class="py-3 columns-6">
      <li v-for="(dataType, index) in state.dataTypes" :key="index">
        <UButton :type="index === state.indexDataType ? 'primary' : 'secondary'"
                 @click="toggleDataLocations(index)"
                 :label="dataType.name"
                 :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                 class="m-1">
        </UButton>
      </li>
    </ul>
  </div>
  <div>
    <FormDataLocation :data-location="state.dataLocations[0]"
                      :edition="false"/>
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
import DataLocationTemplate from '../../data/template/DataLocationTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({
  purposes: storeData.processingRecord.purposes,
  dataCategories: [],
  dataTypes: [],
  dataLocations: [DataLocationTemplate],
  indexPurpose: -1,
  indexDataCategory: -1,
  indexDataType: -1
})

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

function toggleDataCategories(index) {
  state.indexDataCategory = -1
  state.indexDataType = -1
  state.indexPurpose = index
  state.dataCategories = state.purposes[index].dataCategories
  state.dataTypes = []
  state.dataLocations = [DataLocationTemplate]
}

function toggleDataTypes(index) {
  state.indexDataType = -1
  state.indexDataCategory = index
  state.dataTypes = state.dataCategories[index].dataTypes
  state.dataLocations = [DataLocationTemplate]
}

function toggleDataLocations(index) {
  state.indexDataType = index
  state.dataLocations = state.dataTypes[index].dataLocations
  if (state.dataLocations.length === 0) {
    state.dataLocations.push(DataLocationTemplate)
  }
  storeDisplay.$patch({
    formsDisplayed: {
      dataLocation: true
    }
  })
}

</script>
