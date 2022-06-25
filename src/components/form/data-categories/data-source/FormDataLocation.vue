<template>
  <div v-if="formsDisplayed.subDataLocation">
    <div>
      <h3>Data location</h3>
      <p class="form-description">Place where a data item is stored within a data source.</p>
    </div>
    <div class="py-2">
      <UInput v-model="dataLocation.description" label="Description" size="xl"/>
      <div class="flex justify-start space-x-5">
        <USelectEnums v-model="dataLocation.dataSupport" label="Data support" :list="dataSupports" class="w-48"/>
        <USelectEnums v-model="dataLocation.storageState" label="Storage state" :list="storageStates" class="w-48"/>
      </div>
      <UMultiSelect v-model="dataLocation.dataTypes" label="Data types stored"
                    :list="uniqueDataTypes"/>
      <UInput v-for="dataType in dataLocation.dataTypes" v-model="dataType.path"
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
  dataLocation: {
    type: Object,
    required: true
  }
})

const uniqueDataTypes = storeData.getUniqueDataTypes
uniqueDataTypes.forEach(dataType => dataType.path = '')
</script>
