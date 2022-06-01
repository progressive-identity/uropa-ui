<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="formsDisplayed.dataLocation">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Data location</h3>
        <p class="mt-2 text-sm text-gray-700">Place where a data item is stored within a DataSource.</p>
      </div>
      <div>
        <USwitch v-model="dataLocation.isSensitive" label="sensitive"/>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="py-2">
          <UInput v-model="dataLocation.name" label="Name" :rounded-top-left="true"/>
          <UInput v-model="dataLocation.path" label="Path" :rounded-top-right="true"/>
          <USelect v-model="dataLocation.dataSupport" label="Data support" :list="dataSupport"
                   :rounded-bottom-left="true"/>
          <USelect v-model="dataLocation.storageState" label="Storage state" :list="storageState"
                   :rounded-bottom-right="true"/>
        </div>
        <FormDataSource :data-source="dataLocation.dataSource"/>
        <div class="space-x-2">
          <UButton label="Back" v-on:click="closeDataLocation" type="secondary"/>
          <UButton label="Save" v-on:click="saveDataLocation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import FormDataSource from '@/components/form/data-categories/FormDataSource.vue'
import USelect from '@/components/basic/USelect.vue'
import {dataSupport, storageState} from '/src/data/enums.js'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)
const state = reactive({purposes: []})

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
  props.dataLocation.name = ''
  props.dataLocation.isSensitive = false
}

function saveDataLocation() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataLocation: false
    }
  })
  if (!props.edition) {
    // storeData.$patch((state) =>
    //     state.processingRecord.purposes[0].dataCategories.push({...props.dataLocation}))
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
