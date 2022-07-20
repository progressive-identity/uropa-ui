<template>
  <UButton :icon="mdiDownload" @click="saveToJsonFile(state.json)"/>
</template>

<script setup>
import {onMounted, reactive} from 'vue'
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import UButton from '@/components/basic/UButton.vue'
import {getCuratedRopa} from '@/composable/useCuration.js'
import {saveToJsonFile} from '@/utils/file.js'
import {mdiDownload} from '@mdi/js'

const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)

const state = reactive({json: ''})

onMounted(() => {
  state.json = getCuratedRopa(ropa.value)
})
</script>
