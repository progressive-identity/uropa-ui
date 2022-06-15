<template>
  <div class="space-y-5" v-if="formsDisplayed.storageDuration">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Storage durations</h3>
      <p class="mt-2 text-sm text-gray-700">Describes the events defining the storage duration rule (events determining
        the beginning and the end of the processing). For instance, the consent legal basis would be triggered by the
        start event "GiveConsent" and be ended by the stop event "RevokeConsent"</p>
    </div>
    <div class="flex flex-col">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
            <tr class="text-left text-sm font-semibold text-gray-900">
              <th scope="col"/>
              <th scope="col" class="py-3.5 pl-4 pr-3">Name</th>
              <th scope="col" class="px-3 py-3.5">Child</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(dataSubjectType, index) in dataLocation.dataSubjectTypes" :key="dataSubjectType.name"
                class="text-sm font-medium text-gray-900">
              <td class="pl-2">
                <div>
                  <UButton v-if="index === dataLocation?.dataSubjectTypes.length-1" :icon="mdiPlusCircle"
                           @click="createDataSubjectType"/>
                  <UButton v-else :icon="mdiMinusCircle" type="danger"
                           @click="deleteDataSubjectType(index)"/>
                </div>
              </td>
              <td>
                <UInput v-model="dataLocation.dataSubjectTypes[index].name" label=""/>
              </td>
              <td>
                <USwitch v-model="dataSubjectType.isChild" label=""/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
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
import USwitch from '@/components/basic/USwitch.vue'
import {mdiMinusCircle, mdiPlusCircle} from '@mdi/js'
import DataSubjectTypeTemplate from '@/data/template/DataSubjectTypeTemplate.json'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataLocation: {
    type: Object,
    required: true
  }
})

if (props.dataLocation?.dataSubjectTypes?.length === 0) {
  createDataSubjectType()
}

function createDataSubjectType() {
  props.dataLocation.dataSubjectTypes.push({...DataSubjectTypeTemplate})
}

function deleteDataSubjectType(index) {
  props.dataLocation.dataSubjectTypes.splice(index, 1)
}

</script>
