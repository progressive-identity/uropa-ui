<template>
  <div v-if="formsDisplayed.dataLocation">
    <div class="space-y-5">
      <UVerticalBar label="Data source" :rotate="formsDisplayed.dataSource"
                    @click="toggleDisplay(formsDisplayed.subDataLocation, !formsDisplayed.dataSource, formsDisplayed.storageDuration)"/>
      <FormDataSource class="px-5" :data-source="dataLocation.dataSource"/>
      <UVerticalBar label="Data location" :rotate="formsDisplayed.subDataLocation"
                    @click="toggleDisplay(!formsDisplayed.subDataLocation, formsDisplayed.dataSource, formsDisplayed.storageDuration)"/>
      <FormDataLocation class="px-5" :data-location="dataLocation"/>
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
import FormDataSource from '@/components/form/data-categories/data-source/FormDataSource.vue'
import UVerticalBar from '@/components/basic/UVerticalBar.vue'
import TableStorageDurations from '@/components/form/data-categories/data-source/TableStorageDurations.vue'
import FormDataLocation from '@/components/form/data-categories/data-source/FormDataLocation.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataLocation: {
    type: Object,
    required: true
  }
})

// TODO check if every dataType has a dataLocation before allowing next


function saveDataLocation() {
  storeDisplay.$reset()
  // We get all the data types in the store
  const storeDataTypes = storeData.processingRecord.purposes.flatMap(purpose =>
      purpose?.dataCategories.flatMap(dataCategory =>
          dataCategory?.dataTypes.flat())
  )
  storeDataTypes.forEach(dataTypeStore => {
    // We check if the data location is present on the data type in the store
    const dataLocationPresent = dataTypeStore.dataLocations.filter(e => e.dataSource.name === props.dataLocation.dataSource.name).length > 0
    const dataType = props.dataLocation.dataTypes.find(e => e.name === dataTypeStore.name)
    if (dataType) {
      if (!dataLocationPresent) {
        // If the data location is among those chosen and that the data type is not already present, then we add it
        props.dataLocation.path = dataType.path
        const dataLocationClone = {...props.dataLocation}
        delete dataLocationClone.dataTypes
        dataTypeStore.dataLocations.push(dataLocationClone)
      }
    } else if (dataLocationPresent) {
      // If the data type is not among those chosen but the data location is present, then we remove it
      dataTypeStore.dataLocations = dataTypeStore.dataLocations.filter(e => e.dataSource.name !== props.dataLocation.dataSource.name)
    }
    delete dataTypeStore.path
  })
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
