<script setup>
import UIcon from '@/components/basic/UIcon.vue'

defineProps({
  icon: {
    type: String,
    default: null
  },
  label: {
    type: String,
    required: true
  },
  isDesktopIconOnly: Boolean
}
)
</script>

<template>
  <slot />
  <UIcon
    v-if="icon"
    :path="icon"
    class="transition-colors"
  />
  <span
    class="px-2 transition-colors"
    :class="{ 'lg:hidden':isDesktopIconOnly && icon }"
  >{{ label }}</span>
</template>
