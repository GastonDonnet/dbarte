<template>
  <div class="container h-full bg-transparent-white p-4">
    <last-page></last-page>
    <div class="grid sm:grid-rows-none sm:grid-cols-2" v-if="cuadro">
      <img :src="cuadro.imagenes[0].imagen" class="shadow-xl self-center" />
      <div class="px-4 self-center my-5">
        <p class="text-center font-bold text-2xl mb-4">{{ cuadro.titulo }}</p>
        <div>
          <div class="" v-if="cuadro.creado">
            <span class="font-medium mr-3">FECHA:</span>
            <span>{{ cuadro.creado }}</span>
          </div>
          <div class="">
            <span class="font-medium mr-3">ANCHO ORIGINAL:</span>
            <span>{{ cuadro.ancho }}cm</span>
          </div>
          <div class="">
            <span class="font-medium mr-3">ALTO ORIGINAL:</span>
            <span>{{ cuadro.alto }}cm</span>
          </div>
        </div>
        <div class="flex flex-col mt-4 text-center">
          <div
            class="grid grid-cols-2 font-medium border-gray-300 border-b-2 mb-1"
          >
            <span class="mr-3">TAMAÑO</span>
            <span>PRECIO</span>
          </div>
          <div
            class="grid grid-cols-2"
            v-for="tamaño in cuadro.tamaños"
            :key="tamaño.id"
          >
            <span class="mr-3">{{ tamaño.ancho }}cm x {{ tamaño.alto }}cm</span>
            <span>${{ tamaño.precio }}</span>
          </div>
        </div>
        <button
          class="w-full h-10 my-5 px-4 py-1 text-white font-light tracking-wider rounded shadow-xl bg-gray-900 hover:bg-green-400 transition-all duration-200 focus:outline-none"
          @click="showModal = true"
        >
          CONSULTAR
        </button>
      </div>
    </div>
    <vue-tailwind-modal
      :showing="showModal"
      @close="showModal = false"
      :showClose="true"
      :backgroundClose="true"
    >
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <span
          v-if="formErrors.email && focused.email"
          class="text-xs text-red-400"
          >{{ formErrors.email }}</span
        >
        <input
          v-model="consulta.email"
          @blur="focused.email = true"
          type="email"
          name="email"
          id="email"
          class="focus:outline-none block w-full px-2 py-1 sm:text-sm rounded-xl mt-1 relative shadow-sm bg-gray-50 focus:bg-green-300 focus:bg-opacity-50"
          placeholder="ejemplo@gmail.com"
        />
      </div>

      <div class="mt-4">
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Mensaje</label
        >
        <span
          v-if="formErrors.mensaje && focused.mensaje"
          class="text-xs text-red-400"
          >{{ formErrors.mensaje }}</span
        >
        <textarea
          @blur="focused.mensaje = true"
          v-model="consulta.mensaje"
          rows="4"
          name="mensaje"
          id="mensaje"
          class="focus:outline-none block w-full px-2 py-1 sm:text-sm rounded-xl mt-1 relative shadow-sm bg-gray-50 focus:bg-green-300 focus:bg-opacity-50"
          placeholder="Escribe tu mensaje"
        />
      </div>

      <button
        v-if="!sending"
        class="w-full h-10 my-5 px-4 py-1 text-white font-light tracking-wider rounded shadow-xl bg-gray-900 hover:bg-green-400 transition-all duration-200 focus:outline-none"
        :disabled="!!formErrors.mensaje || !!formErrors.email"
        @click="enviarMail()"
      >
        <span>ENVIAR</span>
      </button>
      <div v-else class="flex justify-center mt-4">
        <loader></loader>
      </div>
    </vue-tailwind-modal>
  </div>
</template>

<script>
import LastPage from '../components/LastPage.vue'
import VueTailwindModal from 'vue-tailwind-modal'
import Loader from '../components/Loader.vue'

export default {
  components: {
    LastPage,
    VueTailwindModal,
    Loader
  },

  data() {
    return {
      cuadro: null,
      consulta: {},
      showModal: false,
      focused: {
        mensaje: false,
        email: false
      },
      sending: false
    }
  },

  methods: {
    async enviarMail() {
      this.sending = true
      this.consulta.cuadro = this.cuadro
      const res = await this.$http.post(`email/buy/`, this.consulta)

      if (res.status == 200) {
        this.$toasted.success('Mensaje enviado!')
        this.showModal = false
        this.sending = false
      }
      if (res.status != 200) {
        this.$toasted.error(
          'Error al enviar el mensaje, por favor contactese por otro medio!'
        )
        this.showModal = false
        this.sending = false
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  },

  computed: {
    formErrors() {
      let email = ''
      let mensaje = ''

      if (!this.validEmail(this.consulta.email)) {
        email = 'Email invalido'
      }

      if (!this.consulta.email) {
        email = 'Por favor escribe un email'
      }

      if (!this.consulta.mensaje) {
        mensaje = 'Por favor completa un mensaje'
      }

      return {
        email,
        mensaje
      }
    }
  },

  async created() {
    const res = await this.$http.get(`cuadros/${this.$route.params.id}`)
    this.cuadro = res.data
  }
}
</script>

<style>
.overflow-auto.max-h-screen.w-full {
  overflow: visible;
}
</style>
