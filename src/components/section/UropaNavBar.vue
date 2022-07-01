<template>
  <nav
      class="top-0 left-0 right-0 fixed flex bg-white border-b z-30 w-screen
    transition-position xl:pl-10 lg:w-auto lg:items-stretch"
  >
    <div class="flex-1 items-stretch flex h-14">
      <nav-bar-item
          type="hidden lg:flex xl:hidden"
      />
      <nav-bar-item
          type="hidden lg:flex"
      >
        <img @click="toHome"
             alt="Alias"
             class="inline-block"
             height="120"
             src="/logo_codeislaw.png"
             width="120"
        >
      </nav-bar-item>
    </div>
    <div class="flex items-center justify-center w-full text-2xl text-primary-700 font-extrabold">
      UROPA, easily document your processing activities
    </div>
    <div class="flex-none items-stretch flex h-14 lg:hidden">
      <nav-bar-item @click.prevent="menuNavBarToggle">
        <UIcon
            :path="menuNavBarToggleIcon"
            size="24"
        />
      </nav-bar-item>
    </div>
    <div
        :class="[isMenuNavBarActive ? 'block' : 'hidden']"
        class="absolute w-screen top-14 left-0 bg-white shadow inline
        lg:w-auto lg:items-stretch lg:flex lg:grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none"
    >
      <div class="flex">
        <div class="my-auto text-xl">

        </div>
      </div>
      <div
          class="max-h-screen-menu overflow-y-auto lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto"
      >
        <nav-bar-item>
          <NavBarDropdown :mdi-icon="mdiTranslate" :list="languages"/>
        </nav-bar-item>
        <nav-bar-item
            :href="gitHubUrl"
            is-desktop-icon-only
            target="_blank"
        >
          <nav-bar-item-label
              :icon="mdiGithub"
              is-desktop-icon-only
              label="GitHub"
          />
        </nav-bar-item>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useStore} from '@/store/stepper.js'
import {storeToRefs} from 'pinia/dist/pinia.esm-browser.js'
import {mdiClose, mdiDotsVertical, mdiGithub, mdiTranslate} from '@mdi/js'
import NavBarItem from '@/components/section/NavBarItem.vue'
import NavBarItemLabel from '@/components/section/NavBarItemLabel.vue'
import UIcon from '@/components/basic/UIcon.vue'
import NavBarDropdown from '@/components/section/NavBarDropdown.vue'

const isMenuNavBarActive = ref(false)

const menuNavBarToggleIcon = computed(() => isMenuNavBarActive.value ? mdiClose : mdiDotsVertical)

const menuNavBarToggle = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value
}

const store = useStore()
const {current} = storeToRefs(store)
const gitHubUrl = process.env.VUE_APP_URL_GITHUB_UROPAUI

const languages = ['Français', 'English (soon)', 'Español (soon)', 'Deutsch (soon)']

function toHome() {
  store.$patch({
    mainNavigationDisplayed: false,
    current: -1
  })
}

</script>
