<template>
  <div v-if="current === 7" class="pt-6">
    <div class="py-3 px-5 space-x-2 flex justify-end">
      <UButton :icon="mdiContentCopy" @click="copyToClipboard(ropa)"/>
    </div>
    <div class="border rounded-md p-2 border-2">
      <pre id="json" class="text-xs text-gray-700">
    {{ ropa }}
    </pre>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import {mdiContentCopy} from '@mdi/js'
import {copyToClipboard} from '@/utils/file.js'

const store = useStore()
const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)
const {current} = storeToRefs(store)

storeData.$patch({
  ropa: {
    createdAt: new Date()
  }
})


</script>
