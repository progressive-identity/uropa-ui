<template>
  <div v-if="current === 7" class="pt-6">
    <div class="py-3 px-5 space-x-2 flex justify-end">
      <UButton :icon="mdiContentSave" @click="saveContent"/>
      <UButton :icon="mdiContentCopy" @click="copyContent"/>
    </div>
    <div class="border rounded-md p-2 border-2">
      <pre id="json" class="text-xs text-gray-700">
    {{ processingRecord }}
    </pre>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import UButton from '@/components/basic/UButton.vue'
import {mdiContentCopy, mdiContentSave} from '@mdi/js'

const store = useStore()
const {processingRecord} = useStoreData()
const {current} = storeToRefs(store)

function copyContent() {
  const textToCopy = JSON.stringify(processingRecord)
  navigator.clipboard.writeText(textToCopy)
}

function saveContent() {
    //from https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file/48612128#48612128
    //FIXME review the code
  // maybe use : https://github.com/eligrey/FileSaver.js/
  processingRecord.name
    const data = JSON.stringify(processingRecord)
    const blob = new Blob([data], {type: 'text/plain'})
    const e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
    a.download = `${processingRecord.name}.json`
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}
</script>
