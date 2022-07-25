<template>
  <div class="pt-3" v-if="mainNavigationDisplayed">
    <div class="flex justify-end space-x-2">
      <UButton type="secondary" @click="previous" v-if="current > 0" label="Previous"/>
      <UButton type="primary" @click="next" v-if="current < stepsProcessingRecord.length-1" label="Next"/>
      <UButton type="primary" @click="finish" v-if="current === stepsProcessingRecord.length-1"
               label="Finish"/>
      <DownloadButton/>
    </div>
    <p v-if="!storeDisplay.isSaveClosed" class="form-error flex justify-center">You must click on the save
      button at the bottom</p>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useStore} from '@/store/stepper.js'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UButton from '@/components/basic/UButton.vue'
import {isFormValid, isProgressAllowed} from '@/utils/validation.js'
import DownloadButton from '@/components/stepper/DownloadButton.vue'
import {getCuratedRopa} from '@/composable/useCuration.js'

const store = useStore()
const storeData = useStoreData()
const {mainNavigationDisplayed, stepsProcessingRecord, current} = storeToRefs(store)
const storeDisplay = useStoreDisplay()


async function next() {
  if (await isFormValid() && await isProgressAllowed()) {
    store.current++
    storeDisplay.$reset()
    storeData.$patch({
      ropa: {
        updatedAt: new Date()
      }
    })
  }
}

async function finish() {
  await next()
  if (!storeData.ropa.createdAt) {
    storeData.$patch({
      ropa: {
        createdAt: new Date()
      }
    })
  }
  storeData.$patch({
    curatedRopa: getCuratedRopa(storeData.ropa)
  })
}

function previous() {
  store.current--
  storeDisplay.$reset()
}


</script>
