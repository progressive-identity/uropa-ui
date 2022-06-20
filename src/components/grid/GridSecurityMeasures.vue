<template>
  <UButton label="New security measure" v-on:click="createSecurityMeasure" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(securityMeasure, index) in processingRecord.securityMeasures" :key="index"
          class="u-grid">
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>{{ securityMeasure.name }}</h3>
          </div>
          <GridButtons @edit="editSecurityMeasure(securityMeasure)" @delete="deleteSecurityMeasure(index)"/>
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
import GridButtons from '@/components/grid/GridButtons.vue'

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
