<template>
  <UButton label="New joint controller" v-on:click="createJointController" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(jointController, index) in processingRecord.jointControllers" :key="index"
          class="u-grid">
        <div class="px-4 py-3 sm:px-6">
          <h3>{{ jointController.legalPerson.name }}</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl v-if="jointController.legalPerson.dpo.personalInformation.firstName" class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">DPO</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ jointController.legalPerson.dpo.personalInformation.lastName.toUpperCase() + ' ' + jointController.legalPerson.dpo.personalInformation.firstName }}</dd>
            </div>
          </dl>
          <dl v-if="jointController.legalPerson.ceo.personalInformation.firstName" class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">CEO</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ jointController.legalPerson.ceo.personalInformation.lastName.toUpperCase() + ' ' + jointController.legalPerson.ceo.personalInformation.firstName }}</dd>
            </div>
          </dl>
        </div>
        <div class="py-5 space-x-2 align-bottom">
          <UButton v-on:click="editJointController(jointController)" :icon="mdiPencil"/>
          <UButton v-on:click="deleteJointController(index)" :icon="mdiDelete" type="danger"/>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormJointController :joint-controller="state.jointController" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormJointController from '@/components/form/legal-person/FormJointController.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import JointControllerTemplate from '../../data/template/JointControllerTemplate.json'

const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({jointController: JointControllerTemplate, edition: false})
const storeDisplay = useStoreDisplay()

function createJointController() {
  state.jointController = structuredClone(JointControllerTemplate)
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
    state.processingRecord.jointControllers.splice(index, 1)
  })
}

</script>
