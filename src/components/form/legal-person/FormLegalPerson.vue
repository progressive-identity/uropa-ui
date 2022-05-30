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
          <UButton type="secondary" v-on:click="toggleDpo" label="Dpo"
                   :icon="state.dpoVisible ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                   class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          </UButton>
          <UButton type="secondary" v-on:click="toggleCeo" label="Ceo"
                   :icon="state.ceoVisible ?mdiArrowUpDropCircle : mdiArrowDownDropCircle"
                   class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          </UButton>
        </div>
        <div>
          <FormDpo v-if="state.dpoVisible"
                   :dpo="modelValue.dpo"/>
          <FormCeo v-if="state.ceoVisible"
                   :ceo="modelValue.ceo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper.js'
import {storeToRefs} from 'pinia'
import FormDpo from '@/components/form/legal-person/FormDpo.vue'
import FormCeo from '@/components/form/legal-person/FormCeo.vue'
import FormPostalAddress from '@/components/form/FormPostalAddress.vue'
import UInput from '@/components/basic/UInput.vue'
import UButton from '@/components/basic/UButton.vue'
import {mdiArrowDownDropCircle, mdiArrowUpDropCircle} from '@mdi/js'
import {reactive} from 'vue'

const state = reactive({
  ceoVisible: false,
  dpoVisible: false
})


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

const store = useStore()

const {current} = storeToRefs(store)

function toggleCeo() {
  state.ceoVisible = !state.ceoVisible
  state.dpoVisible = false
}

function toggleDpo() {
  state.dpoVisible = !state.dpoVisible
  state.ceoVisible = false
}
</script>
