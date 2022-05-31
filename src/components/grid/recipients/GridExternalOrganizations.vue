<template>
  <UButton label="New external organization" v-on:click="createExternalOrganization" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(externalOrganization, index) in externalOrganizations" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="h-1/4 align-top text-gray-900 font-medium columns-2 py-5">
          <p class="w-full truncate">{{ externalOrganization.name }}</p>
        </div>
        <div class="h-1/4 py-5 space-x-2 align-bottom">
          <UButton v-on:click="editExternalOrganization(externalOrganization)" :icon="mdiPencil"/>
          <UButton v-on:click="deleteExternalOrganization(index)" :icon="mdiDelete" type="danger"/>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormExternalOrganization :external-organization="state.externalOrganization" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormExternalOrganization from '@/components/form/recipients/FormExternalOrganization.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import externalOrganizationTemplate from '../../../data/template/recipients/ExternalOrganizationTemplate.json'

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({externalOrganization: externalOrganizationTemplate, edition: false})
const storeDisplay = useStoreDisplay()

const props = defineProps({
  externalOrganizations: {
    type: Object,
    required: true
  }
})

function createExternalOrganization() {
  state.externalOrganization = externalOrganizationTemplate
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      externalOrganization: true
    }
  })
}

function editExternalOrganization(externalOrganization) {
  state.externalOrganization = externalOrganization
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      externalOrganization: true
    }
  })
}

function deleteExternalOrganization(index) {
  storeData.$patch((state) => {
    state.processingRecord.recipients.externalOrganizations.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      externalOrganization: false
    }
  })
}

</script>
