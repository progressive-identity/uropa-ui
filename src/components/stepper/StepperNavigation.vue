<template>
  <div class="pt-3" v-if="mainNavigationDisplayed">
    <div class="flex justify-end space-x-2">
      <UButton type="secondary" v-on:click="previous" v-if="current > 0" label="Previous"/>
      <UButton type="primary" v-on:click="next" v-if="current < stepsProcessingRecord.length-1" label="Next"/>
      <UButton type="primary" v-on:click="next" v-if="current === stepsProcessingRecord.length-1" label="Finish"/>
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'

const store = useStore()
const {mainNavigationDisplayed, stepsProcessingRecord, current} = storeToRefs(store)
const storeDisplay = useStoreDisplay()

function next() {
  if (isFormValid()) {
    store.current++
    storeDisplay.$reset()
  }
}

function previous() {
  store.current--
  storeDisplay.$reset()
}

function isFormValid() {
  return !document.getElementById('error')
}

</script>
