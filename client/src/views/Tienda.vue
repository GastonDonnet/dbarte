<template>
  <div class="container mt-16 sm:mt-2">
    <lista-cuadros titulo="CUADROS" :filter="true"></lista-cuadros>
  </div>
</template>

<script>
import ListaCuadros from '../components/ListaCuadros.vue'
export default {
  components: {
    ListaCuadros
  }
}
</script>

<style>
</style>
