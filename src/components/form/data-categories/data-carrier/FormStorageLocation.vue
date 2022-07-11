<template>
  <div v-if="formsDisplayed.subDataLocation">
    <div>
      <h3>Storage location</h3>
      <p class="form-description">Place where the data is stored (location or geospatial scope).</p>
    </div>
    <div class="py-2">
      <UInput v-model="storageLocation.description" label="Description" size="xl"/>
      <div class="flex justify-start space-x-5">
        <USelectEnums v-model="storageLocation.dataSupport" label="Data support" :list="dataSupports" class="w-48"/>
        <USelectEnums v-model="storageLocation.storageState" label="Storage state" :list="storageStates" class="w-64"/>
      </div>
      <UMultiSelect v-model="storageLocation.dataTypes" label="Data types stored"
                    :list="uniqueDataTypes"/>
      <UInput v-for="dataType in storageLocation.dataTypes" v-model="dataType.path"
              :label="`Path for ${dataType.name}`" size="xl"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import UMultiSelect from '@/components/basic/select/UMultiSelect.vue'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import {dataSupports, storageStates} from '/src/data/enums.js'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  storageLocation: {
    type: Object,
    required: true
  }
})

const uniqueDataTypes = storeData.getUniqueDataTypes
uniqueDataTypes.forEach(dataType => dataType.path = '')
</script>
