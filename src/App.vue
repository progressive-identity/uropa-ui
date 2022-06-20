<template>
  <div class="flex flex-col h-screen justify-between">
    <UropaNavBar class="h-14"/>
    <Home class="mb-auto"/>
    <UropaFooter/>
  </div>
</template>

<script>
import UropaNavBar from '@/components/UropaNavBar'
import UropaFooter from '@/components/UropaFooter'
import Home from '@/views/Home'

export default {
  name: 'App',
  components: {
    Home,
    UropaFooter,
    UropaNavBar
  }
}
</script>
