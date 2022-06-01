<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ description }}</p>
      </div>
      <div class="isolate rounded-md shadow-sm">
        <div class="columns-2 gap-0 py-3">
          <UInput v-model="modelValue.name" label="Name" :rounded-top-left="true" :rounded-bottom-left="true"/>
          <UInput v-model="modelValue.email" label="Email" :rounded-top-right="true" :rounded-bottom-right="true"/>
        </div>
        <FormPostalAddress :postal-address="modelValue.postalAddress"/>
        <div class="py-3 space-x-2">
          <UButton type="secondary" v-on:click="toggleDisplay(false, !formsDisplayed.dpo)" label="DPO"
                   :icon="formsDisplayed.dpo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                   class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          </UButton>
          <UButton type="secondary" v-on:click="toggleDisplay(!formsDisplayed.ceo, false)" label="CEO"
                   :icon="formsDisplayed.ceo ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                   class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          </UButton>
        </div>
        <div>
          <FormDpo :dpo="modelValue.dpo"/>
          <FormCeo :ceo="modelValue.ceo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreDisplay} from '@/store/display.js'
import FormDpo from '@/components/form/legal-person/FormDpo.vue'
import FormCeo from '@/components/form/legal-person/FormCeo.vue'
import FormPostalAddress from '@/components/form/FormPostalAddress.vue'
import UInput from '@/components/basic/UInput.vue'
import UButton from '@/components/basic/UButton.vue'
import {mdiArrowDownDropCircle, mdiArrowUpDropCircle} from '@mdi/js'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
      modelValue: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        required: false,
        default: 'Legal person'
      },
      description: {
        type: String,
        required: false,
        default: 'A legal person is an entity that process personal data. It\'s usually a company or an organization.'
      }
    }
)

function toggleDisplay(ceo, dpo) {
  storeDisplay.$patch({
    formsDisplayed: {
      ceo,
      dpo
    }
  })
}

</script>
