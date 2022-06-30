<template>
  <UButton label="Back" @click="close" type="secondary"/>
</template>

<script setup>
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'

const storeDisplay = useStoreDisplay()

function close() {
  storeDisplay.$reset()
}
</script>
