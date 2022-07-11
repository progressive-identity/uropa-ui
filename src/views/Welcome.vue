<template>
  <div v-if="current === -1">
    <div class="flex h-full items-center justify-center px-20">
      <div class="max-w-2xl mx-auto space-y-5">
        <div class="flex justify-center">
          <UButton :icon="mdiClipboardEditOutline"
                   label="Start a new processing record" @click="resetProcessingRecord()"/>
        </div>
        <div v-if="state.isCookie" class="space-y-5">
          <div class="flex justify-center text-xl font-medium text-gray-700">
            OR
          </div>
          <div class="flex justify-center">
            <UButton :icon="mdiClipboardEditOutline"
                     label="Continue your processing record" @click="startProcessingRecord()"/>
          </div>
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
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import UFilePicker from '@/components/basic/UFilePicker.vue'
import {mdiClipboardEditOutline} from '@mdi/js'
import RopaTemplate from '@/data/template/RopaTemplate.json'

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)
const state = reactive({isCookie: $cookies.isKey('uropa_processing_record')})

if (state.isCookie) {
// When loading the application we put the cookie content, if present, in the store
  storeData.$patch({
    ropa: $cookies.get('uropa_processing_record')
  })
}

async function resetProcessingRecord() {
  $cookies.remove('uropa_processing_record')
  await startProcessingRecord()
}

async function startProcessingRecord(data = null) {
  store.current++
  store.$patch({
    mainNavigationDisplayed: true
  })
  if (data) {
    storeData.$patch({
      ropa: JSON.parse(data)
    })
  } else if (!$cookies.isKey('uropa_processing_record')) {
    storeData.$patch({
      ropa: RopaTemplate
    })
  }
  // TODO externalize some variables in a file as constants
  $cookies.set('uropa_processing_record', storeData.ropa, '30d')
}
</script>
