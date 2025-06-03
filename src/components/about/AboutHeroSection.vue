<template>
  <!-- Hero Fullscreen Image -->
  <div class="relative w-full h-[500px] overflow-hidden">
    <img
      src="@/assets/images/CUTS.webp"
      alt="CutsProject Barbershop Hero Image"
      class="w-full h-full object-cover"
      width="1920"
      height="500"
      fetchpriority="high"
      loading="lazy"
      decoding="async"
    />
  </div>
  <!-- Subtitle After Hero Image -->
  <div class="bg-[#282424] text-center py-8 border-t border-[#333]">
    <h1 class="text-yellow-400 text-3xl font-bold">TENTANG KAMI</h1>
    <p class="text-sm tracking-widest text-white mt-1">CUTSPROJECT</p>
  </div>
</template>

<script setup>
// Tidak perlu logic khusus
</script>
