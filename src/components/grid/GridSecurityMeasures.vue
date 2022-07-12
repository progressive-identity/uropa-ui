<template>
  <div class="flex justify-center" v-if="ropa.securityMeasures.length === 0">
    <p id="empty-grid" class="form-error">You must have at least one security measure</p>
  </div>
  <UButton label="New security measure" v-on:click="createSecurityMeasure" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(securityMeasure, index) in ropa.securityMeasures" :key="index"
          class="u-grid">
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>
              <UIcon size="24" :path="mdiSecurity"/>
              {{ securityMeasure.name }}
            </h3>
          </div>
          <GridButtons @edit="editSecurityMeasure(securityMeasure)" @delete="deleteSecurityMeasure(index)"/>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiLock"/>
                Type
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  securityMeasure.securityMeasureType
                }}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiText"/>
                Description
              </dt>
              <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  securityMeasure.description
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
import {mdiLock, mdiPlusCircle, mdiSecurity, mdiText} from '@mdi/js'
import SecurityMeasureTemplate from '@/data/template/SecurityMeasureTemplate.json'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'

const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)
const state = reactive({securityMeasure: SecurityMeasureTemplate, edition: false})
const storeDisplay = useStoreDisplay()


function createSecurityMeasure() {
  state.securityMeasure = JSON.parse(JSON.stringify(SecurityMeasureTemplate))
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
    state.ropa.securityMeasures.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      securityMeasure: false
    }
  })
}

</script>
