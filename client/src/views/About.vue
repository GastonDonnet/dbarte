<template>
  <div class="container">
    <seccion name="CONTACTO">
      Para realizar compras o consultas podes contactarnos a cualquiera de
      nuestras redes sociales, enviando un mail o un mensaje a nuestro Whatsapp.
      <contacto></contacto>
    </seccion>
    <seccion name="PRODUCCIÓN">
      Los cuadros son reproducciones de obras originales del un mismo autor.
      <hr class="my-1" />
      Estos son impresos en Lienzo Canvas, tensado y montado sobre bastidor de
      madera de 20 mm. listos para colgar.
      <hr class="my-1" />
      Las fotos utilizadas para realizar las impresiones son tomadas por un
      fotógrafo profesional, garantizando la mejor calidad. El resultado es la
      calidad "Fine Art", la que se usa profesionalmente para reproducción de
      obras de arte.
      <hr class="my-1" />
      Al ser impresiones los colores pueden variar levemente.
    </seccion>

    <seccion name="ENVÍO">
      Los envíos están a cargo del comprador.
      <hr class="my-1" />
      Envío gratis en las localidades de San Carlos Centro, San Carlos Sur, San
      Carlos Norte, Rafaela y Santa Fe (Centro).
    </seccion>
    <seccion name="TAMAÑOS">
      Cada obra se ofrece en distintos tamaños, sin descuidar la proporción y
      calidad.
    </seccion>
    <seccion name="PLAZO DE ENTREGA">
      El plazo de entrega, si el cuadro no esta en stock sera menor a 2 semanas.
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
