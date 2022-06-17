<template>
  <footer class="bg-white p-4">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
        <UIcon
          :path="item.icon" :size="24"/>
        </a>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <p class="text-center text-base text-gray-400">&copy; 2022 Alias.dev</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import UIcon from '@/components/basic/UIcon.vue'
import { mdiGithub, mdiTwitter, mdiLinkedin } from '@mdi/js'

const navigation = [
  {
    name: 'Twitter',
    href: '#',
    icon: mdiTwitter
  },
  {
    name: 'GitHub',
    href: '#',
    icon: mdiGithub
  },
  {
    name: 'Linkedin',
    href: '#',
    icon: mdiLinkedin
  }
]
</script>
