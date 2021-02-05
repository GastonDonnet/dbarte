<template>
  <div class="mx-1 my-1 relative foto">
    <img
      :src="foto.imagen"
      alt=""
      class="transition-all duration-500"
    />
  </div>
</template>

<script>
import imagesLoaded from 'vue-images-loaded'
export default {
  props: {
    // eslint-disable-next-line no-undef
    foto: {
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
.foto > img {
  box-shadow: 2px 2px 11px -3px #505050;
}

.foto:hover > img {
  box-shadow: none;
  filter: brightness(1.1) opacity(0.8) contrast(0.8);
}

.foto > div {
  display: none;
  text-shadow: 0px 7px 10px #046769;
}

.foto:hover > div {
  display: block;
}
</style>
