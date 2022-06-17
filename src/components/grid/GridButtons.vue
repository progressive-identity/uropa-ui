<template>
  <div class="flex space-x-1 right-0 top-2 absolute">
    <UButton @click="this.$emit('edit')" :icon="mdiPencil"/>
    <UButton @click="this.$emit('delete')" :icon="mdiDelete" type="danger"/>
  </div>
</template>

<script setup>
import UButton from '@/components/basic/UButton.vue'
import {mdiDelete, mdiPencil} from '@mdi/js'</script>
