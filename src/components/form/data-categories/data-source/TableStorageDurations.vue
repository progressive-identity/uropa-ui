<template>
  <div class="space-y-5" v-if="formsDisplayed.storageDuration">
    <div>
      <h3>Storage durations</h3>
      <p class="form-description">Describes the events defining the storage duration rule (events determining
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
              <th scope="col" class="py-3.5 pl-4 pr-3">Storage type</th>
              <th scope="col" class="px-3 py-3.5">Start event</th>
              <th scope="col" class="px-3 py-3.5">Stop event</th>
              <th scope="col" class="px-3 py-3.5">Interrupt event</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(storageDuration, index) in dataLocation.storageDurations" :key="storageDuration"
                class="text-sm font-medium text-gray-900 space-x-2">
              <td class="pl-2">
                <div>
                  <UButton v-if="index === dataLocation?.storageDurations.length-1" :icon="mdiPlusCircle"
                           @click="createStorageDuration"/>
                  <UButton v-else :icon="mdiMinusCircle" type="danger"
                           @click="deleteStorageDuration(index)"/>
                </div>
              </td>
              <td>
                <USelectEnums v-model="storageDuration.storageType" :list="storageTypes"/>
              </td>
              <td>
                <ButtonEventType :event-type="storageDuration.startEvent"
                                 @click="editEventType(storageDuration.startEvent)"/>
              </td>
              <td>
                <ButtonEventType :event-type="storageDuration.stopEvent"
                                 @click="editEventType(storageDuration.stopEvent)"/>
              </td>
              <td>
                <ButtonEventType :event-type="storageDuration.interruptEvent"
                                 @click="editEventType(storageDuration.interruptEvent)"/>
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
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import FormEventType from '@/components/form/data-categories/data-source/FormEventType.vue'
import ButtonEventType from '@/components/form/data-categories/data-source/ButtonEventType.vue'
import {mdiMinusCircle, mdiPlusCircle} from '@mdi/js'
import {storageTypes} from '/src/data/enums.js'
import EventTypeTemplate from '@/data/template/EventTypeTemplate.json'
import StorageDurationTemplate from '@/data/template/data-categories/StorageDurationTemplate.json'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)
const state = reactive({eventType: EventTypeTemplate})

const props = defineProps({
  dataLocation: {
    type: Object,
    required: true
  }
})

if (props.dataLocation?.storageDurations?.length === 0) {
  createStorageDuration()
}

function createStorageDuration() {
  //TODO create and use eventTemplate
  props.dataLocation.storageDurations.push({...StorageDurationTemplate})
}

function deleteStorageDuration(index) {
  props.dataLocation.storageDurations.splice(index, 1)
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
