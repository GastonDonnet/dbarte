<template>
  <div @click="$router.back()">
    <button
      class="fixed sm:hidden bottom-2 right-2 sm:right-5 sm:bottom-5 p-4 bg-pink-500 rounded-full text-white opacity-75 hover:bg-pink-700"
    >
      <img class="w-3 h-3 text-white" src="@/assets/svg/atras.svg" alt="" />
    </button>
    <button
      class="fixed hidden sm:block top-5 left-5 p-4 bg-pink-500 rounded-full text-white opacity-75 hover:bg-pink-700"
    >
      <img class="w-3 h-3" src="@/assets/svg/atras.svg" alt="" />
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>