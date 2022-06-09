<template>
  <div v-if="current === -1">
    <UButton type="primary" label="Start a new processing record" @click="startProcessingRecord"/>
    <UButton type="primary" label="Import an existing one"/>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import UButton from '@/components/basic/UButton.vue'

const store = useStore()
const {current} = storeToRefs(store)

function startProcessingRecord() {
  store.current++
  store.$patch({
    mainNavigationDisplayed: true
  })
}
</script>
