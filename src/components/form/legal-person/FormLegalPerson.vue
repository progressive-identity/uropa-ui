<template>
  <div class="space-y-8">
    <div class="pt-8 space-y-6 pb-8">
      <div class="space-y-5">
        <UVerticalBar label="Legal person" :rotate="formsDisplayed.legalPerson"
                      @click="toggleDisplay(!formsDisplayed.legalPerson, formsDisplayed.dpo, formsDisplayed.ceo)"/>
        <div class="px-5" v-if="formsDisplayed.legalPerson">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ description }}</p>
          </div>
          <div>
            <div class="pt-3 flex flex-wrap">
              <UInput v-model="modelValue.name" label="Name" class="flex-1"/>
              <UInput v-model="modelValue.email" label="Email" type="email" class="flex-1"/>
              <div class="grow"></div>
            </div>
            <FormPostalAddress :postal-address="modelValue.postalAddress"/>
          </div>
        </div>
        <UVerticalBar label="Ceo" :rotate="formsDisplayed.ceo"
                      @click="toggleDisplay(formsDisplayed.legalPerson, formsDisplayed.dpo, !formsDisplayed.ceo)"/>
        <FormCeo class="px-5" :ceo="modelValue.ceo"/>
        <UVerticalBar label="Dpo" :rotate="formsDisplayed.dpo"
                      @click="toggleDisplay(formsDisplayed.legalPerson, !formsDisplayed.dpo, formsDisplayed.ceo)"/>
        <FormDpo class="px-5" :dpo="modelValue.dpo"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreDisplay} from '@/store/display.js'
import FormDpo from '@/components/form/legal-person/FormDpo.vue'
import FormCeo from '@/components/form/legal-person/FormCeo.vue'
import FormPostalAddress from '@/components/form/legal-person/FormPostalAddress.vue'
import UInput from '@/components/basic/UInput.vue'
import UVerticalBar from '@/components/basic/UVerticalBar.vue'

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

storeDisplay.$patch({
  formsDisplayed: {
    legalPerson: true
  }
})

function toggleDisplay(legalPerson, dpo, ceo) {
  storeDisplay.$patch({
    formsDisplayed: {
      legalPerson,
      dpo,
      ceo
    }
  })
}

</script>
