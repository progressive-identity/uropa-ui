<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="formsDisplayed.dataLocation">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Data location</h3>
        <p class="mt-2 text-sm text-gray-700">Place where a data item is stored within a DataSource.</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="py-2">
          <UInput v-model="dataLocation.description" label="Description" :rounded-top-left="true"/>
          <USelectEnums v-model="dataLocation.dataSupport" label="Data support" :list="dataSupport"
                        :rounded-bottom-left="true"/>
          <USelectEnums v-model="dataLocation.storageState" label="Storage state" :list="storageState"
                        :rounded-bottom-right="true"/>
        </div>
        <FormDataSource :data-source="dataLocation.dataSource"/>
        <UMultiSelect v-model="dataLocation.dataTypes" label="Data types stored"
                      :list="storeData.dataTypesForDataLocation"/>
        <UInput v-for="dataType in dataLocation.dataTypes" v-model="dataType.path"
                :label="`Path for ${dataType.name}`"/>
        <div class="space-x-2 py-3">
          <UButton label="Back" v-on:click="closeDataLocation" type="secondary"/>
          <UButton label="Save" v-on:click="saveDataLocation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import FormDataSource from '@/components/form/data-categories/FormDataSource.vue'
import {dataSupport, storageState} from '/src/data/enums.js'
import UMultiSelect from '@/components/basic/UMultiSelect.vue'
import USelectEnums from '@/components/basic/USelectEnums.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataLocation: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function emptyDataLocation() {
  props.dataLocation.description = ''
  props.dataLocation.dataSupport = ''
  props.dataLocation.path = ''
  props.dataLocation.storageState = ''
  props.dataLocation.dataSource = {
    name: '',
    storageType: '',
    country: {
      iso: '',
      name: ''
    }
  }
  props.dataLocation.storageDurations = []
  props.dataLocation.dataTypes = []
}

function saveDataLocation() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataLocation: false
    }
  })
  if (!props.edition) {
    // FIXME dataLocations should be in dataCategories
    storeData.$patch((state) =>
        state.processingRecord.dataLocations.push({...props.dataLocation}))
    emptyDataLocation()
  }
}

function closeDataLocation() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataLocation: false
    }
  })
}

</script>
