<template>
  <div
    class="bg-white shadow-md sticky z-50 top-0 overflow-hidden opacity-95 py-2 px-6"
  >
    <div class="flex flex-row items-center" :class="{ 'flex-col': open }">
      <div class="flex flex-row w-full md:w-auto md:mr-auto">
        <router-link :to="{ name: 'Home' }" class="mr-auto">
          <img src="@/assets/svg/DBArte1.svg" alt="DBArte" class="h-14" />
        </router-link>

        <button @click="open = !open" class="md:hidden hover:text-green-500">
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            <transition name="fade" mode="out-in">
              <path
                v-show="!open"
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </transition>
            <transition name="fade" mode="out-in">
              <path
                v-show="open"
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </transition>
          </svg>
        </button>
      </div>

      <div class="hidden md:block h-10">
        <router-link
          class="h-full mx-2"
          v-for="(menuItem, i) in menuItems"
          :key="i"
          :to="{ name: menuItem.route }"
          exact-active-class="router-active"
        >
          <button
            class="w-30 px-4 py-1 h-full text-white font-light tracking-wider rounded shadow-xl bg-gray-900 hover:bg-green-400 transition-all duration-200 focus:outline-none"
          >
            {{ menuItem.titulo }}
          </button>
        </router-link>
      </div>

      <div v-if="open" class="flex flex-col w-full">
        <router-link
          class="h-full my-1"
          v-for="(menuItem, i) in menuItems"
          :key="i"
          :to="{ name: menuItem.route }"
          exact-active-class="router-active"
        >
          <button
            class="h w-30 px-4 py-1 h-full text-white font-light tracking-wider rounded shadow-xl bg-gray-900 hover:bg-green-400 transition-all duration-200 focus:outline-none"
          >
            {{ menuItem.titulo }}
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      menuItems: [
        {
          titulo: 'HOME',
          route: 'Home'
        },
        {
          titulo: 'TIENDA',
          route: 'Tienda'
        },
        {
          titulo: 'GALERÍA',
          route: 'Galeria'
        },
        {
          titulo: 'PREGUNTAS FRECUENTES',
          route: 'About'
        }
      ]
    }
  },
  computed: {
    route() {
      return this.$route
    }
  }
}
</script>

<style scoped>
.router-active > button {
  @apply bg-green-400;
}
</style>
