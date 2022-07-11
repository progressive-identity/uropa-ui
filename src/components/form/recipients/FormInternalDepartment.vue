<template>
  <div v-if="formsDisplayed.internalDepartment">
    <div>
      <h3>Internal department</h3>
      <p class="form-description">Information about the internal department that is a recipient of the data
        processed. Useful to manage authorization at the level of the organization</p>
    </div>
    <div class="pt-3">
      <UInput v-model="internalDepartment.name" label="Name" placeholder="ex : marketing, HR, etc." :required="true"/>
      <UMultiSelect v-model="internalDepartment.dataCategoriesDisclosed" label="Data categories disclosed *"
                    :list="storeData.getUniqueDataCategories"/>
    </div>
    <div class="space-x-2 pt-3">
      <BackButton/>
      <SaveButton :on-save="saveInternalDepartment"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import UMultiSelect from '@/components/basic/select/UMultiSelect.vue'
import BackButton from '@/components/form/BackButton.vue'
import SaveButton from '@/components/form/SaveButton.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  internalDepartment: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function saveInternalDepartment() {
  if (!props.edition) {
    storeData.$patch((state) =>
        state.ropa.recipients.internalDepartments.push({...props.internalDepartment}))
  }
}
</script>
