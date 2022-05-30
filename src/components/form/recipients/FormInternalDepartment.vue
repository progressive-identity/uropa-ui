<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Internal department</h3>
        <p class="mt-2 text-sm text-gray-700">Information about the internal department that is a recipient of the data
          processed. Useful to manage authorization at the level of the organization</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <UInput v-model="internalDepartment.name" label="Name" :rounded-top-left="true"/>
        <SelectDataCategories v-model="internalDepartment.dataCategoriesDisclosed" label="Data categories disclosed"/>
      </div>
      <div class="space-x-2">
        <UButton label="Back" v-on:click="closeInternalDepartment" type="secondary"/>
        <UButton label="Save" v-on:click="saveInternalDepartment"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStoreData} from "@/store/data.js"
import {useStoreForms} from "@/store/forms.js"
import UButton from "@/components/basic/UButton.vue"
import UInput from "@/components/basic/UInput.vue"
import SelectDataCategories from "@/components/form/data-categories/SelectDataCategories.vue"

const storeData = useStoreData()
const storeForms = useStoreForms()

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

function emptyInternalDepartment() {
  props.internalDepartment.name = ''
  props.internalDepartment.dataCategoriesDisclosed = []
}

function saveInternalDepartment() {
  storeForms.$patch({
    internalDepartmentVisible: false
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.recipients.internalDepartments.push({...props.internalDepartment}))
    emptyInternalDepartment()
  }
}

function closeInternalDepartment() {
  storeForms.$patch({
    internalDepartmentVisible: false
  })
}

</script>
