<template>
  <seccion :name="titulo">
    <div v-if="filter" class="flex flex-wrap justify-center my-4">
      <div
        class="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-gray-700 bg-white border border-gray-300 shadow-sm cursor-pointer"
        v-for="(tag, i) in tags"
        :key="i"
        :class="selectedTag == tag.id ? 'bg-green-400 text-white' : ''"
        @click="
          selectedTag == tag.id ? (selectedTag = null) : (selectedTag = tag.id)
        "
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
        v-for="(cuadro, i) in filteredCuadros"
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
      required: false
    },
    titulo: {
      required: true
    },
    filter: {
      default: false
    }
  },

  data() {
    return {
      cuadros: [],
      tags: [],
      selectedTag: null
    }
  },

  computed: {
    filteredCuadros() {
      if (this.selectedTag) {
        return this.cuadros.filter(
          (el) => el.tags.indexOf(this.selectedTag) >= 0
        )
      } else {
        return this.cuadros
      }
    }
  },

  async created() {
    const res = await this.$http.get(`cuadros/?limit=${this.cantidadAMostrar}`)

    if (this.cantidadAMostrar) {
      this.cuadros = res.data.results
    } else {
      this.cuadros = res.data
    }

    if (this.filter) {
      const res2 = await this.$http.get(`tags/`)
      this.tags = res2.data
    }
  }
}
</script>

<style scoped>
</style>
