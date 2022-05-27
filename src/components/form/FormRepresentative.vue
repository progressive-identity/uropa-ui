<template>
  <div v-if="current === 1 && currentLegalPerson === 1" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <UStepperBullet v-model="currentLegalPerson" :steps="stepsLegalPerson"/>
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Representative</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">A Legal person is an entity that process personal data. It's
            usually a company or an organization.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreData} from '@/store/data'
import {useStoreForms} from '@/store/forms'
import {storeToRefs} from 'pinia'
import FormDpo from "@/components/form/FormDpo"
import FormCeo from "@/components/form/FormCeo"
import FormPostalAddress from "@/components/form/FormPostalAddress"
import UInput from "@/components/basic/UInput.vue"
import UStepperBullet from "@/components/basic/UStepperBullet.vue"


const {processingRecord: {legalPerson}} = useStoreData()
const store = useStore()
const storeForms = useStoreForms()
const {ceoVisible, dpoVisible} = storeToRefs(storeForms)

const {current, stepsLegalPerson, currentLegalPerson} = storeToRefs(store)

const switchDpo = async () => {
  storeForms.$patch({
    dpoVisible: !storeForms.dpoVisible
  })
}
const switchCeo = async () => {
  storeForms.$patch({
    ceoVisible: !storeForms.ceoVisible
  })
}
</script>
