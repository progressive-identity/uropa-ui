<template>
  <div class="pt-3" v-if="stepsProcessingRecord[current].mainNavigationVisible">
    <div class="flex justify-end space-x-2">
      <UButton type="secondary" v-on:click="previous" v-if="current > 0" label="Previous"/>
      <UButton type="primary" v-on:click="next" v-if="current < stepsProcessingRecord.length-1" label="Next"/>
      <UButton type="primary" v-on:click="next" v-if="current === stepsProcessingRecord.length-1" label="Finish"/>
    </div>
  </div>
</template>
<script setup>
import {useStore} from '@/store/stepper.js'
import {useStoreForms} from "@/store/forms.js"
import {storeToRefs} from "pinia"
import UButton from "@/components/basic/UButton.vue"

const store = useStore()
const {stepsProcessingRecord, current} = storeToRefs(store)
const storeForms = useStoreForms()

function next() {
  store.$patch({
    current: store.current + 1
  })
}

function previous() {
  store.$patch({
    current: store.current - 1
  })
}

</script>
