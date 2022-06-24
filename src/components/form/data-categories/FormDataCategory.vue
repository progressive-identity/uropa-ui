<template>
  <div v-if="formsDisplayed.dataCategory">
    <div class="space-y-5">
      <UVerticalBar label="Data category" :rotate="formsDisplayed.subDataCategory"
                    @click="toggleDisplay(!formsDisplayed.subDataCategory, formsDisplayed.dataType, formsDisplayed.dataSubjectType)"/>
      <div class="px-5" v-if="formsDisplayed.subDataCategory">
        <div>
          <h3>Data category</h3>
          <p class="form-description">High-Level description of the personal data processed that is
            aggregation
            of related data types.
            For instance, the name and the first name are data types and identity information is the data
            category.</p>
        </div>
        <div>
          <USwitch v-model="dataCategory.isSensitive" label="sensitive"/>
        </div>
        <div class="py-2">
          <UInput v-model="dataCategory.name" label="Name"/>
          <UMultiSelect v-model="purposes" label="Purposes concerned"
                        :list="storeData.processingRecord.purposes"/>
        </div>
      </div>
      <UVerticalBar label="Data types" :rotate="formsDisplayed.dataType"
                    @click="toggleDisplay(formsDisplayed.subDataCategory, !formsDisplayed.dataType, formsDisplayed.dataSubjectType)"/>
      <TableDataTypes class="px-5" :data-category="dataCategory"/>
      <UVerticalBar label="Data subject types" :rotate="formsDisplayed.dataSubjectType"
                    @click="toggleDisplay(formsDisplayed.subDataCategory, formsDisplayed.dataType, !formsDisplayed.dataSubjectType)"/>
      <TableDataSubjectTypes class="px-5" :data-category="dataCategory"/>
      <div class="space-x-2 pt-3">
        <UButton label="Back" v-on:click="closeDataCategory" type="secondary"/>
        <UButton label="Save" v-on:click="saveDataCategory"/>
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
import TableDataSubjectTypes from '@/components/form/data-categories/TableDataSubjectTypes.vue'
import UVerticalBar from '@/components/basic/UVerticalBar.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

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
    default: false
  }
})

storeDisplay.$patch({
  formsDisplayed: {
    subDataCategory: true
  }
})

function saveDataCategory() {
  storeDisplay.$reset()
  if (!props.edition) {
    const purposes = storeData.processingRecord.purposes
    props.purposes.forEach(purposeDataCategory => {
          purposes.forEach(purposeStore => {
            if (purposeStore.name === purposeDataCategory.name) {
              purposeStore.dataCategories.push({...props.dataCategory})
            }
          })
        }
    )
  }
}

function closeDataCategory() {
  storeDisplay.$reset()
}

function toggleDisplay(dataCategory, dataType, dataSubjectType) {
  storeDisplay.$patch({
    formsDisplayed: {
      subDataCategory: dataCategory,
      dataType,
      dataSubjectType
    }
  })
}

</script>
