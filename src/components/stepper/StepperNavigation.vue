<template>
  <div class="pt-5">
    <div class="flex justify-end space-x-2">
      <UButton type="secondary" v-on:click="previous" v-if="current > 0" label="Previous"/>
      <UButton type="primary" v-on:click="next" v-if="current < steps.length-1" label="Next"/>
      <UButton type="primary" v-on:click="previous" v-if="current === steps.length-1" label="Finish"/>
    </div>
  </div>
</template>
<script setup>
import {useStore} from '@/store/stepper'
import {storeToRefs} from "pinia/dist/pinia.esm-browser"
import UButton from "@/components/basic/UButton.vue"

const store = useStore()
const {steps, current} = storeToRefs(store)

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
