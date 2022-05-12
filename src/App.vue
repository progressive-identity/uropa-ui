<script>
import HelloWorld from './components/HelloWorld.vue'
import UropaNavBar from "@/components/UropaNavBar"
import UropaFooter from "@/components/UropaFooter"
import Home from "@/views/Home"

export default {
  name: 'App',
  components: {
    Home,
    UropaFooter,
    UropaNavBar,
    HelloWorld
  }
}
</script>

<template>
  <UropaNavBar/>
  <Home/>
  <UropaFooter/>
</template>
