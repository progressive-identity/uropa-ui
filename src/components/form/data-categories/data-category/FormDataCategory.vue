<template>
  <div v-if="formsDisplayed.dataCategory">
    <div class="space-y-5">
      <UVerticalBar label="Data category" :rotate="formsDisplayed.subDataCategory"
                    @click="toggleDisplay(!formsDisplayed.subDataCategory, formsDisplayed.dataType, formsDisplayed.dataSubjectCategory)"/>
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
          <USelectEnums v-if="dataCategory.isSensitive" v-model="dataCategory.sensitiveLegalBasis"
                        label="Sensitive legal basis"
                        :list="sensitiveLegalBases"/>
        </div>
        <div class="py-2">
          <UInput v-model="dataCategory.name" label="Name" placeholder="ex : identity, connection data, etc."
                  :required="true"/>
          <UCheckboxes v-model="props.purposes" label="Check the purposes concerned (at least one required)"
                       :list="storeData.ropa.purposes"/>
        </div>
      </div>
      <UVerticalBar label="Data types" :rotate="formsDisplayed.dataType"
                    @click="toggleDisplay(formsDisplayed.subDataCategory, !formsDisplayed.dataType, formsDisplayed.dataSubjectCategory)"/>
      <TableDataTypes class="px-5" :data-category="dataCategory"/>
      <UVerticalBar label="Data subject categories" :rotate="formsDisplayed.dataSubjectCategory"
                    @click="toggleDisplay(formsDisplayed.subDataCategory, formsDisplayed.dataType, !formsDisplayed.dataSubjectCategory)"/>
      <TableDataSubjectCategories class="px-5" :data-category="dataCategory"/>
      <div class="space-x-2 pt-3">
        <BackButton/>
        <SaveButton :on-save="saveDataCategory"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import TableDataTypes from '@/components/form/data-categories/data-category/TableDataTypes.vue'
import TableDataSubjectCategories from '@/components/form/data-categories/data-category/TableDataSubjectCategories.vue'
import UVerticalBar from '@/components/basic/UVerticalBar.vue'
import BackButton from '@/components/form/BackButton.vue'
import SaveButton from '@/components/form/SaveButton.vue'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import {sensitiveLegalBases} from '@/data/enums.js'
import UCheckboxes from '@/components/basic/UCheckboxes.vue'

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

storeDisplay.$patch({
  formsDisplayed: {
    subDataCategory: true
  }
})

function saveDataCategory() {
  // TODO could probably be reworked
  // We iterate over the purposes in the store
  storeData.ropa.purposes.forEach(purposeStore => {
    // We check if the data category is present on the purpose in the store
    const dataCategoryPresent = purposeStore.dataCategories.filter(e => e.name === props.dataCategory.name).length > 0
    if (props.purposes.filter(e => e.name === purposeStore.name).length > 0) {
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

function toggleDisplay(dataCategory, dataType, dataSubjectCategory) {
  storeDisplay.$patch({
    formsDisplayed: {
      subDataCategory: dataCategory,
      dataType,
      dataSubjectCategory
    }
  })
}

</script>
