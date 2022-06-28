<template>
  <div class="pt-3" v-if="mainNavigationDisplayed">
    <div class="flex justify-end space-x-2">
      <UButton type="secondary" v-on:click="previous" v-if="current > 0" label="Previous"/>
      <UButton type="primary" v-on:click="next" v-if="current < stepsProcessingRecord.length-1" label="Next"/>
      <UButton type="primary" v-on:click="next" v-if="current === stepsProcessingRecord.length-1" label="Finish"/>
      <SaveButton/>
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import {isFormValid} from '@/utils/validation.js'
import SaveButton from '@/components/stepper/SaveButton.vue'

const store = useStore()
const storeData = useStoreData()
const {mainNavigationDisplayed, stepsProcessingRecord, current} = storeToRefs(store)
const storeDisplay = useStoreDisplay()


async function next() {
  if (await isFormValid()) {
    store.current++
    storeDisplay.$reset()
    storeData.$patch({
      processingRecord: {
        updatedAt: new Date()
      }
    })
  }
}

function previous() {
  store.current--
  storeDisplay.$reset()
}


</script>
