<template>
  <div>
    <UButton label="New data source" v-on:click="createDataLocation" :icon="mdiPlusCircle"/>
    <div class="py-5">
      <ul role="list" class="u-grid">
        <li v-for="(dataLocation, index) in storeData.getUniqueDataLocations" :key="index"
            class="u-grid">
          <div class="relative px-4 py-5">
            <div class="flex items-center">
              <h3>{{ dataLocation.dataSource.name }}</h3>
            </div>
            <GridButtons @edit="editDataLocation(dataLocation)" @delete="deleteDataLocation(index)"/>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiEarth"/>
                  Country
                </dt>
                <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ dataLocation.dataSource.country.name }}
                </dd>
              </div>
            </dl>
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiLaptop"/>
                  Support
                </dt>
                <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ dataLocation.dataSupport }}
                </dd>
              </div>
            </dl>
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiArchive"/>
                  State
                </dt>
                <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ dataLocation.storageState }}
                </dd>
              </div>
            </dl>
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiDatabase"/>
                  Type
                </dt>
                <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ dataLocation.dataSource.storageType }}
                </dd>
              </div>
            </dl>
          </div>
        </li>
      </ul>
    </div>
    <div id="formDataLocation">
      <DataSource :data-location="state.dataLocation"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import {mdiArchive, mdiDatabase, mdiEarth, mdiLaptop, mdiPlusCircle} from '@mdi/js'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'
import DataSource from '@/components/form/data-categories/data-source/DataSource.vue'
import DataLocationTemplate from '../../data/template/data-categories/DataLocationTemplate.json'
import DataSourceTemplate from '../../data/template/data-categories/DataSourceTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({dataLocation: DataLocationTemplate})
const storeDisplay = useStoreDisplay()

// TODO maybe we should do this only once on the application start ?
DataLocationTemplate.dataSource = structuredClone(DataSourceTemplate)

async function createDataLocation() {
  state.dataLocation = structuredClone(DataLocationTemplate)
  state.dataLocation.dataTypes = []
  await scrollToForm()
}

async function editDataLocation(dataLocation) {
  state.dataLocation = dataLocation
  state.dataLocation.dataTypes = structuredClone(storeData.getDataTypesByDataLocation(dataLocation))
  await scrollToForm()
}

function deleteDataLocation(index) {
  storeData.$patch((state) => {
    // TODO
    state.processingRecord.dataLocations.splice(index, 1)
  })
}

async function scrollToForm() {
  await displayForm()
  const top = document.getElementById('formDataLocation').offsetTop
  window.scroll(0, top)
}

async function displayForm() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataLocation: true,
      dataSource: true
    }
  })
}

</script>
