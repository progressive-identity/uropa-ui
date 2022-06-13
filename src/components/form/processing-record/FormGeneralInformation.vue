<template>
  <div class="space-y-8">
    <div class="pt-8 space-y-6">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">General information</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">An inventory of the data processing according to article 30
          GDPR. It must reflect the reality of the personal data processing, to keep track of the usage of personal
          data in the controller system.</p>
      </div>
      <div>
        <UInput v-model="processingRecord.name" label="Name" :required="true"/>
        <UInput v-model="processingRecord.internalId" label="Internal ID"
                placeholder="The reference of the processing record"/>
      </div>
      <USwitch v-model="formsDisplayed.dpia" label="DPIA"/>
      <FormDpia/>
    </div>
  </div>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import FormDpia from '@/components/form/processing-record/FormDpia.vue'

const {processingRecord} = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

storeDisplay.$patch({
  formsDisplayed: {
    dpia: processingRecord.dpia.description.length > 0
  }
})

</script>
