<template>
  <div class="space-y-5" v-if="formsDisplayed.legalBasis">
    <div>
      <h3>Legal bases</h3>
      <p class="form-description">Reference to the reason in the law (e.g. the GDPR) that provides the basis for acting
        in a particular manner in regards to the personal data.</p>
    </div>
    <div class="flex flex-col">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
            <tr class="text-left text-sm font-semibold text-gray-900">
              <th scope="col"/>
              <th scope="col" class="py-3.5 pl-4 pr-3">Type</th>
              <th scope="col" class="px-3 py-3.5">Description</th>
              <th scope="col" class="px-3 py-3.5">Source</th>
              <th scope="col" class="px-3 py-3.5">Start validity</th>
              <th scope="col" class="px-3 py-3.5">Stop validity</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(legalBasis, index) in purpose.legalBases" :key="legalBasis"
                class="text-sm font-medium text-gray-900 space-x-2">
              <td class="pl-2">
                <div>
                  <UButton v-if="index === purpose?.legalBases.length-1" :icon="mdiPlusCircle"
                           @click="createLegalBasis"/>
                  <UButton v-else :icon="mdiMinusCircle" type="danger"
                           @click="deleteLegalBasis(index)"/>
                </div>
              </td>
              <td>
                <USelectEnums v-model="legalBasis.type" :list="legalBasisTypes"/>
              </td>
              <td>
                <UInput v-model="legalBasis.description"/>
              </td>
              <td>
                <UInput v-model="legalBasis.source"/>
              </td>
              <td>
                <ButtonEventType :event-type="legalBasis.startValidity"
                                 @click="editEventType(legalBasis.startValidity)"/>
              </td>
              <td>
                <ButtonEventType :event-type="legalBasis.stopValidity"
                                 @click="editEventType(legalBasis.stopValidity)"/>
              </td>
            </tr>
            </tbody>
          </table>
          <FormEventType class="px-2" :event-type="state.eventType" :edition="state.edition"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import FormEventType from '@/components/form/data-categories/data-source/FormEventType.vue'
import ButtonEventType from '@/components/form/data-categories/data-source/ButtonEventType.vue'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import {mdiMinusCircle, mdiPlusCircle} from '@mdi/js'
import {legalBasisTypes} from '/src/data/enums.js'
import EventTypeTemplate from '@/data/template/EventTypeTemplate.json'
import LegalBasisTemplate from '@/data/template/purposes/LegalBasisTemplate.json'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)
const state = reactive({eventType: EventTypeTemplate})

// TODO maybe we should do this only once on the application start ?
LegalBasisTemplate.startValidity = structuredClone(EventTypeTemplate)
LegalBasisTemplate.stopValidity = structuredClone(EventTypeTemplate)

const props = defineProps({
  purpose: {
    type: Object,
    required: true
  }
})

if (props.purpose?.legalBases?.length === 0) {
  createLegalBasis()
}

function createLegalBasis() {
  //TODO create and use eventTemplate
  props.purpose.legalBases.push({...LegalBasisTemplate})
}

function deleteLegalBasis(index) {
  props.dataLocation.legalBases.splice(index, 1)
}

function editEventType(eventType) {
  state.eventType = eventType
  storeDisplay.$patch({
    formsDisplayed: {
      eventType: true
    }
  })
}

</script>
