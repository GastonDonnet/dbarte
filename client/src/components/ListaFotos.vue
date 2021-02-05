<template>
  <seccion :name="titulo">
    <stack
      :column-min-width="420"
      :gutter-width="8"
      :gutter-height="8"
      :monitor-images-loaded="true"
    >
      <stack-item
        v-for="(foto, i) in fotos"
        :key="i"
        style="transition: transform 300ms"
      >
        <foto :foto="foto"></foto>
      </stack-item>
    </stack>
    <div class="flex text-center justify-center">
      <img
        v-if="(fotos.length != fotosCount) & !loadOneTime & !loading"
        src="@/assets/svg/flecha-correcta.svg"
        class="w-8 transform rotate-90"
      />
      <loader-horizontal v-if="loading"></loader-horizontal>
    </div>
  </seccion>
</template>

<script>
import { Stack, StackItem } from 'vue-stack-grid'
import Foto from './Foto.vue'
import LoaderHorizontal from './LoaderHorizontal.vue'
import Seccion from './Seccion.vue'

export default {
  components: { Seccion, Foto, Stack, StackItem, LoaderHorizontal },
  props: {
    cantidadAMostrar: {
      required: false,
      default: 4
    },
    titulo: {
      required: true
    },
    filter: {
      default: false
    },
    loadOneTime: {
      default: false
    }
  },

  data() {
    return {
      fotos: [],
      loading: false,
      loadedOneTime: false,
      fotosCount: -1
    }
  },

  methods: {
    handleScroll() {
      let scrollHeight = window.scrollY
      let maxHeight =
        window.document.body.scrollHeight -
        window.document.documentElement.clientHeight

      if (scrollHeight >= maxHeight - 200) {
        this.getFotos()
      }
    },

    async getFotos() {
      // Si carga una vez y ya cargo
      if (this.loadOneTime && this.loadedOneTime) return

      // No volver a cargar
      if (this.loading) return

      // Si ya cargaron todos los fotos
      if (this.fotos.length == this.fotosCount) {
        return
      }

      // Cargando
      this.loading = true

      // Creo los params
      let params = `?limit=${this.cantidadAMostrar}`
      params += `&offset=${this.fotos.length}`

      // Obteniendo res
      const res = await this.$http.get(`fotos/${params}`)

      // Numero total de fotos
      this.fotosCount = res.data.count
      console.log(res)

      // Ya cargado
      this.loading = false
      this.loadedOneTime = true

      if (!this.fotos.length) {
        this.fotos = res.data.results
      } else {
        this.fotos.push(...res.data.results)
      }
    }
  },

  created() {
    window.addEventListener('scroll', this.handleScroll)

    this.getFotos()
  }
}
</script>
