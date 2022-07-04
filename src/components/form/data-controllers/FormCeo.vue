<template>
  <div class="space-y-6" v-if="formsDisplayed.ceo">
    <div>
      <h3>CEO</h3>
      <p class="form-description">The highest-ranking person of the legal person.</p>
    </div>
    <div>
      <UInput v-model="ceo.professionalTitle" label="Professional title"
              placeholder="ex: CEO, President, Director General, etc." :required="true"/>
      <FormPersonalInformation :personal-information="ceo.personalInformation"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import FormPersonalInformation from '@/components/form/data-controllers/FormPersonalInformation.vue'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  ceo: {
    type: Object,
    required: true
  }
})

</script>
