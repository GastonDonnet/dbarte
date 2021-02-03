<template>
  <div class="container">
    <seccion name="CONTACTO">
      Para realizar compras o consultas podes contactarnos a cualquiera de
      nuestras redes sociales, enviando un mail o un mensaje a nuestro Whatsapp.
      <contacto></contacto>
    </seccion>
    <seccion name="PRODUCCIÓN">
      Los cuadros son originales provenientes de la artista
      <a
        class="text-lightblue-dark"
        href="https://www.instagram.com/danielabbarbero/"
        >@danielabbarbero</a
      >.
      <hr class="my-1" />
      Son realizados en bastidor utilizando acrílicos profesionales.
      <hr class="my-1" />
      Las fotos utilizadas para realizar las impresiones son tomadas por un
      fotógrafo profesional, garantizando la mejor calidad.
    </seccion>

    <seccion name="ENVÍO">
      Los envíos están a cargo del comprador.
      <hr class="my-1" />
      Envío gratis en las localidades de San Carlos Centro, San Carlos Sur, San
      Carlos Norte, Rafaela y Santa Fe (Centro).
    </seccion>
    <seccion name="TAMAÑOS">
      Cada cuadro posee un "Tamaño original", pero en la impresión pueden ser
      escalados. Mientras el mismo sea mas pequeño no perdería calidad.
      <hr class="my-1" />
      Si desea otro tamaño, puede ponerse en contacto con nosotros comentando el
      tamaño que busca, el precio variara con el mismo.
    </seccion>
    <seccion name="PAGO">
      Los pagos se realizan mediante transferencia bancaria, mercado pago o
      efectivo.
    </seccion>
    <seccion name="LEGAL">
      Los datos de las imágenes están protegidos por derechos de autor.
    </seccion>
  </div>
</template>

<script>
import Contacto from '../components/Contacto.vue'
import Seccion from '../components/Seccion.vue'

export default {
  name: 'Home',
  components: {
    Seccion,
    Contacto
  }
}
</script>
