<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Security measure</h3>
        <p class="mt-2 text-sm text-gray-700">A measure adopted by the controller to ensure the
          confidentiality, integrity and availability of the processed personal data.</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="columns-2 gap-0">
          <UInput v-model="securityMeasure.name" label="Name" :rounded-top-left="true"/>
          <USelect v-model="securityMeasure.securityMeasureType" :list="securityMeasureTypes" label="Type"
                   :rounded-top-right="true"/>
        </div>
        <UInput v-model="securityMeasure.description" label="Description"
                :rounded-bottom-left="true" :rounded-bottom-right="true"/>
      </div>
      <div class="space-x-2">
        <UButton label="Back" v-on:click="closeSecurityMeasure" type="secondary"/>
        <UButton label="Save" v-on:click="saveSecurityMeasure"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStoreData} from '@/store/data.js'
import {useStoreForms} from "@/store/forms.js"
import UButton from "@/components/basic/UButton.vue"
import UInput from "@/components/basic/UInput.vue"
import USelect from "@/components/basic/USelect.vue"
import {securityMeasureTypes} from '@/data/enums.js'

const storeData = useStoreData()
const storeForms = useStoreForms()

const props = defineProps({
  securityMeasure: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  }
})

function emptySecurityMeasure() {
  props.securityMeasure.name = ''
  props.securityMeasure.description = ''
  props.securityMeasure.securityMeasureType = ''
}

function saveSecurityMeasure() {
  storeForms.$patch({
    securityMeasureVisible: false
  })
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.securityMeasures.push({...props.securityMeasure}))
    emptySecurityMeasure()
  }
}

function closeSecurityMeasure() {
  storeForms.$patch({
    securityMeasureVisible: false
  })
}

</script>
