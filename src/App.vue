<template>
  <div class="flex flex-col h-screen justify-between">
    <UropaNavBar class="h-14"/>
    <Suspense>
      <router-view class="mb-auto px-20 py-20"/>
      <template #fallback>
        <div class="py-20 px-20">Loading...</div>
      </template>
    </Suspense>
    <UropaFooter/>
  </div>
</template>

<script setup>
import UropaNavBar from '@/components/section/UropaNavBar.vue'
import UropaFooter from '@/components/section/UropaFooter.vue'</script>
