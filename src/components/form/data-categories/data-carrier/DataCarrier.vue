<template>
  <div v-if="formsDisplayed.storageLocation">
    <div class="space-y-5">
      <UVerticalBar label="Data carrier" :rotate="formsDisplayed.dataCarrier"
                    @click="toggleDisplay(formsDisplayed.subDataLocation, !formsDisplayed.dataCarrier, formsDisplayed.storageDuration)"/>
      <FormDataCarrier class="px-5" :data-carrier="storageLocation.dataCarrier"/>
      <UVerticalBar label="Storage location" :rotate="formsDisplayed.subDataLocation"
                    @click="toggleDisplay(!formsDisplayed.subDataLocation, formsDisplayed.dataCarrier, formsDisplayed.storageDuration)"/>
      <FormStorageLocation class="px-5" :storage-location="storageLocation"/>
      <UVerticalBar label="Storage durations" :rotate="formsDisplayed.storageDuration"
                    @click="toggleDisplay(formsDisplayed.subDataLocation, formsDisplayed.dataCarrier, !formsDisplayed.storageDuration)"/>
      <TableStorageDurations class="px-5" :storage-location="storageLocation"/>
      <div class="space-x-2 py-3">
        <BackButton/>
        <SaveButton :on-save="saveDataLocation"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import FormDataCarrier from '@/components/form/data-categories/data-carrier/FormDataCarrier.vue'
import UVerticalBar from '@/components/basic/UVerticalBar.vue'
import TableStorageDurations from '@/components/form/data-categories/data-carrier/TableStorageDurations.vue'
import FormStorageLocation from '@/components/form/data-categories/data-carrier/FormStorageLocation.vue'
import BackButton from '@/components/form/BackButton.vue'
import SaveButton from '@/components/form/SaveButton.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  storageLocation: {
    type: Object,
    required: true
  }
})

// TODO check if every dataType has a storageLocation before allowing next


function saveDataLocation() {
  // We get all the data types in the store
  const storeDataTypes = storeData.ropa.purposes.flatMap(purpose =>
      purpose?.dataCategories.flatMap(dataCategory =>
          dataCategory?.dataTypes.flat())
  )
  storeDataTypes.forEach(dataTypeStore => {
    // We check if the data location is present on the data type in the store
    const storageLocationPresent = dataTypeStore.storageLocations.filter(e => e.dataCarrier.name === props.storageLocation.dataCarrier.name).length > 0
    const dataType = props.storageLocation.dataTypes.find(e => e.name === dataTypeStore.name)
    if (dataType) {
      if (!storageLocationPresent) {
        // If the data location is among those chosen and that the data type is not already present, then we add it
        props.storageLocation.path = dataType.path
        const storageLocationClone = {...props.storageLocation}
        delete storageLocationClone.dataTypes
        dataTypeStore.storageLocations.push(storageLocationClone)
      }
    } else if (storageLocationPresent) {
      // If the data type is not among those chosen but the data location is present, then we remove it
      dataTypeStore.storageLocations = dataTypeStore.storageLocations.filter(e => e.dataCarrier.name !== props.storageLocation.dataCarrier.name)
    }
    delete dataTypeStore.path
  })
}

function toggleDisplay(storageLocation, dataCarrier, storageDuration) {
  storeDisplay.$patch({
    formsDisplayed: {
      subDataLocation: storageLocation,
      dataCarrier,
      storageDuration
    }
  })
}

</script>
