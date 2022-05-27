<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ description }}</p>
      </div>
      <div class="isolate -space-y-px rounded-md shadow-sm">
        <div class="columns-2 gap-0 py-2">
          <UInput v-model="modelValue.name" label="Name" :rounded-top-left="true" :rounded-bottom-left="true"/>
          <UInput v-model="modelValue.email" label="Email" :rounded-top-right="true" :rounded-bottom-right="true"/>
        </div>
        <FormPostalAddress :postal-address="modelValue.postalAddress"/>
        <div class="pt-5">
          <button type="button" v-on:click="switchDpo"
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Dpo
          </button>
        </div>
        <div class="pt-5">
          <FormDpo v-if="dpoVisible" :dpo="modelValue.dpo"/>
        </div>
        <div class="pt-5">
          <button type="button" v-on:click="switchCeo"
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Ceo
          </button>
        </div>
        <div class="pt-5">
          <FormCeo v-if="ceoVisible" :ceo="modelValue.ceo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper.js'
import {useStoreForms} from '@/store/forms.js'
import {storeToRefs} from 'pinia'
import FormDpo from "@/components/form/LegalPerson/FormDpo.vue"
import FormCeo from "@/components/form/LegalPerson/FormCeo.vue"
import FormPostalAddress from "@/components/form/FormPostalAddress.vue"
import UInput from "@/components/basic/UInput.vue"


const props = defineProps({
      modelValue: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        required: false,
        default: "Legal person"
      },
      description: {
        type: String,
        required: false,
        default: 'A Legal person is an entity that process personal data. It\'s usually a company or an organization.'
      }
    }
)

const store = useStore()
const storeForms = useStoreForms()
const {ceoVisible, dpoVisible} = storeToRefs(storeForms)

const {current, stepsLegalPerson, currentLegalPerson} = storeToRefs(store)

storeForms.$patch({
  dpoVisible: !storeForms.dpoVisible
})

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
