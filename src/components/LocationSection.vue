<template>
  <div class="flex flex-col items-center gap-2 mb-8">
    <div class="flex items-center gap-3">
      <div
        class="bg-yellow-400 text-black rounded-full w-12 h-12 flex items-center justify-center text-xl font-extrabold shadow-lg border-2 border-yellow-300"
      >
        <span>4+</span>
      </div>
      <div>
        <div class="text-2xl font-semibold text-white">Lokasi</div>
        <div class="text-xs text-gray-400 -mt-1">Di Semarang</div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center mt-1 text-xs text-gray-300 gap-x-4 gap-y-0">
      <span>CUTS 1 - Jl. Pemuda No.1 (Simpang Lima)</span>
      <span>CUTS 2 - Jl. Pandanaran No.34</span>
      <span>CUTS 3 - Jl. S. Parman No.5</span>
      <span>CUTS 4 - Jl. Majapahit, Tlogosari</span>
    </div>
    <div class="flex justify-center mb-8">
    <img
      :src="img('barbershop.webp')"
      alt="Foto Toko"
      class="rounded-lg shadow-lg w-full max-w-md object-cover"
    />
  </div>
  </div>
</template>

<script setup>
const img = (file) => new URL(`../assets/images/home-pict/${file}`, import.meta.url).href

</script>
