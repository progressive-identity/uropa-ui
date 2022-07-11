<template>
  <div class="flex justify-center" v-if="ropa.purposes.length === 0">
    <p id="empty-grid" class="form-error">You must have at least one purpose</p>
  </div>
  <UButton label="New purpose" v-on:click="createPurpose" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(purpose, index) in ropa.purposes" :key="index"
          class="u-grid">
        <div class="align-top text-gray-900 font-medium py-2">
          <p v-if="purpose.isMain" class="w-full truncate hover:text-clip text-center">MAIN</p>
        </div>
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>
              <UIcon size="24" :path="mdiTarget"/>
              {{ purpose.name }}
            </h3>
          </div>
          <GridButtons @edit="editPurpose(purpose)" @delete="deletePurpose(index)"/>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiScaleBalance"/>
                Legal bases
              </dt>
              <ul role="list">
                <li v-for="legalBasis in purpose.legalBases" class="flex items-center justify-between text-sm">
                  <div class="flex-1 flex items-center pb-2">
                    <span class="flex-1 truncate">- {{ legalBasis.type }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiText"/>
                Description
              </dt>
              <dd class="flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  purpose.description
                }}
              </dd>
            </div>
          </dl>
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
import UIcon from '@/components/basic/UIcon.vue'
import GridButtons from '@/components/grid/GridButtons.vue'
import FormPurpose from '@/components/form/purposes/FormPurpose.vue'
import {mdiPlusCircle, mdiScaleBalance, mdiTarget, mdiText} from '@mdi/js'
import PurposeTemplate from '@/data/template/purposes/PurposeTemplate.json'
import LegalBasisTemplate from '@/data/template/purposes/LegalBasisTemplate.json'

const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)
const storeDisplay = useStoreDisplay()
const state = reactive({purpose: PurposeTemplate, edition: false})

// TODO maybe we should do this only once on the application start ?
PurposeTemplate.legalBasis = structuredClone(LegalBasisTemplate)

function createPurpose() {
  state.purpose = structuredClone(PurposeTemplate)
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      purpose: true
    },
    isSaveClosed: false
  })
}

function editPurpose(purpose) {
  state.purpose = purpose
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      purpose: true
    },
    isSaveClosed: false
  })
}

function deletePurpose(index) {
  storeData.$patch((state) => {
    state.ropa.purposes.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      purpose: false
    }
  })
}

</script>
