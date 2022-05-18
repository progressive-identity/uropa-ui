<template>
  <div v-if="current === 7" class="flow-root">
    <div>
      <pre id="json" class="prettyprint">
    {{ processingRecord }}
    </pre>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import {storeToRefs} from 'pinia'

const store = useStore()
const storeData = useStoreData()
const {current} = storeToRefs(store)
const processingRecord = storeToRefs(storeData)
</script>
