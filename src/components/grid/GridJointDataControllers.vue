<template>
  <UButton label="New joint data controller (optional)" v-on:click="createJointDataController" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(jointDataController, index) in ropa.jointDataControllers" :key="index"
          class="u-grid">
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>
              <UIcon size="24" :path="mdiHandshake"/>
              {{ jointDataController.legalEntity.name }}
            </h3>
          </div>
          <GridButtons @edit="editJointDataController(jointDataController)" @delete="deleteJointDataController(index)"/>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div v-if="jointDataController.legalEntity.dpo.personalInformation.firstName"
                 class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFaceManShimmer"/>
                DPO
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  jointDataController.legalEntity.dpo.personalInformation.lastName.toUpperCase() + ' ' + jointDataController.legalEntity.dpo.personalInformation.firstName
                }}
              </dd>
            </div>
            <div v-if="jointDataController.legalEntity.ceo.personalInformation.firstName"
                 class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFaceWomanShimmer"/>
                CEO
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{
                  jointDataController.legalEntity.ceo.personalInformation.lastName.toUpperCase() + ' ' + jointDataController.legalEntity.ceo.personalInformation.firstName
                }}
              </dd>
            </div>
          </dl>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormJointDataController :joint-data-controller="state.jointDataController" :edition="state.edition"/>
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
import JointDataControllerTemplate from '@/data/template/data-controllers/JointDataControllerTemplate.json'
import LegalEntityTemplate from '@/data/template/data-controllers/LegalEntityTemplate.json'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'

const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)
const state = reactive({jointDataController: JointDataControllerTemplate, edition: false})
const storeDisplay = useStoreDisplay()

function createJointDataController() {
  state.jointDataController = JSON.parse(JSON.stringify(JointDataControllerTemplate))
  state.jointDataController.legalEntity = JSON.parse(JSON.stringify(LegalEntityTemplate))
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      jointDataController: true
    }
  })
}

function editJointDataController(jointDataController) {
  state.jointDataController = jointDataController
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      jointDataController: true
    }
  })
}

function deleteJointDataController(index) {
  storeData.$patch((state) => {
    state.ropa.jointDataControllers.splice(index, 1)
  })
}

</script>
