<template>
  <div
    class="relative -top-12 mx-2 sm:static mb-5 p-3 rounded-xl bg-gray-50 shadow-xl"
  >
    <div
      class="text-2xl border-gray-200 border-b-2 mb-2 font-thin text-lightblue"
    >
      {{ name }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name
  }
}
</script>

<style scoped>
</style>
