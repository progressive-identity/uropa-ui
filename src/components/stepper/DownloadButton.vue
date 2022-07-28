<template>
  <UButton :icon="mdiDownload" @click="download()"/>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import {getCuratedRopa} from '@/composables/useCuration.js'
import {saveToJsonFile} from '@/utils/file.js'
import {mdiDownload} from '@mdi/js'

const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)

const state = reactive({json: ''})

function download() {
  saveToJsonFile(getCuratedRopa(ropa.value))
}
</script>
