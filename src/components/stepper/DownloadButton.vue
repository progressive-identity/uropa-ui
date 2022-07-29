<template>
  <UButton :icon="mdiDownload" @click="download()"/>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import {saveToJsonFile} from '@/utils/file.js'
import {mdiDownload} from '@mdi/js'
import {getCuratedRopa} from '@/composables/useCuration.js'

const storeData = useStoreData()

function download() {
  saveToJsonFile(getCuratedRopa(storeData.ropa))
}
</script>
