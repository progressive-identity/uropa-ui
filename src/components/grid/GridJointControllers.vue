<template>
  <UButton label="New joint controller" v-on:click="createJointController" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(jointController, index) in processingRecord.jointControllers" :key="index"
          class="bg-white rounded-lg shadow border-2 px-5 text-sm">
        <div class="h-1/4 align-top text-gray-900 font-medium py-5">
          <p class="w-full truncate">{{ jointController.legalPerson.name }}</p>
        </div>
        <div class="h-1/4 py-5 space-x-2 align-bottom">
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
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormJointController from '@/components/form/legal-person/FormJointController.vue'
import {mdiDelete, mdiPencil, mdiPlusCircle} from '@mdi/js'
import JointControllerTemplate from '../../data/template/JointControllerTemplate.json'

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)
const state = reactive({jointController: JointControllerTemplate, edition: false})
const storeDisplay = useStoreDisplay()

function createJointController() {
  state.jointController = JointControllerTemplate
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
