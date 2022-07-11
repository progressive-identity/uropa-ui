<template>
  <div class="space-y-8">
    <div class="pt-8 space-y-6 pb-8">
      <div class="space-y-5">
        <div v-if="title.length > 0">
          <h3>{{ title }}</h3>
          <p class="form-description">{{ description }}</p>
        </div>
        <UVerticalBar label="Legal entity" :rotate="formsDisplayed.legalEntity"
                      @click="toggleDisplay(!formsDisplayed.legalEntity, formsDisplayed.dpo, formsDisplayed.ceo)"/>
        <div class="px-5" v-if="formsDisplayed.legalEntity">
          <div>
            <div class="pt-3 flex justify-start space-x-5">
              <UInput v-model="modelValue.name" label="Name" placeholder="The name of the entity" :required="true"/>
              <UInput v-model="modelValue.email" label="Email" type="email"
                      placeholder="The contact email of the entity" :required="true"/>
              <UInput v-model="modelValue.registrationNumber" label="Registration number"
                      placeholder="ex: SIREN, SIRET, etc."/>
            </div>
            <FormAddress :postal-address="modelValue.postalAddress"/>
          </div>
        </div>
        <UVerticalBar label="Ceo" :rotate="formsDisplayed.ceo" :required="false"
                      @click="toggleDisplay(formsDisplayed.legalEntity, formsDisplayed.dpo, !formsDisplayed.ceo)"/>
        <FormCeo class="px-5" :ceo="modelValue.ceo"/>
        <UVerticalBar label="Dpo" :rotate="formsDisplayed.dpo" :required="false"
                      @click="toggleDisplay(formsDisplayed.legalEntity, !formsDisplayed.dpo, formsDisplayed.ceo)"/>
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
import FormAddress from '@/components/form/data-controllers/FormAddress.vue'
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
        default: 'A legal entity is an entity (natural or legal person) that processes personal data. It can be a company, an organization, an individual etc.'
      }
    }
)

storeDisplay.$patch({
  formsDisplayed: {
    legalEntity: true
  }
})

function toggleDisplay(legalEntity, dpo, ceo) {
  storeDisplay.$patch({
    formsDisplayed: {
      legalEntity,
      dpo,
      ceo
    }
  })
}

</script>
