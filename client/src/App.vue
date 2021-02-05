<template>
  <div id="app" class="min-h-screen">
    <Navbar />
    <div class="container mx-auto min-h-screen">
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

  computed: {
    route() {
      return this.$route
    }
  }
}
</script>

