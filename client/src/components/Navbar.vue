<template>
  <div class="flex flex-col-reverse sm:flex-row">
    <img
      src="@/assets/svg/undraw_making_art modified.svg"
      alt=""
      class="w-full max-h-screen absolute -top-4 hidden sm:static sm:flex"
      v-if="route.name == 'Home'"
    />
    <div class="container">
      <img
        src="@/assets/svg/DBArte1.svg"
        alt="DBArte"
        class="w-50 mx-4 mt-2 hidden sm:block"
        v-if="route.name == 'Home'"
      />
      <div
        class="flex flex-row justify-center opacity-80 items-center h-14 lg:h-auto my-2"
      >
        <router-link class="h-full mx-2 router-active" :to="{ name: 'Home' }">
          <button
            class="w-30 px-4 py-1 h-full text-white font-light tracking-wider rounded shadow-xl bg-gray-900 hover:bg-green-400 transition-all duration-200 focus:outline-none"
          >
            HOME
          </button>
        </router-link>
        <router-link class="h-full my-5 mx-2" :to="{ name: 'Tienda' }">
          <button
            class="w-30 px-4 py-1 h-full text-white font-light tracking-wider rounded shadow-xl bg-gray-900 hover:bg-green-400 transition-all duration-200 focus:outline-none"
          >
            TIENDA
          </button>
        </router-link>
        <router-link class="h-full my-5 mx-2" :to="{ name: 'About' }">
          <button
            class="w-30 px-4 py-1 h-full text-white font-light tracking-wider rounded shadow-xl bg-gray-900 hover:bg-green-400 transition-all duration-200 focus:outline-none"
          >
            PREGUNTAS FRECUENTES
          </button>
        </router-link>
      </div>
      <img
        src="@/assets/svg/DBArte1.svg"
        alt="DBArte"
        class="w-50 mx-4 mt-2 sm:hidden relative transform -translate-y-20"
        style="z-index: -1"
        v-if="route.name == 'Home'"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route
    }
  }
}
</script>

<style scoped>
.router-link-exact-active > button {
  --tw-bg-opacity: 1;
  background-color: rgba(52, 211, 153, var(--tw-bg-opacity));
}
</style>
