<template>
  <div v-if="formsDisplayed.jointController">
    <FormLegalEntity v-model="jointController.legalEntity" title="Joint data controller"
                     description="A joint data controller is an entity that jointly determines the purposes and the means of the processing of the personal data."/>
    <UInput :model-value="jointController.legalAgreementPath" label="Legal agreement path"
            placeholder="The path to the binding agreement "
    />
    <div class="space-x-2 pt-3">
      <BackButton/>
      <SaveButton :on-save="saveJointController"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import FormLegalEntity from '@/components/form/data-controllers/FormLegalEntity.vue'
import BackButton from '@/components/form/BackButton.vue'
import SaveButton from '@/components/form/SaveButton.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)


const props = defineProps({
  jointController: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function saveJointController() {
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.jointDataControllers.push({...props.jointController}))
  }
}
</script>
