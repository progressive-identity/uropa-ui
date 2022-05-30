<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="state.visible">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <FormLegalPerson v-model="jointController.legalPerson" title="Joint controllers" description="A joint controller is an entity that process the personal data
          and jointly determines the purposes and the means of the processing, according to article 26 GDPR."/>
      <UInput :model-value="jointController.legalAgreementPath" label="Legal agreement path" placeholder="The path to the contract or binding agreement with the joint controller"
      :rounded-top-left="true" :rounded-top-right="true" :rounded-bottom-right="true" :rounded-bottom-left="true"/>
      <div class="space-x-2">
        <UButton label="Back" v-on:click="closeJointController" type="secondary"/>
        <UButton label="Save" v-on:click="saveJointController"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import {useStoreForms} from '@/store/forms.js'
import UButton from '@/components/basic/UButton.vue'
import FormLegalPerson from '@/components/form/legal-person/FormLegalPerson.vue'
import UInput from '@/components/basic/UInput.vue'
import {reactive} from 'vue'
import LegalPersonTemplate from '@/data/template/LegalPersonTemplate.json'

const storeData = useStoreData()
const storeForms = useStoreForms()

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

const state = reactive({visible: true})

function emptyJointController() {
  props.jointController.name = ''
  props.jointController.organizationStatus = ''
  props.jointController.legalPerson = LegalPersonTemplate
  props.jointController.dataCategoriesDisclosed = []
}

function saveJointController() {
  state.visible = false
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.jointControllers.push({...props.jointController}))
    emptyJointController()
  }
}

function closeJointController() {
  state.visible = false
}

</script>
