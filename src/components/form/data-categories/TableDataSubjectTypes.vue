<template>
  <div class="space-y-5" v-if="formsDisplayed.dataSubjectType">
    <div>
      <h3>Data subject types</h3>
      <p class="mt-2 text-sm text-gray-700">TODO on UROPA</p>
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
            <tr v-for="(dataSubjectType, index) in dataCategory.dataSubjectTypes" :key="dataSubjectType.name"
                class="text-sm font-medium text-gray-900">
              <td class="pl-2">
                <div>
                  <UButton v-if="index === dataCategory?.dataSubjectTypes.length-1" :icon="mdiPlusCircle"
                           @click="createDataSubjectType"/>
                  <UButton v-else :icon="mdiMinusCircle" type="danger"
                           @click="deleteDataSubjectType(index)"/>
                </div>
              </td>
              <td>
                <UInput v-model="dataCategory.dataSubjectTypes[index].name" />
              </td>
              <td>
                <USwitch v-model="dataSubjectType.isChild" />
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
import DataSubjectTypeTemplate from '@/data/template/data-categories/DataSubjectTypeTemplate.json'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataCategory: {
    type: Object,
    required: true
  }
})

if (props.dataCategory?.dataSubjectTypes?.length === 0) {
  createDataSubjectType()
}

function createDataSubjectType() {
  props.dataCategory.dataSubjectTypes.push({...DataSubjectTypeTemplate})
}

function deleteDataSubjectType(index) {
  props.dataCategory.dataSubjectTypes.splice(index, 1)
}

</script>
