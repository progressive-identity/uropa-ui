<template>
  <div v-if="formsDisplayed.dataCategory">
    <div class="pt-8">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Data category</h3>
        <p class="mt-2 text-sm text-gray-700">High-Level description of the personal data processed that is aggregation of related DataTypes.
          For instance, the name and the first name are data types and identity information is the data category.</p>
      </div>
      <div>
        <USwitch v-model="dataCategory.isSensitive" label="sensitive"/>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="py-2">
          <UInput v-model="dataCategory.name" label="Name"  />
          <UMultiSelect v-model="state.purposes" label="Purposes concerned"
                        :list="storeData.processingRecord.purposes"/>
        </div>
        <div class="py-2">
          <TableDataTypes :data-category="dataCategory"/>
        </div>
        <div class="space-x-2 pt-3">
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
import UMultiSelect from '@/components/basic/select/UMultiSelect.vue'
import TableDataTypes from '@/components/form/data-categories/TableDataTypes.vue'

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
