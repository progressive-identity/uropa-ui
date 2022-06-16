<template>
  <UButton label="New internal department" v-on:click="createInternalDepartment" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="(internalDepartment, index) in internalDepartments" :key="index"
          class="u-grid">
        <div class="px-4 py-5 sm:px-6">
          <h3>{{ internalDepartment.name }}</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Data categories disclosed</dt>
              <ul role="list">
                <li v-for="dataCategories in internalDepartment.dataCategoriesDisclosed"
                    class="flex items-center justify-between text-sm">
                  <div class="flex-1 flex items-center pb-2">
                    <span class="flex-1 truncate">{{ dataCategories.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </dl>
        </div>
        <div class="py-5 space-x-2 align-bottom">
          <UButton v-on:click="editInternalDepartment(internalDepartment)" :icon="mdiPencil"/>
          <UButton v-on:click="deleteInternalDepartment(index)" :icon="mdiDelete" type="danger"/>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormInternalDepartment :internal-department="state.internalDepartment" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormInternalDepartment from '@/components/form/recipients/FormInternalDepartment.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import InternalDepartmentTemplate from '../../../data/template/recipients/InternalDepartmentTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({internalDepartment: InternalDepartmentTemplate, edition: false})
const storeDisplay = useStoreDisplay()

const props = defineProps({
  internalDepartments: {
    type: Object,
    required: true
  }
})

function createInternalDepartment() {
  state.internalDepartment = structuredClone(InternalDepartmentTemplate)
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      internalDepartment: true
    }
  })
}

function editInternalDepartment(internalDepartment) {
  state.internalDepartment = internalDepartment
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      internalDepartment: true
    }
  })
}

function deleteInternalDepartment(index) {
  storeData.$patch((state) => {
    state.processingRecord.recipients.internalDepartments.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      internalDepartment: false
    }
  })
}

</script>
