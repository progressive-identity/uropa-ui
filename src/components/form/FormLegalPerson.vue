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
          <div
              class="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label for="name" class="block text-xs font-medium text-gray-900">Name</label>
            <input type="text" name="name" id="name"
                   class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                   placeholder="Jane Doe"/>
          </div>
          <div
              class="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
            <label for="job-title" class="block text-xs font-medium text-gray-900">Email</label>
            <input type="email" name="job-title" id="job-title"
                   class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                   placeholder="myemail@example.com"/>
          </div>
        </div>
        <FormPostalAddress/>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <button type="button" v-on:click="switchDpo"
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Dpo
          </button>
          <FormDpo/>
        </div>
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <button type="button" v-on:click="switchCeo"
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Ceo
          </button>
          <FormCeo/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper'
import {useStoreForms} from '@/store/forms'
import {storeToRefs} from 'pinia'
import FormDpo from "@/components/form/FormDpo"
import FormCeo from "@/components/form/FormCeo"
import FormPostalAddress from "@/components/form/FormPostalAddress"

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
