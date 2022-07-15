<template>
  <div class="space-y-8" v-if="formsDisplayed.purpose">
    <div class="space-y-5">
      <UVerticalBar label="Purpose" :rotate="formsDisplayed.subPurpose"
                    @click="toggleDisplay(!formsDisplayed.subPurpose, formsDisplayed.legalBasis)"/>
      <div class="px-5" v-if="formsDisplayed.subPurpose">
        <div>
          <h3>Purpose</h3>
          <p class="form-description">The purpose of the processing describes what the reason why the controller
            processes the personal data.</p>
        </div>
        <div class="pt-3">
          <USwitch v-model="purpose.isMain" label="main"/>
          <p v-if="purpose.isMain && storeData.getOtherMainPurpose(purpose)" class="mt-1 mb-1 text-sm text-red-600">You
            can only have
            one main purpose, {{ storeData.getOtherMainPurpose(purpose).name }} won't be main anymore </p>
          <UInput v-model="purpose.name" label="Name" :required="true"/>
          <UInput v-model="purpose.description" label="Description" size="xl"/>
        </div>
      </div>
      <UVerticalBar label="Legal bases" :rotate="formsDisplayed.legalBasis"
                    @click="toggleDisplay(formsDisplayed.subPurpose, !formsDisplayed.legalBasis)"/>
      <TableLegalBases class="px-5" :purpose="purpose"/>
    </div>
    <div class="space-x-2 pt-3">
      <BackButton/>
      <SaveButton :on-save="savePurpose"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import UVerticalBar from '@/components/basic/UVerticalBar.vue'
import TableLegalBases from '@/components/form/purposes/TableLegalBases.vue'
import BackButton from '@/components/form/BackButton.vue'
import SaveButton from '@/components/form/SaveButton.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  purpose: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

storeDisplay.$patch({
  formsDisplayed: {
    subPurpose: true
  }
})

function savePurpose() {
  // Only one purpose can be main
  if (props.purpose.isMain) {
    const mainPurpose = storeData.getOtherMainPurpose(props.purpose)
    if (mainPurpose) {
      mainPurpose.isMain = false
    }
  }

  if (!props.edition) {
    storeData.$patch((state) =>
        state.ropa.purposes.push({...props.purpose}))
  }
}

function toggleDisplay(purpose, legalBasis) {
  storeDisplay.$patch({
    formsDisplayed: {
      subPurpose: purpose,
      legalBasis
    }
  })
}
</script>
