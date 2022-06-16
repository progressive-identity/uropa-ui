<template>
  <UButton label="New security measure" v-on:click="createSecurityMeasure" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="(securityMeasure, index) in processingRecord.securityMeasures" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="px-4 py-3 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{ securityMeasure.name }}</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Type</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  securityMeasure.securityMeasureType
                }}
              </dd>
            </div>
          </dl>
        </div>
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
import SecurityMeasureTemplate from '../../data/template/SecurityMeasureTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({securityMeasure: SecurityMeasureTemplate, edition: false})
const storeDisplay = useStoreDisplay()


function createSecurityMeasure() {
  state.securityMeasure = structuredClone(SecurityMeasureTemplate)
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
