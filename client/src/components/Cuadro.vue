<template>
  <div class="mx-1 relative cuadro">
    <img
      :src="require(`@/assets/img/cuadros/${cuadroUrl}`)"
      alt=""
      class="transition-all duration-500"
    />
    <router-link
      :to="{ name: 'Cuadro', params: { id: cuadroId } }"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 transform -translate-y-1/2 text-3xl font-bold text-white"
    >
      VER
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line no-undef
    cuadroUrl: {
      required: true
    },
    cuadroId: {
      required: true
    }
  },

  mounted() {
    console.log(this.cuadroUrl)
  }
}
</script>

<style>
</style>
