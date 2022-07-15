<template>
  <footer class="p-4 text-gray-400">
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex justify-center space-x-12">
        <router-link v-for="link in legalResources" :key="link.label" :to="link" class="hover:text-gray-500">
          {{ link.label }}
        </router-link>
      </div>
      <div class="flex justify-center space-x-6">
        <a v-for="link in externalLinks" :key="link.name" target="_blank" :href="link" class="hover:text-gray-500">
          <UIcon
              :path="link.icon" :size="24"/>
        </a>
      </div>
      <div>
        <p class="text-center text-base">&copy; 2022 CODE IS LAW.</p>
      </div>
    </div>
    <div>
      <p class="text-right text-xs w-full">v{{ version }}</p>
    </div>
  </footer>
</template>

<script setup>
import UIcon from '@/components/basic/UIcon.vue'
import {mdiDiscord, mdiGithub, mdiLinkedin, mdiTwitter, mdiWeb} from '@mdi/js'
import packageJson from '@/../package.json'
import {legalResources} from '@/utils/constants/legalTextConstants.js'

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
    name: 'Discord',
    href: process.env.VUE_APP_URL_DISCORD,
    icon: mdiDiscord
  },
  {
    name: 'GitHub',
    href: process.env.VUE_APP_URL_GITHUB_UROPA,
    icon: mdiGithub
  }
]

const {version} = packageJson

</script>
