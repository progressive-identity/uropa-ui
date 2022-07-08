<template>
  <div class="space-y-8">
    <div class="pt-8 space-y-6 pb-8">
      <div class="space-y-5">
        <div v-if="title.length > 0">
          <h3>{{ title }}</h3>
          <p class="form-description">{{ description }}</p>
        </div>
        <UVerticalBar label="Legal person" :rotate="formsDisplayed.legalPerson"
                      @click="toggleDisplay(!formsDisplayed.legalPerson, formsDisplayed.dpo, formsDisplayed.ceo)"/>
        <div class="px-5" v-if="formsDisplayed.legalPerson">
          <div>
            <div class="pt-3 flex justify-start space-x-5">
              <UInput v-model="modelValue.name" label="Name" placeholder="The name of the entity" :required="true"/>
              <UInput v-model="modelValue.email" label="Email" type="email"
                      placeholder="The contact email of the entity" :required="true"/>
            </div>
            <FormPostalAddress :postal-address="modelValue.postalAddress"/>
          </div>
        </div>
        <UVerticalBar label="Ceo" :rotate="formsDisplayed.ceo" :required="false"
                      @click="toggleDisplay(formsDisplayed.legalPerson, formsDisplayed.dpo, !formsDisplayed.ceo)"/>
        <FormCeo class="px-5" :ceo="modelValue.ceo"/>
        <UVerticalBar label="Dpo" :rotate="formsDisplayed.dpo" :required="false"
                      @click="toggleDisplay(formsDisplayed.legalPerson, !formsDisplayed.dpo, formsDisplayed.ceo)"/>
        <FormDpo class="px-5" :dpo="modelValue.dpo"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreDisplay} from '@/store/display.js'
import FormDpo from '@/components/form/data-controllers/FormDpo.vue'
import FormCeo from '@/components/form/data-controllers/FormCeo.vue'
import FormPostalAddress from '@/components/form/data-controllers/FormPostalAddress.vue'
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
        default: ''
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
