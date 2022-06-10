<template>
  <div v-if="current === -1">
    <div class="flex w-full items-center justify-center h-screen">
      <div class="max-w-2xl mx-auto space-y-5">
        <div class="flex justify-center">
          <UButton type="primary" :icon="mdiClipboardEditOutline"
                   label="Start a new processing record" @click="startProcessingRecord"/>
        </div>
        <div class="flex justify-center text-xl font-medium text-gray-700">
          OR
        </div>
        <div class="flex justify-center">
          <UFilePicker label="Import an existing one" accept=".json" :onUpload="startProcessingRecord"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import UFilePicker from '@/components/basic/UFilePicker.vue'
import {mdiClipboardEditOutline} from '@mdi/js'

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const {processingRecord} = storeToRefs(storeData)

function startProcessingRecord(data = null) {
  store.current++
  store.$patch({
    mainNavigationDisplayed: true
  })
  if (data) {
    storeData.$patch({
      processingRecord: JSON.parse(data)
    })
  }
}
</script>
