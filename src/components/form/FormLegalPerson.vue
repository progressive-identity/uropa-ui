<template>
  <div v-if="current === 1" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Legal person</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">A Legal person is an entity that process personal data. It's
            usually a company or an organization.</p>
        </div>
        <div class="isolate -space-y-px rounded-md shadow-sm">
          <UInput v-model="legalPerson.name" label="Name" :beginning="true"/>
          <UInput v-model="legalPerson.email" label="Email" :end="true"/>
          <FormPostalAddress :postal-address="legalPerson.postalAddress"/>
          <div class="pt-5">
            <button type="button" v-on:click="switchDpo"
                    class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Dpo
            </button>
          </div>
          <div class="pt-5">
            <FormDpo :dpo="legalPerson.dpo"/>
          </div>
          <div class="pt-5">
            <button type="button" v-on:click="switchCeo"
                    class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Ceo
            </button>
          </div>
          <div class="pt-5">
            <FormCeo :ceo="legalPerson.ceo"/>
          </div>
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
import UInput from "@/components/UInput.vue"

const {processingRecord: {legalPerson}} = useStoreData()
const store = useStore()
const storeForms = useStoreForms()
const {current} = storeToRefs(store)
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
