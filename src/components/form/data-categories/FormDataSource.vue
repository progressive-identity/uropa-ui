<template>
  <div v-if="formsDisplayed.dataSource">
    <div>
      <h3>Data source</h3>
      <p class="form-description">Abstraction of the medium on which personal data is stored. It could be a
        hard drive on site, a SaaS, or even an archive room.</p>
    </div>
    <USelect v-model="dataSource.country" :list="countries" label="Country" size="s"/>
    <div class="flex flex-wrap">
      <UInput v-model="dataSource.name" label="Name"
              placeholder="The name of the data source (ex: name of database, server etc.)" class="flex-1"/>
      <UInput v-model="dataSource.storageType" label="Storage type"
              placeholder="Provides useful information on the storage type" class="flex-1"/>
      <div class="grow"></div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia/dist/pinia.prod.cjs'
import {useStoreDisplay} from '@/store/display.js'
import UInput from '@/components/basic/UInput.vue'
import USelect from '@/components/basic/select/USelect.vue'
import countries from './../../../data/countries.json'

const storeDisplay = useStoreDisplay()
const {formsDisplayed} = storeToRefs(storeDisplay)

const props = defineProps({
  dataSource: {
    type: Object,
    required: true
  }
})

</script>
