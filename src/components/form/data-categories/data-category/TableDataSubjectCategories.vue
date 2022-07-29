<template>
  <div class="space-y-5" v-if="formsDisplayed.dataSubjectCategory">
    <div>
      <h3>Data subject categories</h3>
      <p class="form-description">The category of individuals whose personal data is processed (ex : employees,
        prospects, clients)</p>
    </div>
    <div class="flex flex-col">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
            <tr class="text-left text-sm font-semibold text-gray-900">
              <th scope="col"/>
              <th scope="col" class="py-3.5 pl-4 pr-3">Name *</th>
              <th scope="col" class="px-3 py-3.5">Is a child ?</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(dataSubjectCategory, index) in dataCategory.dataSubjectCategories"
                :key="dataSubjectCategory.name"
                class="text-sm font-medium text-gray-900">
              <td class="pl-2">
                <div>
                  <UButton v-if="index === dataCategory?.dataSubjectCategories.length-1" :icon="mdiPlusCircle"
                           @click="createDataSubjectCategory"/>
                  <UButton v-else :icon="mdiMinusCircle" type="danger"
                           @click="deleteDataSubjectCategory(index)"/>
                </div>
              </td>
              <td>
                <UInput v-model="dataSubjectCategory.name" placeholder="ex: employees, prospects etc."
                        :required="true"/>
              </td>
              <td>
                <USwitch v-model="dataSubjectCategory.isChild"/>
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
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import {mdiMinusCircle, mdiPlusCircle} from '@mdi/js'
import DataSubjectCategoryTemplate from '@/data/template/data-categories/DataSubjectCategoryTemplate.json'
import {onMounted} from 'vue'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataCategory: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  if (props.dataCategory.dataSubjectCategories.length === 0) {
    createDataSubjectCategory()
  }
})


function createDataSubjectCategory() {
  props.dataCategory.dataSubjectCategories.push({...DataSubjectCategoryTemplate})
}

function deleteDataSubjectCategory(index) {
  props.dataCategory.dataSubjectCategories.splice(index, 1)
}

</script>
