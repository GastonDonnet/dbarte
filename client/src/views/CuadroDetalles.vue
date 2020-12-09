<template>
  <div class="container h-full bg-transparent-white p-4">
    <div class="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2">
      <img :src="require(`@/assets/img/cuadros/Dr.jpg`)" class="shadow-xl" />
      <div class="px-4 self-center">
        <p class="text-center font-bold text-2xl mb-4">Dr. House</p>
        <div>
          <div class="">
            <span class="font-medium mr-3">FECHA:</span>
            <span>2017-03-15</span>
          </div>
          <div class="">
            <span class="font-medium mr-3">TAMAÑO ORIGINAL:</span>
            <span>50cm x 70cm</span>
          </div>
        </div>
        <div class="flex flex-col mt-4 text-center">
          <div
            class="grid grid-cols-2 font-medium border-gray-300 border-b-2 mb-1"
          >
            <span class="mr-3">TAMAÑO</span>
            <span>PRECIO</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="mr-3">40x40</span>
            <span>$10251</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="mr-3">40x40</span>
            <span>$10251</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="mr-3">40x40</span>
            <span>$10251</span>
          </div>
        </div>
        <button
          class="w-full h-10 my-5 px-4 py-1 mx-2 text-white font-light tracking-wider rounded shadow-xl bg-gray-900 hover:bg-green-400 transition-all duration-200 focus:outline-none"
        >
          CONSULTAR
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>