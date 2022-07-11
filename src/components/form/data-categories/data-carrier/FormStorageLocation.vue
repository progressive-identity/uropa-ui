<template>
  <div v-if="formsDisplayed.subDataLocation">
    <div>
      <h3>Storage location</h3>
      <p class="form-description">Place where the data is stored (location or geospatial scope).</p>
    </div>
    <div class="py-2">
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
