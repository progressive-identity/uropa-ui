<template>
  <div class="flex space-x-1 right-0 top-2 absolute">
    <UButton @click="emits('edit')" :icon="mdiPencil"/>
    <UButton @click="emits('delete')" :icon="mdiDelete" type="danger"/>
  </div>
</template>

<script setup>
import UButton from '@/components/basic/UButton.vue'
import {mdiDelete, mdiPencil} from '@mdi/js'

const emits = defineEmits(['edit', 'delete'])

</script>
