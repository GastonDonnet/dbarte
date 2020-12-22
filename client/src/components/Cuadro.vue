<template>
  <router-link
    :to="{
      name: 'Cuadro',
      params: { id: cuadro.id, cuadro: cuadro }
    }"
  >
    <div class="mx-1 my-1 relative cuadro">
      <img
        :src="cuadro.imagenes[0].imagen"
        alt=""
        class="transition-all duration-500"
      />

      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 transform -translate-y-1/2 text-3xl font-bold text-white text-center"
      >
        {{ cuadro.titulo }}
      </div>
    </div></router-link
  >
</template>

<script>
import imagesLoaded from 'vue-images-loaded'
export default {
  props: {
    // eslint-disable-next-line no-undef
    cuadro: {
      required: true
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  methods: {
    imageLoaded() {
      this.loaded = true
    }
  },
  directives: {
    imagesLoaded
  }
}
</script>

<style scoped>
.cuadro > img {
  box-shadow: 2px 2px 11px -3px #505050;
}

.cuadro:hover > img {
  box-shadow: none;
  filter: brightness(1.1) opacity(0.8) contrast(0.8);
}

.cuadro > div {
  display: none;
  text-shadow: 0px 7px 10px #046769;
}

.cuadro:hover > div {
  display: block;
}
</style>
