<template>
  <div class="container mt-16 sm:mt-2">
    <seccion name="CONTACTO">
      Para realizar compras o consultas podes contactarnos a cualquiera de
      nuestras redes sociales, enviando un mail o un mensaje a nuestro whatsapp.
      <contacto></contacto>
    </seccion>
    <seccion name="PRODUCCION">
      Los cuadros son originales provenientes de la artista
      <a
        class="text-lightblue-dark"
        href="https://www.instagram.com/danielabbarbero/"
        >@danielabbarbero</a
      >.
      <hr class="my-1" />
      Son realizados en bastidor utilizando acrilicos profesionales.
      <hr class="my-1" />
      Las fotos utilizadas para realizar las impresiones son tomadas por un
      fotografo profesional, garantizando la mejor calidad.
    </seccion>

    <seccion name="ENVIO">
      Los envios estan a cargo del comprador.
      <hr class="my-1" />
      Envio gratis en las localidades de San Carlos Centro, San Carlos Sur, San
      Carlos Norte, Rafaela y Santa Fe (Centro).
    </seccion>
    <seccion name="TAMAÑOS">
      Al ser impresos el tamaño de un cuadro puede elegirse.
      <hr class="my-1" />
      Lo ideal seria elegir el tamaño original o menores al mismo para no perder
      resolucion.
      <hr class="my-1" />
      Si se eligen tamaños con otra relacion aspecto, el cuadro no se deformara
      sino, que sera recortado.
      <hr class="my-1" />
      Cada cuadro posee uno o mas tamaños pre-definidos los cuales dependen
      tanto de como fue pintado (hay cuadros que podrian recortarse) y el tamaño
      original.
      <hr class="my-1" />
      Si desea tamaños que no estan en la lista, consulte por cualquiera de los
      medios previamente mencionados.
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
