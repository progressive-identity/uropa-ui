<template>
  <div v-if="current === 5">
    <UButton label="New security measure" :action-on-click="displaySecurityMeasure" :icon="mdiPlusCircle"/>
    <div class=" py-5">
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="securityMeasure in securityMeasures" :key="securityMeasure.name"
            class="bg-white rounded-lg shadow flex">
          <div class="px-5 h-full w-full text-sm">
            <div class="text-gray-900 font-medium columns-2 py-5">
              <p class="w-full truncate">{{ securityMeasure.name }}</p>
              <p class="w-full text-right">{{ securityMeasure.securityMeasureType }}</p>
            </div>
            <div class="h-2/5">
              <p class="mt-1 text-gray-500">{{ securityMeasure.description }}</p>
            </div>
            <div class="py-5 space-x-2">
              <UButton :action-on-click="editSecurityMeasure" :icon="mdiPencil"/>
              <UButton :action-on-click="deleteSecurityMeasure" :icon="mdiDelete" type="danger"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="securityMeasureVisible">
      <FormSecurityMeasure :security-measure="editSecurityMeasureData"/>
    </div>
  </div>
</template>

<script setup>
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
let {processingRecord: {securityMeasures}} = useStoreData()

const storeForms = useStoreForms()
const {securityMeasureVisible, editSecurityMeasureData} = storeToRefs(storeForms)

const displaySecurityMeasure = async () => {
  storeForms.$patch({
    securityMeasureVisible: !storeForms.securityMeasureVisible,
    editSecurityMeasureData: securityMeasureTemplate
  })
}

const editSecurityMeasure = async (securityMeasure) => {
  storeForms.$patch({
    editSecurityMeasureData: securityMeasure,
    securityMeasureVisible: !storeForms.securityMeasureVisible
  })
}

const deleteSecurityMeasure = async (securityMeasure) => {
  storeForms.$patch({
    editSecurityMeasureData: securityMeasure,
    securityMeasureVisible: !storeForms.securityMeasureVisible
  })
}

</script>
