<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="formsDisplayed.dataType">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <USwitch v-model="dataType.isOptional" label="optional"/>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="columns-2 gap-0 py-2">
          <UInput v-model="dataType.name" label="Name"  />
          <USelectEnums v-model="dataType.collectionMean" label="Collection mean" :list="collectionMeans"
                         />
        </div>
        <div class="space-x-2">
          <UButton label="Back" v-on:click="closeDataType" type="secondary"/>
          <UButton label="Save" v-on:click="saveDataType"/>
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
import USwitch from '@/components/basic/USwitch.vue'
import USelectEnums from '@/components/basic/USelectEnums.vue'
import {collectionMeans} from '/src/data/enums.js'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataType: {
    type: Object,
    required: true
  },
  dataCategory: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function emptyDataType() {
  props.dataType.name = ''
  props.dataType.isOptional = true
  props.dataType.collectionMean = ''
}

function saveDataType() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataType: false
    }
  })
  if (!props.edition) {
    props.dataCategory.dataTypes.push({...props.dataType})
    // storeData.$patch((state) =>
    //     state.processingRecord.dataTypes.push({...props.dataType}))
    emptyDataType()
  }
}

function closeDataType() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataType: false
    }
  })
}

</script>
