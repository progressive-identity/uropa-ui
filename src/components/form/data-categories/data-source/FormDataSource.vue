<template>
  <div v-if="formsDisplayed.dataSource">
    <div>
      <h3>Data source</h3>
      <p class="form-description">Abstraction of the medium on which personal data is stored. It could be a
        hard drive on site, a SaaS, or even an archive room.</p>
    </div>
    <div class="py-2">
      <USelect v-model="dataSource.country" :list="countries" label="Country" size="s"/>
      <div class="flex justify-start space-x-5">
        <UInput v-model="dataSource.storageType" label="Storage type"
                placeholder="ex: paper binder, postgresql database, etc." size="xl"/>
        <UInput v-model="dataSource.name" label="Name"
                placeholder="ex : name of the database, server, etc." size="xl"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia/dist/pinia.prod.cjs'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USelect from '@/components/basic/select/USelect.vue'
import countries from '../../../../data/countries.json'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataSource: {
    type: Object,
    required: true
  }
})

</script>
