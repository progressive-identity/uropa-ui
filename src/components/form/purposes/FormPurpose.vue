<template>
  <div class="space-y-8" v-if="formsDisplayed.purpose">
    <div class="pt-8">
      <div>
        <h3>Purpose</h3>
        <p class="form-description">The purpose of the processing describes what the reason why the controller
          processes the personal data.</p>
      </div>
      <div class="pt-3">
        <USwitch v-model="purpose.isMain" label="main"/>
        <p v-if="purpose.isMain && storeData.getOtherMainPurpose(purpose)" class="mt-1 mb-1 text-sm text-red-600">You can only have
          one main purpose, {{ storeData.getOtherMainPurpose(purpose).name }} won't be main anymore </p>
        <UInput v-model="purpose.name" label="Name"/>
        <UInput v-model="purpose.description" label="Description" size="xl"/>
        <div>
          <FormLegalBasis :legal-basis="purpose.legalBasis"/>
        </div>
        <div class="space-x-2 pt-3">
          <UButton label="Back" v-on:click="closePurpose" type="secondary"/>
          <UButton label="Save" v-on:click="savePurpose"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import FormLegalBasis from '@/components/form/purposes/FormLegalBasis.vue'

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

function savePurpose() {
  storeDisplay.$patch({
    formsDisplayed: {
      purpose: false
    }
  })

  // Only one purpose can be main
  if (props.purpose.isMain) {
    const mainPurpose = storeData.getOtherMainPurpose(props.purpose)
    if (mainPurpose) {
      mainPurpose.isMain = false
    }
  }

  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.purposes.push({...props.purpose}))
  }
}

function closePurpose() {
  storeDisplay.$patch({
    formsDisplayed: {
      purpose: false
    }
  })
}

</script>
