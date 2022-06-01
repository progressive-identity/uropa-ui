<template>
  <UButton label="New security measure" v-on:click="createSecurityMeasure" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="(securityMeasure, index) in processingRecord.securityMeasures" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="align-top text-gray-900 font-medium columns-2 py-5">
          <p class="w-full truncate">{{ securityMeasure.name }}</p>
          <p class="w-full text-right">{{ securityMeasure.securityMeasureType }}</p>
        </div>
          <p class="mt-1 text-gray-500">{{ securityMeasure.description }}</p>
        <div class="py-5 space-x-2 align-bottom">
          <UButton v-on:click="editSecurityMeasure(securityMeasure)" :icon="mdiPencil"/>
          <UButton v-on:click="deleteSecurityMeasure(index)" :icon="mdiDelete" type="danger"/>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormSecurityMeasure :security-measure="state.securityMeasure" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormSecurityMeasure from '@/components/form/security-measures/FormSecurityMeasure.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import securityMeasureTemplate from '../../data/template/SecurityMeasureTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({securityMeasure: securityMeasureTemplate, edition: false})
const storeDisplay = useStoreDisplay()


function createSecurityMeasure() {
  state.securityMeasure = securityMeasureTemplate
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      securityMeasure: true
    }
  })
}

function editSecurityMeasure(securityMeasure) {
  state.securityMeasure = securityMeasure
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      securityMeasure: true
    }
  })
}

function deleteSecurityMeasure(index) {
  storeData.$patch((state) => {
    state.processingRecord.securityMeasures.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      securityMeasure: false
    }
  })
}

</script>
