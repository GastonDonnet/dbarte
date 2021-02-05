<template>
  <div class="container">
    <lista-fotos titulo="FOTOS" :filter="true"></lista-fotos>
  </div>
</template>

<script>
import ListaFotos from '../components/ListaFotos.vue'
export default {
  components: {
    ListaFotos
  }
}
</script>

