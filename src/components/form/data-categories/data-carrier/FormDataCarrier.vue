<template>
  <div v-if="formsDisplayed.dataCarrier">
    <div>
      <h3>Data carrier</h3>
      <p class="form-description">Abstraction of the data carrier on which the personal data is stored. It could be a
        hard drive on site, a SaaS, or even an archive room.</p>
    </div>
    <div class="py-2">
      <USelect v-model="dataCarrier.country" :list="countries" label="Country" :required="true" size="s"/>
      <div class="flex justify-start space-x-5">
        <UInput v-model="dataCarrier.name" label="Name"
                placeholder="ex : name of the database, server, etc." size="xl" :required="true"/>
        <UInput v-model="dataCarrier.storageType" label="Storage type"
                placeholder="ex: paper binder, postgresql database, etc." size="xl"/>
      </div>
      <div class="flex justify-start space-x-5">
        <USelectEnums v-model="dataCarrier.dataSupport" label="Data support" :list="dataSupports" class="w-48"/>
        <USelectEnums v-model="dataCarrier.storageState" label="Storage state" :list="storageStates" class="w-64"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia/dist/pinia.prod.cjs'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USelect from '@/components/basic/select/USelect.vue'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import countries from '@/data/countries.json'
import {dataSupports, storageStates} from '@/data/enums.js'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataCarrier: {
    type: Object,
    required: true
  }
})

</script>
