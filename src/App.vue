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

<template>
  <UropaNavBar/>
  <Home/>
  <UropaFooter/>
</template>
