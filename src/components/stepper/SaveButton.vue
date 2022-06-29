<template>
      <UButton :icon="mdiDownload" @click="saveToJsonFile(processingRecord)"/>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import {saveToJsonFile} from '@/utils/file.js'
import {mdiDownload} from '@mdi/js'

const {processingRecord} = useStoreData()

</script>
