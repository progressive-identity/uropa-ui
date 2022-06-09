<template>
  <div v-if="current === -1">
    <div class="flex w-full items-center justify-center h-screen">
      <div class="max-w-2xl mx-auto space-y-5">
        <div class="flex justify-center">
          <UButton type="primary" label="Start a new processing record" @click="startProcessingRecord"/>
        </div>
        <div class="flex justify-center">
          OR
        </div>
        <div class="flex justify-center">
          <UButton type="primary" label="Import an existing one"/>
        </div>
      </div>
    </div>
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
