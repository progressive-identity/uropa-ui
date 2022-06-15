<template>
  <div>
    <UButton label="New data location" v-on:click="createDataLocation" :icon="mdiPlusCircle"/>
    <div class="py-5">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(dataLocation, index) in processingRecord.dataLocations" :key="index"
            class="bg-white rounded-lg shadow border-2 px-5 text-sm">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ dataLocation.dataSource.name }}</h3>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Country</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ dataLocation.dataSource.country.name }}
                </dd>
              </div>
            </dl>
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Support</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ dataLocation.dataSupport }}</dd>
              </div>
            </dl>
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">State</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ dataLocation.storageState }}
                </dd>
              </div>
            </dl>
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Type</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ dataLocation.dataSource.storageType }}
                </dd>
              </div>
            </dl>
          </div>
          <div class="py-5 space-x-2 align-bottom">
            <UButton v-on:click="editDataLocation(dataLocation)" :icon="mdiPencil"/>
            <UButton v-on:click="deleteDataLocation(index)" :icon="mdiDelete" type="danger"/>
          </div>
        </li>
      </ul>
    </div>
    <div id="formDataLocation">
      <FormDataLocation :data-location="state.dataLocation" :edition="state.edition"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import FormDataLocation from '@/components/form/data-categories/FormDataLocation.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import DataLocationTemplate from '../../data/template/data-categories/DataLocationTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({dataLocation: DataLocationTemplate, edition: false})
const storeDisplay = useStoreDisplay()


async function createDataLocation() {
  state.dataLocation = DataLocationTemplate
  state.edition = false
  await scrollToForm()
}

async function editDataLocation(dataLocation) {
  state.dataLocation = dataLocation
  state.edition = true
  await scrollToForm()
}

function deleteDataLocation(index) {
  storeData.$patch((state) => {
    state.processingRecord.dataLocations.splice(index, 1)
  })
}

async function scrollToForm() {
  // TODO refactor into a store
  await displayForm()
  const top = document.getElementById('formDataLocation').offsetTop
  window.scroll(0, top)
}

async function displayForm() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataLocation: true,
      subDataLocation: true
    }
  })
}

</script>
