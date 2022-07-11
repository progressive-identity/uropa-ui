<template>
  <div v-if="formsDisplayed.eventType" class="pt-3">
    <div>
      <h3>Event type</h3>
      <p class="form-description">Description of an event that has consequences on the processing. For
        example, it can be an event triggering the beginning of the validity of the legal basis, or the end of a data
        retention period.</p>
    </div>
    <UInput v-model="eventType.name" label="Name" placeholder="ex: user logs in" :required="true"/>
    <UInput v-model="eventType.description" label="Description" size="xl" placeholder="ex : user revoked its consent"/>
    <USwitch v-model="state.displayCountdown" label="Triggered by a countdown" @click="resetCountdown()"/>
    <div v-if="state.displayCountdown">
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

const props = defineProps({
  eventType: {
    type: Object,
    required: true
  }
})

const state = reactive({displayCountdown: true})

function resetCountdown() {
  if (state.displayCountdown) {
    props.eventType.countdown.duration = 1
    props.eventType.countdown.timeUnit= 'months'
  } else {
    props.eventType.countdown.duration = 0
    props.eventType.countdown.timeUnit= ''
  }
}
</script>
