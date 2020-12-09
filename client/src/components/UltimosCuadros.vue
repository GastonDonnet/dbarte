<template>
  <seccion name="ULTIMOS CUADROS">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 my-2"
      style="text-align: -webkit-center"
    >
      <cuadro cuadroUrl="Dr.jpg" cuadroId="1"></cuadro>
      <cuadro cuadroUrl="Dr.jpg" cuadroId="2"></cuadro>
      <cuadro cuadroUrl="Dr.jpg" cuadroId="3" class="hidden sm:block"></cuadro>
    </div>
  </seccion>
</template>

<script>
import Cuadro from './Cuadro.vue'
import Seccion from './Seccion.vue'
export default {
  components: { Seccion, Cuadro }
}
</script>

<style>
.cuadro > img {
  box-shadow: 2px 2px 7px 0px #505050;
}

.cuadro:hover > img {
  box-shadow: none;
  filter: brightness(1.1) opacity(0.8) contrast(0.8);
}

.cuadro > a {
  display: none;
  text-shadow: 0px 7px 10px #046769;
}

.cuadro:hover > a {
  display: block;
}
</style>
