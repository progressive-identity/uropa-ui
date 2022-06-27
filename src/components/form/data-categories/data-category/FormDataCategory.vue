<template>
  <div v-if="formsDisplayed.dataCategory">
    <div class="space-y-5">
      <UVerticalBar label="Data category" :rotate="formsDisplayed.subDataCategory"
                    @click="toggleDisplay(!formsDisplayed.subDataCategory, formsDisplayed.dataType, formsDisplayed.dataSubjectType)"/>
      <!-- TODO Rename component and create a specific data category form (but how to deal with purposes then ?) -->
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
          <UMultiSelect v-model="state.purposes" label="Purposes concerned"
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
import TableDataTypes from '@/components/form/data-categories/data-category/TableDataTypes.vue'
import TableDataSubjectTypes from '@/components/form/data-categories/data-category/TableDataSubjectTypes.vue'
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
  }
})

// props are readonly
const state = reactive({purposes: props.purposes})

storeDisplay.$patch({
  formsDisplayed: {
    subDataCategory: true
  }
})

function saveDataCategory() {
  // TODO could probably be reworked
  storeDisplay.$reset()
  // We iterate over the purposes in the store
  storeData.processingRecord.purposes.forEach(purposeStore => {
    // We check if the data category is present on the purpose in the store
    const dataCategoryPresent = purposeStore.dataCategories.filter(e => e.name === props.dataCategory.name).length > 0
    if (state.purposes.filter(e => e.name === purposeStore.name).length > 0) {
      if (!dataCategoryPresent) {
        // If the purpose is among those chosen and that the data category is not already present, then we add it
        purposeStore.dataCategories.push({...props.dataCategory})
      }
    } else if (dataCategoryPresent) {
      // If the purpose is not among those chosen but the data category is present, then we remove it
      purposeStore.dataCategories = purposeStore.dataCategories.filter(e => e.name !== props.dataCategory.name)
    }
  })
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
