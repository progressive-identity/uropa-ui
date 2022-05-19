<template>
  <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Legal basis</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">A Legal person is an entity that process personal data. It's
        usually a company or an organization.</p>
    </div>
    <div class="isolate -space-y-px rounded-md shadow-sm">
      <div class="columns-2 gap-0">
        <UInput v-model="legalBasis.type" label="Type" :rounded-top-left="true"/>
        <UInput v-model="legalBasis.description" label="Description" :rounded-top-right="true"/>
      </div>
      <UInput v-model="legalBasis.proofUrl" label="Proof URL" :rounded-bottom-left="true"
              :rounded-bottom-right="true"/>
    </div>
  </div>
</template>

<script setup>
import UInput from "@/components/UInput.vue"

const props = defineProps({
  legalBasis: {
    type: Object,
    required: true
  }
})

</script>
