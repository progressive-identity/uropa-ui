<template>
  <div class="space-y-6" v-if="formsDisplayed.ceo">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">CEO</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">The highest-ranking person of the legal person.</p>
    </div>
    <div class="space-y-3">
        <UInput v-model="ceo.professionalTitle" label="Professional title"
                :rounded-top-left="true" :rounded-top-right="true" :rounded-bottom-right="true" :rounded-bottom-left="true"/>
      <FormPersonalInformation :personal-information="ceo.personalInformation"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import FormPersonalInformation from '@/components/form/FormPersonalInformation.vue'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  ceo: {
    type: Object,
    required: true
  }
})

</script>
