<template>
  <div v-if="formsDisplayed.securityMeasure">
    <div>
      <h3>Security measure</h3>
      <p class="form-description">A measure adopted by the controller to ensure the
        confidentiality, integrity and availability of the processed personal data.</p>
    </div>
    <div class="pt-3">
      <div class="flex justify-start space-x-5">
        <UInput v-model="securityMeasure.name" label="Name" placeholder="ex : encryption of data" :required="true"/>
        <USelectEnums v-model="securityMeasure.securityMeasureType" :list="securityMeasureTypes" label="Type"
                      class="w-64"/>
      </div>
      <UInput v-model="securityMeasure.description" label="Description" size="xl"/>
    </div>
    <div class="space-x-2 pt-3">
      <UButton label="Back" v-on:click="closeSecurityMeasure" type="secondary"/>
      <UButton label="Save" v-on:click="saveSecurityMeasure"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import {securityMeasureTypes} from '@/data/enums.js'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  securityMeasure: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function saveSecurityMeasure() {
  storeDisplay.$patch({
    formsDisplayed: {
      securityMeasure: false
    }
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.securityMeasures.push({...props.securityMeasure}))
  }
}

function closeSecurityMeasure() {
  storeDisplay.$patch({
    formsDisplayed: {
      securityMeasure: false
    }
  })
}

</script>
