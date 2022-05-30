<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Purpose</h3>
        <p class="mt-2 text-sm text-gray-700">The purpose of the processing describes what the reason why
          the controller processes the personal data.</p>
      </div>
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
        <button type="button" v-on:click="savePurpose"
                class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-white font-medium rounded-md text-gray-700 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import {useStoreForms} from '@/store/forms.js'
import UInput from '@/components/basic/UInput.vue'
import USwitch from '@/components/basic/USwitch.vue'
import FormLegalBasis from '@/components/form/purposes/FormLegalBasis.vue'

const storeData = useStoreData()
const storeForms = useStoreForms()

const props = defineProps({
  purpose: {
    type: Object,
    required: true
  }
})

function emptyPurpose() {
  props.purpose.name = ''
  props.purpose.description = ''
  props.purpose.legalBasis = {type: '', description: '', proofUrl: ''}
}

const savePurpose = async () => {
  storeData.$patch((state) =>
      state.processingRecord.purposes.push({...props.purpose})
  )
  emptyPurpose()
  storeForms.$patch({
    purposeVisible: false
  })
}

</script>
