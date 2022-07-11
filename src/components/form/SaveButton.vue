<template>
  <UButton id="save-button" label="Save" @click="save"/>
</template>

<script setup>
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import {isFormValid} from '@/utils/validation.js'

const storeDisplay = useStoreDisplay()

const props = defineProps({
  onSave: {
    type: Function,
    required: false
  }
})

storeDisplay.$patch({
  isSaveClosed: false
})

async function save() {
  if (!await isFormValid()) return
  storeDisplay.$reset()
  props.onSave()
}
</script>
