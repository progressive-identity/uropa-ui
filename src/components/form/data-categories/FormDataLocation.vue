<template>
  <div v-if="formsDisplayed.dataLocation">
    <div class="space-y-5">
      <!-- TODO Rename component and create a specific data location form -->
      <UVerticalBar label="Data source" :rotate="formsDisplayed.dataSource"
                    @click="toggleDisplay(formsDisplayed.subDataLocation, !formsDisplayed.dataSource, formsDisplayed.storageDuration)"/>
      <FormDataSource class="px-5" :data-source="dataLocation.dataSource"/>
      <UVerticalBar label="Data location" :rotate="formsDisplayed.subDataLocation"
                    @click="toggleDisplay(!formsDisplayed.subDataLocation, formsDisplayed.dataSource, formsDisplayed.storageDuration)"/>
      <div class="px-5" v-if="formsDisplayed.subDataLocation">
        <div>
          <h3>Data location</h3>
          <p class="form-description">Place where a data item is stored within a DataSource.</p>
        </div>
        <div class="py-2">
          <UInput v-model="dataLocation.description" label="Description" size="xl"/>
          <USelectEnums v-model="dataLocation.dataSupport" label="Data support" :list="dataSupports"/>
          <USelectEnums v-model="dataLocation.storageState" label="Storage state" :list="storageStates"/>
          <UMultiSelect v-model="dataLocation.dataTypes" label="Data types stored"
                        :list="storeData.uniqueDataTypes"/>
          <UInput v-for="dataType in dataLocation.dataTypes" v-model="dataType.path"
                  :label="`Path for ${dataType.name}`" size="xl"/>
        </div>
      </div>
      <UVerticalBar label="Storage durations" :rotate="formsDisplayed.storageDuration"
                    @click="toggleDisplay(formsDisplayed.subDataLocation, formsDisplayed.dataSource, !formsDisplayed.storageDuration)"/>
      <TableStorageDurations class="px-5" :data-location="dataLocation"/>
      <div class="space-x-2 py-3">
        <UButton label="Back" v-on:click="closeDataLocation" type="secondary"/>
        <UButton label="Save" v-on:click="saveDataLocation"/>
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
import {dataSupports, storageStates} from '/src/data/enums.js'
import UMultiSelect from '@/components/basic/select/UMultiSelect.vue'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import UVerticalBar from '@/components/basic/UVerticalBar.vue'
import TableStorageDurations from '@/components/form/data-categories/TableStorageDurations.vue'

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
  storeDisplay.$reset()
  if (!props.edition) {
    // FIXME dataLocations should be in dataCategories
    storeData.$patch((state) =>
        state.processingRecord.dataLocations.push({...props.dataLocation}))
    emptyDataLocation()
  }
}

function closeDataLocation() {
  storeDisplay.$reset()
}

function toggleDisplay(dataLocation, dataSource, storageDuration) {
  storeDisplay.$patch({
    formsDisplayed: {
      subDataLocation: dataLocation,
      dataSource,
      storageDuration
    }
  })
}

</script>
