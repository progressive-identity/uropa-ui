<template>
  <UButton label="New purpose" v-on:click="createPurpose" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="(purpose, index) in processingRecord.purposes" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="align-top text-gray-900 font-medium py-2">
          <p v-if="purpose.isMain" class="w-full truncate hover:text-clip text-center">Main</p>
        </div>
        <div class="px-4 py-3 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ purpose.name }}</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Legal basis</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ purpose.legalBasis.type }}</dd>
            </div>
          </dl>
        </div>
        <div class="py-5 space-x-2 align-bottom">
          <UButton v-on:click="editPurpose(purpose)" :icon="mdiPencil"/>
          <UButton v-on:click="deletePurpose(index)" :icon="mdiDelete" type="danger"/>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormPurpose :purpose="state.purpose" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import FormPurpose from '@/components/form/purposes/FormPurpose.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import PurposeTemplate from '../../data/template/PurposeTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({purpose: PurposeTemplate, edition: false})
const storeDisplay = useStoreDisplay()


function createPurpose() {
  state.purpose = PurposeTemplate
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      purpose: true
    }
  })
}

function editPurpose(purpose) {
  state.purpose = purpose
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      purpose: true
    }
  })
}

function deletePurpose(index) {
  storeData.$patch((state) => {
    state.processingRecord.purposes.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      purpose: false
    }
  })
}

</script>
