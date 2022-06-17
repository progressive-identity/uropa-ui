<template>
  <UButton label="New external organization" v-on:click="createExternalOrganization" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(externalOrganization, index) in externalOrganizations" :key="index"
          class="u-grid">
        <div class="px-4 py-5 sm:px-6">
          <h3>{{ externalOrganization.legalPerson.name }}</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Organization status</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ externalOrganization.organizationStatus }}</dd>
            </div>
          </dl>
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Data categories disclosed</dt>
              <ul role="list">
                <li v-for="dataCategories in externalOrganization.dataCategoriesDisclosed"
                    class="flex items-center justify-between text-sm">
                  <div class="flex-1 flex items-center pb-2">
                    <span class="flex-1 truncate">{{ dataCategories.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </dl>
        </div>
        <div class="py-5 space-x-2 align-bottom">
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
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormExternalOrganization from '@/components/form/recipients/FormExternalOrganization.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import externalOrganizationTemplate from '../../../data/template/recipients/ExternalOrganizationTemplate.json'

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
