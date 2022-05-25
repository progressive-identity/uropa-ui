<template>
  <div v-if="current === 5">
    <UButton label="New security measure" v-on:click="createSecurityMeasure" :icon="mdiPlusCircle"/>
    <div class=" py-5">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(securityMeasure, index) in processingRecord.securityMeasures" :key="index"
            class="bg-white rounded-lg shadow border-2 px-5 text-sm">
          <div class="h-1/4 align-top text-gray-900 font-medium columns-2 py-5">
            <p class="w-full truncate">{{ securityMeasure.name }}</p>
            <p class="w-full text-right">{{ securityMeasure.securityMeasureType }}</p>
          </div>
          <div class="h-2/4">
            <p class="mt-1 text-gray-500">{{ securityMeasure.description }}</p>
          </div>
          <div class="h-1/4 py-5 space-x-2 align-bottom">
            <UButton v-on:click="editSecurityMeasure(securityMeasure)" :icon="mdiPencil"/>
            <UButton v-on:click="deleteSecurityMeasure(index)" :icon="mdiDelete" type="danger"/>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="securityMeasureVisible">
      <FormSecurityMeasure :security-measure="state.securityMeasure" :edition="state.edition"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStore} from '@/store/stepper'
import {useStoreData} from "@/store/data.js"
import {useStoreForms} from '@/store/forms'
import {storeToRefs} from 'pinia'
import UButton from "@/components/basic/UButton.vue"
import FormSecurityMeasure from "@/components/form/FormSecurityMeasure.vue"
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import securityMeasureTemplate from './../../data/SecurityMeasureTemplate.json'

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const storeForms = useStoreForms()
const {securityMeasureVisible} = storeToRefs(storeForms)
const state = reactive({securityMeasure: securityMeasureTemplate, edition: false})


function createSecurityMeasure() {
  state.securityMeasure = securityMeasureTemplate
  state.edition = false
  storeForms.$patch({
    securityMeasureVisible: true
  })
}

function editSecurityMeasure(securityMeasure) {
  state.securityMeasure = securityMeasure
  state.edition = true
  storeForms.$patch({
    securityMeasureVisible: true
  })
}

function deleteSecurityMeasure(index) {
  storeData.$patch((state) => {
    state.processingRecord.securityMeasures.splice(index, 1)
  })
}

</script>
