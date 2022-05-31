<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="formsDisplayed.dataCategory">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <USwitch v-model="dataCategory.isSensitive" label="sensitive"/>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="py-2">
          <UInput v-model="dataCategory.name" label="Name" :rounded-top-left="true" :rounded-bottom-left="true"/>
          <UMultiSelect v-model="state.purposes" label="Purposes concerned"
                        :list="storeData.processingRecord.purposes"/>
        </div>
        <div class="space-x-2">
          <UButton label="Back" v-on:click="closeDataCategory" type="secondary"/>
          <UButton label="Save" v-on:click="saveDataCategory"/>
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
import UMultiSelect from '@/components/basic/UMultiSelect.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)
const state = reactive({purposes: []})

const props = defineProps({
  dataCategory: {
    type: Object,
    required: true
  },
  purposes: {
    type: Array,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function emptyDataCategory() {
  props.dataCategory.name = ''
  props.dataCategory.isSensitive = false
}

function saveDataCategory() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataCategory: false
    }
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.purposes[0].dataCategories.push({...props.dataCategory}))
    emptyDataCategory()
  }
}

function closeDataCategory() {
  storeDisplay.$patch({
    formsDisplayed: {
      dataCategory: false
    }
  })
}

</script>
