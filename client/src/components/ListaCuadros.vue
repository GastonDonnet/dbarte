<template>
  <seccion :name="titulo">
    <div v-if="filter" class="flex flex-wrap justify-center my-4">
      <div
        class="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-gray-700 bg-white border border-gray-300 shadow-sm cursor-pointer"
        v-for="(tag, i) in tags"
        :key="i"
        :class="
          selectedTag && selectedTag.id == tag.id
            ? 'bg-green-400 text-white'
            : ''
        "
        @click="selectTag(tag)"
      >
        <div class="font-normal leading-none max-w-full flex-initial">
          {{ tag.tag }}
        </div>
      </div>
    </div>
    <stack
      :column-min-width="420"
      :gutter-width="8"
      :gutter-height="8"
      :monitor-images-loaded="true"
    >
      <stack-item
        v-for="(cuadro, i) in cuadros"
        :key="i"
        style="transition: transform 300ms"
      >
        <cuadro :cuadro="cuadro"></cuadro>
      </stack-item>
    </stack>
  </seccion>
</template>

<script>
import { Stack, StackItem } from 'vue-stack-grid'
import Cuadro from './Cuadro.vue'
import Seccion from './Seccion.vue'

export default {
  components: { Seccion, Cuadro, Stack, StackItem },
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
      cuadros: [],
      tags: [],
      selectedTag: null,
      loading: false,
      loadedOneTime: false,
      cuadrosCount: -1
    }
  },

  computed: {
    // filteredCuadros() {
    //   if (this.selectedTag) {
    //     return this.cuadros.filter(
    //       (el) => el.tags.indexOf(this.selectedTag) >= 0
    //     )
    //   } else {
    //     return this.cuadros
    //   }
    // }
  },

  methods: {
    handleScroll() {
      let scrollHeight = window.scrollY
      let maxHeight =
        window.document.body.scrollHeight -
        window.document.documentElement.clientHeight

      if (scrollHeight >= maxHeight - 200) {
        this.getCuadros()
      }
    },

    selectTag(tag) {
      this.cuadros = []

      if (this.selectedTag && this.selectedTag.id == tag.id) {
        this.selectedTag = null
      } else {
        this.selectedTag = tag
      }

      this.getCuadros()
    },

    async getCuadros() {
      // Si carga una vez y ya cargo
      if (this.loadOneTime && this.loadedOneTime) return

      // No volver a cargar
      if (this.loading) return

      // Si ya cargaron todos los cuadros
      if (this.cuadros.length == this.cuadrosCount) {
        return
      }

      // Cargando
      this.loading = true

      // Creo los params
      let params = `?limit=${this.cantidadAMostrar}`
      params += `&offset=${this.cuadros.length}`
      params += `${this.selectedTag ? '&tags=' + this.selectedTag.id : ''}`

      // Obteniendo res
      const res = await this.$http.get(`cuadros/${params}`)

      // Numero total de cuadros
      this.cuadrosCount = res.data.count

      // Ya cargado
      this.loading = false
      this.loadedOneTime = true

      if (!this.cuadros.length) {
        this.cuadros = res.data.results
      } else {
        this.cuadros.push(...res.data.results)
      }
    },
    async getTags() {
      if (this.filter) {
        const res2 = await this.$http.get(`tags/`)
        this.tags = res2.data
      }
    }
  },

  created() {
    window.addEventListener('scroll', this.handleScroll)

    this.getCuadros()
    this.getTags()
  }
}
</script>

<style scoped>
</style>
