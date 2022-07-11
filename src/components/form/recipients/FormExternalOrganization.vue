<template>
  <div v-if="formsDisplayed.externalOrganization">
    <div>
      <h3>External organization</h3>
      <p class="form-description">Information about the external organization that is a recipient of the
        data processed. Useful to manage authorisations, contracts and other legal instruments.</p>
    </div>
    <div class="pt-3">
      <UInput v-model="externalOrganization.organizationStatus" label="Organization status"
              placeholder="ex : affiliate, holding, head quarter, etc." :required="true"/>
      <UInput v-model="externalOrganization.description" label="Description" size="xl"/>
      <UMultiSelect v-model="externalOrganization.dataCategoriesDisclosed" label="Data categories disclosed *"
                    :list="storeData.getUniqueDataCategories"/>
      <FormLegalEntity v-model="externalOrganization.legalPerson"/>
    </div>
    <div class="space-x-2" v-if="!nested">
      <BackButton/>
      <SaveButton :on-save="saveExternalOrganization"/>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import FormLegalEntity from '@/components/form/data-controllers/FormLegalEntity.vue'
import UMultiSelect from '@/components/basic/select/UMultiSelect.vue'
import BackButton from '@/components/form/BackButton.vue'
import SaveButton from '@/components/form/SaveButton.vue'

const storeData = useStoreData()
const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  externalOrganization: {
    type: Object,
    required: true
  },
  edition: {
    type: Boolean,
    required: false,
    default: false
  },
  nested: {
    type: Boolean,
    required: false,
    default: false
  }
})

function saveExternalOrganization() {
  if (!props.edition) {
    storeData.$patch((state) =>
        state.processingRecord.recipients.externalOrganizations.push({...props.externalOrganization}))
  }
}
</script>
