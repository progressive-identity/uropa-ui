<script setup>
import { computed, ref } from 'vue'
import {
  mdiClose,
  mdiDotsVertical,
  mdiGithub,
  mdiThemeLightDark
} from '@mdi/js'
import NavBarItem from '@/components/NavBarItem.vue'
import NavBarItemLabel from '@/components/NavBarItemLabel.vue'
import Icon from '@/components/basic/Icon.vue'

const isMenuNavBarActive = ref(false)

const menuNavBarToggleIcon = computed(() => isMenuNavBarActive.value ? mdiClose : mdiDotsVertical)

const menuNavBarToggle = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value
}

</script>

<template>
  <nav
    class="top-0 left-0 right-0 fixed flex bg-white h-14 border-b z-30 w-screen
    transition-position xl:pl-10 lg:w-auto lg:items-stretch dark:bg-gray-800 dark:border-gray-800"
  >
    <div class="flex-1 items-stretch flex h-14">
      <nav-bar-item
        type="hidden lg:flex xl:hidden"
      />
      <nav-bar-item
        type="hidden lg:flex"
      >
        <a
          target="_blank"
        >
          <img
            alt="Alias"
            class="inline-block"
            height="120"
            src="/logo_codeislaw.png"
            width="120"
          >
        </a>
      </nav-bar-item>
    </div>
    <div class="flex-none items-stretch flex h-14 lg:hidden">
      <nav-bar-item @click.prevent="menuNavBarToggle">
        <icon
          :path="menuNavBarToggleIcon"
          size="24"
        />
      </nav-bar-item>
    </div>
    <div
      :class="[isMenuNavBarActive ? 'block' : 'hidden']"
      class="absolute w-screen top-14 left-0 bg-white shadow inline
        lg:w-auto lg:items-stretch lg:flex lg:grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none dark:bg-gray-800"
    >
      <div class="flex">
        <div class="my-auto text-xl">

        </div>
      </div>
      <div
        class="max-h-screen-menu overflow-y-auto lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto"
      >
        <nav-bar-item
          is-desktop-icon-only
        >
          <nav-bar-item-label
            :icon="mdiThemeLightDark"
            is-desktop-icon-only
            label="Light/Dark"
          />
        </nav-bar-item>
        <nav-bar-item
          href="https://github.com/progressive-identity/alias-data-discovery-api"
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
