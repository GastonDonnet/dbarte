<template>
  <div id="app" class="min-h-screen" :style="toggleBackground">
    <div class="container mx-auto min-h-screen">
      <Navbar />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',

  components: {
    Footer,
    Navbar
  },

  data() {
    return {
      routesWithoutBackgroundImage: ['Home', 'Cuadro']
    }
  },

  computed: {
    route() {
      return this.$route
    },
    toggleBackground() {
      console.log(this.routesWithoutBackgroundImage.indexOf(this.$route.name))
      if (this.routesWithoutBackgroundImage.indexOf(this.$route.name) == -1) {
        return {
          backgroundImage: `url(${require('@/assets/svg/DBArte1.svg')})`
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
#app {
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>
