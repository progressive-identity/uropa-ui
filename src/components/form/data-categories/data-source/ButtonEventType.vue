<template>
  <UButton type="secondary" v-if="eventType.name" :icon="mdiPencil" :label="eventType.name"/>
  <UButton type="secondary" v-else :icon="mdiPlusCircle"/>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import {mdiPencil, mdiPlusCircle} from '@mdi/js'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  eventType: {
    type: Object,
    required: true
  }
})

</script>
