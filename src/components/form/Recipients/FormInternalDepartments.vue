<template>
  <UButton label="New internal department" v-on:click="createInternalDepartment" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(internalDepartment, index) in internalDepartments" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="h-1/4 align-top text-gray-900 font-mediumpy-5">
          <p class="w-full truncate">{{ internalDepartment.name }}</p>
        </div>
        <TabDataCategory :data-categories="internalDepartment.dataCategoriesDisclosed"/>
        <div class="h-1/4 py-5 space-x-2 align-bottom">
          <UButton v-on:click="editInternalDepartment(internalDepartment)" :icon="mdiPencil"/>
          <UButton v-on:click="deleteInternalDepartment(index)" :icon="mdiDelete" type="danger"/>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="internalDepartmentVisible">
    <FormInternalDepartment :internal-department="state.internalDepartment" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStore} from '@/store/stepper.js'
import {useStoreData} from "@/store/data.js"
import {useStoreForms} from '@/store/forms.js'
import {storeToRefs} from 'pinia'
import UButton from "@/components/basic/UButton.vue"
import FormInternalDepartment from "@/components/form/Recipients/FormInternalDepartment.vue"
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import internalDepartmentTemplate from '../../../data/recipients/InternalDepartmentTemplate.json'
import TabDataCategory from "@/components/TabDataCategory.vue"

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const storeForms = useStoreForms()
const {internalDepartmentVisible} = storeToRefs(storeForms)
const state = reactive({internalDepartment: internalDepartmentTemplate, edition: false})

const props = defineProps({
  internalDepartments: {
    type: Object,
    required: true
  }
})

function createInternalDepartment() {
  state.internalDepartment = internalDepartmentTemplate
  state.edition = false
  storeForms.$patch({
    internalDepartmentVisible: true
  })
}

function editInternalDepartment(internalDepartment) {
  state.internalDepartment = internalDepartment
  state.edition = true
  storeForms.$patch({
    internalDepartmentVisible: true
  })
}

function deleteInternalDepartment(index) {
  storeData.$patch((state) => {
    state.processingRecord.recipients.internalDepartments.splice(index, 1)
  })
}

</script>
