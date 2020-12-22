<template>
  <div class="container">
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

