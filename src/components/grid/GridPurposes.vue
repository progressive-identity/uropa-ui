<template>
  <UButton label="New purpose" v-on:click="createPurpose" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(purpose, index) in processingRecord.purposes" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="h-1/4 align-top text-gray-900 font-medium columns-2 py-5">
          <p class="w-full truncate">{{ purpose.name }}</p>
          <p class="w-full text-right" v-if="purpose.isMain">main</p>
        </div>
        <p class="mt-1 text-gray-500">{{ purpose.description }}</p>
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
import {useStoreData} from '@/store/data.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormPurpose from '@/components/form/purposes/FormPurpose.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import PurposeTemplate from '../../data/template/PurposeTemplate.json'
import {useStoreDisplay} from '@/store/display.js'

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
