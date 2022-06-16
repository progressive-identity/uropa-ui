<template>
  <div class="py-5">
    <div>
      <h3>Legal basis</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">A Legal person is an entity that process personal data. It's
        usually a company or an organization.</p>
    </div>
    <div class="pt-3">
      <USelectEnums v-model="legalBasis.type" label="Type" :list="legalBasisTypes"/>
      <UInput v-model="legalBasis.description" label="Description" size="xl"/>
      <UInput v-model="legalBasis.source" label="Source" type="url"/>
    </div>
  </div>
</template>

<script setup>
import UInput from '@/components/basic/UInput.vue'
import USelectEnums from '@/components/basic/select/USelectEnums.vue'
import {legalBasisTypes} from '/src/data/enums.js'

const props = defineProps({
  legalBasis: {
    type: Object,
    required: true
  }
})

</script>
