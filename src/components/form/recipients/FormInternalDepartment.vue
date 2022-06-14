<template>
  <div v-if="formsDisplayed.internalDepartment">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Internal department</h3>
      <p class="mt-2 text-sm text-gray-700">Information about the internal department that is a recipient of the data
        processed. Useful to manage authorization at the level of the organization</p>
    </div>
    <div class="pt-3">
      <UInput v-model="internalDepartment.name" label="Name"/>
      <UMultiSelect v-model="internalDepartment.dataCategoriesDisclosed" label="Data categories disclosed"
                    :list="storeData.dataCategories"/>
    </div>
    <div class="space-x-2" v-if="!nested">
      <UButton label="Back" v-on:click="closeInternalDepartment" type="secondary"/>
      <UButton label="Save" v-on:click="saveInternalDepartment"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import UMultiSelect from '@/components/basic/UMultiSelect.vue'

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
  },
  nested: {
    type: Boolean,
    required: false,
    default: false
  }
})

function emptyInternalDepartment() {
  props.internalDepartment.name = ''
  props.internalDepartment.dataCategoriesDisclosed = []
}

function saveInternalDepartment() {
  storeDisplay.$patch({
    formsDisplayed: {
      internalDepartment: false
    }
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.recipients.internalDepartments.push({...props.internalDepartment}))
    emptyInternalDepartment()
  }
}

function closeInternalDepartment() {
  storeDisplay.$patch({
    formsDisplayed: {
      internalDepartment: false
    }
  })
}

</script>
