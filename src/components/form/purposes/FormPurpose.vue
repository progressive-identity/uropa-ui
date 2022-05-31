<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5" v-if="state.visible">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <USwitch v-model="purpose.isMain" label="main"/>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="columns-2 gap-0 py-2">
          <UInput v-model="purpose.name" label="Name" :rounded-top-left="true" :rounded-bottom-left="true"/>
          <UInput v-model="purpose.description" label="Description" :rounded-top-right="true"
                  :rounded-bottom-right="true"/>
        </div>
        <div class="pb-2">
          <FormLegalBasis :legal-basis="purpose.legalBasis"/>
        </div>
        <div class="space-x-2">
          <UButton label="Back" v-on:click="closePurpose" type="secondary"/>
          <UButton label="Save" v-on:click="savePurpose"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import {useStoreForms} from '@/store/forms.js'
import UButton from '@/components/basic/UButton.vue'
import UInput from '@/components/basic/UInput.vue'
import {reactive} from 'vue'
import USwitch from '@/components/basic/USwitch.vue'
import FormLegalBasis from '@/components/form/purposes/FormLegalBasis.vue'
import LegalPersonTemplate from '@/data/template/LegalPersonTemplate.json'

const storeData = useStoreData()
const storeForms = useStoreForms()

const props = defineProps({
  purpose: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

const state = reactive({visible: true})

function emptyPurpose() {
  props.purpose.name = ''
  props.purpose.organizationStatus = ''
  props.purpose.legalPerson = LegalPersonTemplate
  props.purpose.dataCategoriesDisclosed = []
}

function savePurpose() {
  state.visible = false
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.purposes.push({...props.purpose}))
    emptyPurpose()
  }
}

function closePurpose() {
  state.visible = false
}

</script>
