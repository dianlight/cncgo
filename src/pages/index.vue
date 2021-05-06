<template>
  <div class="home">
    <img
      :src="require('../assets/logo.svg')"
      class="my-3"
      contain
      height="200"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  }
}
</script>
