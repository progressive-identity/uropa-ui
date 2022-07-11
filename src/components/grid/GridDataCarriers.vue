<template>
  <div>
    <UButton label="New data carrier" v-on:click="createDataLocation" :icon="mdiPlusCircle"/>
    <div class="py-5">
      <ul role="list" class="u-grid">
        <li v-for="(storageLocation, index) in storeData.getUniqueDataLocations" :key="index"
            class="u-grid">
          <div class="relative px-4 py-5">
            <div class="flex items-center">
              <h3>
                <UIcon size="24" :path="mdiFileMarkerOutline"/>
                {{ storageLocation.dataCarrier.name }}
              </h3>
            </div>
            <GridButtons @edit="editDataLocation(storageLocation)" @delete="deleteDataLocation(index)"/>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiEarth"/>
                  Country
                </dt>
                <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ storageLocation.dataCarrier.country.name }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiLaptop"/>
                  Support
                </dt>
                <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ storageLocation.dataCarrier.dataSupport }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiArchive"/>
                  State
                </dt>
                <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ storageLocation.dataCarrier.storageState }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt class="flex items-center text-sm font-medium text-gray-500">
                  <UIcon :path="mdiDatabase"/>
                  Type
                </dt>
                <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ storageLocation.dataCarrier.storageType }}
                </dd>
              </div>
            </dl>
          </div>
        </li>
      </ul>
    </div>
    <div id="formDataLocation">
      <DataCarrier :storage-location="state.storageLocation"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import {mdiArchive, mdiDatabase, mdiEarth, mdiFileMarkerOutline, mdiLaptop, mdiPlusCircle} from '@mdi/js'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'
import DataCarrier from '@/components/form/data-categories/data-carrier/DataCarrier.vue'
import StorageLocationTemplate from '@/data/template/data-categories/StorageLocationTemplate.json'
import DataCarrierTemplate from '@/data/template/data-categories/DataCarrierTemplate.json'

const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)
const state = reactive({storageLocation: StorageLocationTemplate})
const storeDisplay = useStoreDisplay()

// TODO maybe we should do this only once on the application start ?
StorageLocationTemplate.dataCarrier = structuredClone(DataCarrierTemplate)

async function createDataLocation() {
  state.storageLocation = structuredClone(StorageLocationTemplate)
  state.storageLocation.dataTypes = []
  await scrollToForm()
}

async function editDataLocation(storageLocation) {
  state.storageLocation = storageLocation
  state.storageLocation.dataTypes = [...storeData.getDataTypesByDataLocation(storageLocation)]
  // TODO to rework
  state.storageLocation.dataTypes.forEach((dataType, index) => {
    dataType.path = dataType.storageLocations.find(storageLocation => storageLocation.dataCarrier.name === state.storageLocation.dataCarrier.name).path
    dataType.storageLocations = []
    state.storageLocation.dataTypes[index] = {...dataType}
  })
  await scrollToForm()
}

function deleteDataLocation(index) {
  storeData.$patch((state) => {
    // TODO
    state.ropa.storageLocations.splice(index, 1)
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
      storageLocation: true,
      dataCarrier: true
    }
  })
}

</script>
