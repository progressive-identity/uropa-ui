<template>
  <div v-if="formsDisplayed.eventType" class="pt-3">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Event type</h3>
      <p class="mt-2 text-sm text-gray-700">Description of an event that has consequences on the processing. For
        example, it can be an event triggering the beginning of the validity of the legal basis, or the end of a data
        retention period.</p>
    </div>
    <UInput v-model="eventType.name" label="Name"/>
    <UInput v-model="eventType.description" label="Description" size="xl"/>
    <USwitch v-model="state.hasCountdown" label="Has countdown"/>
    <div v-if="state.hasCountdown">
      <USelectEnums v-model="eventType.countdown.timeUnit" label="Time unit" :list="timeUnit"/>
      <UInput v-model="eventType.countdown.duration" label="Duration" size="s" type="number"/>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia/dist/pinia.prod.cjs'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import USwitch from '@/components/basic/USwitch.vue'
import {timeUnit} from '/src/data/enums.js'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const state = reactive({hasCountdown: false})

const props = defineProps({
  eventType: {
    type: Object,
    required: true
  }
})

</script>
