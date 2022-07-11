<template>
  <UButton label="New joint controller (optional)" v-on:click="createJointController" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(jointController, index) in processingRecord.jointDataControllers" :key="index"
          class="u-grid">
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>
              <UIcon size="24" :path="mdiHandshake"/>
              {{ jointController.legalPerson.name }}
            </h3>
          </div>
          <GridButtons @edit="editJointController(jointController)" @delete="deleteJointController(index)"/>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div v-if="jointController.legalPerson.dpo.personalInformation.firstName"
                 class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFaceManShimmer"/>
                DPO
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  jointController.legalPerson.dpo.personalInformation.lastName.toUpperCase() + ' ' + jointController.legalPerson.dpo.personalInformation.firstName
                }}
              </dd>
            </div>
            <div v-if="jointController.legalPerson.ceo.personalInformation.firstName"
                 class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFaceWomanShimmer"/>
                CEO
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  jointController.legalPerson.ceo.personalInformation.lastName.toUpperCase() + ' ' + jointController.legalPerson.ceo.personalInformation.firstName
                }}
              </dd>
            </div>
          </dl>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormJointDataController :joint-controller="state.jointController" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormJointDataController from '@/components/form/data-controllers/FormJointDataController.vue'
import {mdiFaceManShimmer, mdiFaceWomanShimmer, mdiHandshake, mdiPlusCircle} from '@mdi/js'
import JointDataControllerTemplate from '../../data/template/data-controllers/JointDataControllerTemplate.json'
import LegalEntityTemplate from '../../data/template/data-controllers/LegalEntityTemplate.json'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({jointController: JointDataControllerTemplate, edition: false})
const storeDisplay = useStoreDisplay()

function createJointController() {
  state.jointController = structuredClone(JointDataControllerTemplate)
  state.jointController.legalPerson = structuredClone(LegalEntityTemplate)
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      jointController: true
    }
  })
}

function editJointController(jointController) {
  state.jointController = jointController
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      jointController: true
    }
  })
}

function deleteJointController(index) {
  storeData.$patch((state) => {
    state.processingRecord.jointDataControllers.splice(index, 1)
  })
}

</script>
