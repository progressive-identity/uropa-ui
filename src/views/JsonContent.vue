<template>
  <div v-if="current === 7" class="pt-6">
    <div class="py-3 px-5 space-x-2 flex justify-end">
      <UButton :icon="mdiContentCopy" @click="copyToClipboard(state.json)"/>
    </div>
    <div class="border rounded-md p-2 border-2">
      <pre id="json" class="text-xs text-gray-700">
    {{ state.json }}
    </pre>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import {mdiContentCopy} from '@mdi/js'
import {copyToClipboard} from '@/utils/file.js'
import {getCuratedRopa} from '@/composable/useCuration.js'

const store = useStore()
const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)
const {current} = storeToRefs(store)
const state = reactive({json: ''})

onMounted(() => {
  if (ropa) {
    state.json = getCuratedRopa(ropa.value)
  }
})

storeData.$patch({
  ropa: {
    createdAt: new Date()
  }
})


</script>
