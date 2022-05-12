<script setup>
import {mdiDotsCircle} from '@mdi/js'
import ProcessingRecordStepper from '@/components/ProcessingRecordStepper.vue'
import Icon from '@/components/Icon.vue'
</script>

<template>
  <section class="px-0 md:px-6 py-6">
    <div
        class="text-center"
    >
      <button
          class="inline-flex items-center"
          disabled
          type="button"
      >
        <icon
            :path="mdiDotsCircle"
            class="animate-spin"
        />
        Processing...
      </button>
    </div>
  </section>
  <section class="px-0 md:px-6 py-6">
    <ProcessingRecordStepper/>
  </section>
</template>
