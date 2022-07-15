<template>
  <UButton :icon="mdiDownload" @click="saveToJsonFile(ropa)"/>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import {saveToJsonFile} from '@/utils/file.js'
import {mdiDownload} from '@mdi/js'

const {ropa} = useStoreData()

</script>
