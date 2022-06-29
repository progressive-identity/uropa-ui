<template>
  <footer class="p-4 text-gray-400">
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex justify-center space-x-12">
        <a v-for="link in legalLinks" :key="link.name" :href="link.href" class="hover:text-gray-500">
          {{ link.name }}
        </a>
      </div>
      <div class="flex justify-center space-x-6">
        <a v-for="link in externalLinks" :key="link.name" target="_blank" :href="link.href" class="hover:text-gray-500">
          <UIcon
              :path="link.icon" :size="24"/>
        </a>
      </div>
      <div>
        <!-- TODO see with Aurelien what to put here-->
        <p class="text-center text-base">&copy; 2022 CODE IS LAW.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import UIcon from '@/components/basic/UIcon.vue'
import {mdiGithub, mdiLinkedin, mdiTwitter, mdiWeb} from '@mdi/js'

const externalLinks = [
  {
    name: 'Alias.dev',
    href: process.env.VUE_APP_URL_ALIAS_DEV,
    icon: mdiWeb
  },
  {
    name: 'Linkedin',
    href: process.env.VUE_APP_URL_LINKEDIN,
    icon: mdiLinkedin
  },
  {
    name: 'Twitter',
    href: process.env.VUE_APP_URL_TWITTER,
    icon: mdiTwitter
  },
  {
    name: 'GitHub',
    href: process.env.VUE_APP_URL_GITHUB_UROPA,
    icon: mdiGithub
  }
]
const legalLinks = [
//TODO see with Aurelien what to put in there
//TODO see with Jules what's the best way to handle these pages in our SPA
  {
    name: 'Privacy policy',
    href: '#'
  },
  {
    name: 'Legal Notice',
    href: '#'
  },
  {
    name: 'Terms of Services',
    href: '#'
  }
]
</script>
