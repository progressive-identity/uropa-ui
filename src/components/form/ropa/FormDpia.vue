<template>
  <div class="space-y-6 sm:space-y-5" v-if="formsDisplayed.dpia">
    <div>
      <h3>Dpia</h3>
      <p class="form-description">The description of the some data related to the data protection
        impact assessment (DPIA) established for the processing according to article 35 GDPR.</p>
    </div>
    <div>
      <USwitch v-model="dpia.hasPriorConsultation" label="Prior consultation"/>
      <UInput v-model="dpia.description" label="Description" placeholder="A brief resume of the results of the DPIA"
              size="xl" :required="true"/>
      <UInput v-model="dpia.path" label="Path" size="xl"
              placeholder="The path to the DPIA document"/>
      <UInput v-model="dpia.stopDate" label="Date" type="date" size="s" :required="true"/>
    </div>
  </div>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'

const {processingRecord: {dpia}} = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)
</script>
