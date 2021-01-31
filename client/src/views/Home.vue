<template>
  <div class="container">
    <div class="flex flex-row -mb-6">
      <img
        src="@/assets/svg/undraw_making_art modified.svg"
        alt=""
        class="w-full max-w-screen-md mx-auto"
      />
      <img
        src="@/assets/svg/DBArte1.svg"
        alt=""
        class="w-full max-w-screen-md mx-auto hidden lg:block"
      />
    </div>
    <seccion name="SOBRE NOSOTROS">
      <b class="text-lightblue-dark">dbArte</b> es una tienda digital de cuadros
      originales impresos con altísima calidad sobre un bastidor de tela canvas
      proporcionando un acabado prácticamente igual al cuadro pintado a mano.
      <br />
    </seccion>
    <lista-cuadros
      :cantidadAMostrar="2"
      :loadOneTime="true"
      titulo="ULTIMOS CUADROS"
    ></lista-cuadros>
    <seccion name="CONTACTO">
      <contacto></contacto>
    </seccion>
  </div>
</template>

<script>
import Seccion from '../components/Seccion.vue'
import ListaCuadros from '../components/ListaCuadros.vue'
import Contacto from '../components/Contacto.vue'

// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    ListaCuadros,
    Seccion,
    Contacto
  }
}
</script>

<style scoped>
body {
  background-image: none !important;
  background-color: black;
}
</style>
