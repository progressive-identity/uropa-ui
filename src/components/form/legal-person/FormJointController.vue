<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="formsDisplayed.jointController">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <FormLegalPerson v-model="jointController.legalPerson" title="Joint controller" description="A joint controller is an entity that process the personal data
          and jointly determines the purposes and the means of the processing, according to article 26 GDPR."/>
      <UInput :model-value="jointController.legalAgreementPath" label="Legal agreement path" placeholder="The path to the contract or binding agreement with the joint controller"
         />
      <div class="space-x-2">
        <UButton label="Back" v-on:click="closeJointController" type="secondary"/>
        <UButton label="Save" v-on:click="saveJointController"/>
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
import FormLegalPerson from '@/components/form/legal-person/FormLegalPerson.vue'
import LegalPersonTemplate from '@/data/template/LegalPersonTemplate.json'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)


const props = defineProps({
  jointController: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})


function emptyJointController() {
  props.jointController.name = ''
  props.jointController.organizationStatus = ''
  props.jointController.legalPerson = LegalPersonTemplate
  props.jointController.dataCategoriesDisclosed = []
}

function saveJointController() {
    storeDisplay.$patch({
    formsDisplayed: {
      jointController: false
    }
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.jointControllers.push({...props.jointController}))
    emptyJointController()
  }
}

function closeJointController() {
    storeDisplay.$patch({
    formsDisplayed: {
      jointController: false
    }
  })
}

</script>
