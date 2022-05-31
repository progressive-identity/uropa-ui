<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="formsDisplayed.externalOrganization">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">External organization</h3>
        <p class="mt-2 text-sm text-gray-700">Information about the external organization that is a recipient of the
          data processed. Useful to manage authorisations, contracts and other legal instruments.</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="columns-2 gap-0">
          <UInput v-model="externalOrganization.name" label="Name" :rounded-top-left="true"/>
          <UInput v-model="externalOrganization.organizationStatus" label="Organization status" :rounded-top-right="true"/>
        </div>
        <SelectDataCategories v-model="externalOrganization.dataCategoriesDisclosed" label="Data categories disclosed"/>
        <FormLegalPerson v-model="externalOrganization.legalPerson"/>
      </div>
      <div class="space-x-2" v-if="!nested">
        <UButton label="Back" v-on:click="closeExternalOrganization" type="secondary"/>
        <UButton label="Save" v-on:click="saveExternalOrganization"/>
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
import SelectDataCategories from '@/components/form/data-categories/SelectDataCategories.vue'
import LegalPersonTemplate from '/src/data/template/LegalPersonTemplate.json'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  externalOrganization: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  },
  nested: {
    type: Boolean,
    required: false,
    default: false
  }
})

function emptyExternalOrganization() {
  props.externalOrganization.name = ''
  props.externalOrganization.organizationStatus = ''
  props.externalOrganization.legalPerson = LegalPersonTemplate
  props.externalOrganization.dataCategoriesDisclosed = []
}

function saveExternalOrganization() {
    storeDisplay.$patch({
    formsDisplayed: {
      externalOrganization: false
    }
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.recipients.externalOrganizations.push({...props.externalOrganization}))
    emptyExternalOrganization()
  }
}

function closeExternalOrganization() {
    storeDisplay.$patch({
    formsDisplayed: {
      externalOrganization: false
    }
  })
}

</script>
