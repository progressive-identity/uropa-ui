<template>
  <UButton label="New external organization" v-on:click="createExternalOrganization" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(externalOrganization, index) in processingRecord.recipients.externalOrganizations" :key="index"
          class="u-grid">
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>
              <UIcon size="24" :path="mdiAccountSwitch"/>
              {{ externalOrganization.legalPerson.name }}
            </h3>
          </div>
          <GridButtons @edit="editExternalOrganization(externalOrganization)"
                       @delete="deleteExternalOrganization(index)"/>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiDomain"/>
                Status
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  externalOrganization.organizationStatus
                }}
              </dd>
            </div>
            <div v-if="externalOrganization.legalPerson.dpo.personalInformation.firstName"
                 class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFaceManShimmer"/>
                DPO
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  externalOrganization.legalPerson.dpo.personalInformation.lastName.toUpperCase() + ' ' + externalOrganization.legalPerson.dpo.personalInformation.firstName
                }}
              </dd>
            </div>
            <div v-if="externalOrganization.legalPerson.ceo.personalInformation.firstName"
                 class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFaceWomanShimmer"/>
                CEO
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  externalOrganization.legalPerson.ceo.personalInformation.lastName.toUpperCase() + ' ' + externalOrganization.legalPerson.ceo.personalInformation.firstName
                }}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFormatListBulletedSquare"/>
                Disclosed
              </dt>
              <ul role="list">
                <li v-for="dataCategories in externalOrganization.dataCategoriesDisclosed"
                    class="flex items-center justify-between text-sm">
                  <div class="flex-1 flex items-center pb-2">
                    <span class="flex-1 truncate">- {{ dataCategories.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </dl>
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
import {
  mdiAccountSwitch,
  mdiDomain,
  mdiFaceManShimmer,
  mdiFaceWomanShimmer,
  mdiFormatListBulletedSquare,
  mdiPlusCircle
} from '@mdi/js'
import ExternalOrganizationTemplate from '../../../data/template/recipients/ExternalOrganizationTemplate.json'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({externalOrganization: ExternalOrganizationTemplate, edition: false})
const storeDisplay = useStoreDisplay()

function createExternalOrganization() {
  state.externalOrganization = structuredClone(ExternalOrganizationTemplate)
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
