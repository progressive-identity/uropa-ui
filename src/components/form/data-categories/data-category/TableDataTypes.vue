<template>
  <div class="space-y-6" v-if="formsDisplayed.dataType">
    <div>
      <h3>Data types</h3>
      <p class="form-description">A data type is the most precise categorization of a data (ex: email).</p>
    </div>
    <div class="flex flex-col">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
            <tr class="text-left text-sm font-semibold text-gray-900">
              <th scope="col"/>
              <th scope="col" class="py-3.5 pl-4 pr-3">Name *</th>
              <th scope="col" class="px-3 py-3.5">Is it optional ?</th>
              <th scope="col" class="px-3 py-3.5">Collection mean</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(dataType, index) in dataCategory.dataTypes" :key="dataType.name"
                class="text-sm font-medium text-gray-900">
              <td class="pl-2">
                <div>
                  <UButton v-if="index === dataCategory.dataTypes.length-1" :icon="mdiPlusCircle"
                           @click="createDataType"/>
                  <UButton v-else :icon="mdiMinusCircle" type="danger"
                           @click="deleteDataType(index)"/>
                </div>
              </td>
              <td>
                <UInput v-model="dataType.name" placeholder="ex: first name, email, IP address, etc." :required="true"/>
              </td>
              <td>
                <USwitch v-model="dataType.isOptional"/>
              </td>
              <td>
                <USelectEnums v-model="dataType.collectionMean" :list="collectionMeans" :required="true"/>
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
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import {mdiMinusCircle, mdiPlusCircle} from '@mdi/js'
import {collectionMeans} from '/src/data/enums.js'
import DataTypeTemplate from '@/data/template/data-categories/DataTypeTemplate.json'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataCategory: {
    type: Object,
    required: true
  }
})

if (props.dataCategory.dataTypes.length === 0) {
  createDataType()
}

function createDataType() {
  props.dataCategory.dataTypes.push({...DataTypeTemplate})
}

function deleteDataType(index) {
  props.dataCategory.dataTypes.splice(index, 1)
}

</script>
