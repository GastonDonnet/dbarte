<template>
  <div>
    <ultimos-cuadros></ultimos-cuadros>
    <seccion name="CONTACTO">
      <div class="grid grid-cols-2 sm:grid-cols-4 justify-around my-2">
        <a href="#" class="my-2 flex flex-col items-center">
          <img class="w-10" src="@/assets/svg/instagram.svg" alt="" />
          <p class="font-thin text-gray-600">@dbarte</p>
        </a>
        <a href="#" class="my-2 flex flex-col items-center">
          <img class="w-10" src="@/assets/svg/facebook.svg" alt="" />
          <p class="font-thin text-gray-600">/dbarte</p>
        </a>
        <a href="#" class="my-2 flex flex-col items-center">
          <img class="w-10" src="@/assets/svg/email.svg" alt="" />
          <p class="font-thin text-gray-600">dbart@gmail.com</p>
        </a>
        <a href="#" class="my-2 flex flex-col items-center">
          <img class="w-10" src="@/assets/svg/whatsapp.svg" alt="" />
          <p class="font-thin text-gray-600">3404-15530149</p>
        </a>
      </div>
    </seccion>
  </div>
</template>

<script>
import Seccion from '../components/Seccion.vue'
import UltimosCuadros from '../components/UltimosCuadros.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    UltimosCuadros,
    Seccion
  }
}
</script>

<style scoped>
body {
  background-image: none !important;
  background-color: black;
}
</style>
