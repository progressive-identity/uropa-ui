<template>
  <div v-if="current === -1">
    <div class="flex h-full items-center justify-center px-20">
      <div class="max-w-2xl mx-auto space-y-5">
        <div class="flex justify-center">
          <UButton :icon="mdiClipboardEditOutline"
                   label="Start a new record of processing activities" @click="resetProcessingRecord()"/>
        </div>
        <div v-if="state.isCookie" class="space-y-5">
          <div class="flex justify-center text-xl font-medium text-gray-700">
            OR
          </div>
          <div class="flex justify-center">
            <UButton :icon="mdiClipboardEditOutline"
                     label="Continue your record of processing activities" @click="startProcessingRecord()"/>
          </div>
        </div>
        <div class="flex justify-center text-xl font-medium text-gray-700">
          OR
        </div>
        <div class="flex justify-center">
          <UFilePicker label="Import an existing Uropa file" accept=".json" :onUpload="startProcessingRecord"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import UFilePicker from '@/components/basic/UFilePicker.vue'
import {mdiClipboardEditOutline} from '@mdi/js'
import RopaTemplate from '@/data/template/RopaTemplate.json'
import {getUpdatedRopaFile} from '@/utils/migration.js'
import {refreshCookies} from '@/composables/useValidation.js'
import {getCuratedRopa} from '@/composables/useCuration.js'

const store = useStore()
const {current} = storeToRefs(store)
const storeData = useStoreData()
const state = reactive({isCookie: $cookies.isKey('uropa_ropa')})

onMounted(() => {
      if (state.isCookie) {
        // When loading the application we put the cookie content, if present, in the store
        storeData.$patch({
          ropa: $cookies.get('uropa_ropa')
        })
      }
    }
)

async function resetProcessingRecord() {
  $cookies.remove('uropa_ropa')
  await startProcessingRecord()
}

function startProcessingRecord(data = null) {
  store.current++
  store.$patch({
    mainNavigationDisplayed: true
  })
  // The data is filled when we import a file
  if (data) {
    const ropa = getUpdatedRopaFile(JSON.parse(data))
    storeData.$patch({
      ropa,
      curatedRopa: getCuratedRopa(ropa)
    })
  } else if (!$cookies.isKey('uropa_ropa')) {
    storeData.$patch({
      ropa: RopaTemplate
    })
  }
  refreshCookies()
}
</script>
