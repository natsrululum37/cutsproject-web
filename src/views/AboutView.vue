<template>
  <section class="bg-[#121212] text-white">
    <!-- Hero Fullscreen Image -->
    <div class="relative w-full h-[500px] overflow-hidden">
      <img
        src="@/assets/images/CUTS.webp"
        alt="CutsProject Barbershop Hero Image"
        class="w-full h-full object-cover"
        width="1920"
        height="500"
        fetchpriority="high"
      />
    </div>

    <!-- Subtitle After Hero Image -->
    <div class="bg-[#282424] text-center py-8 border-t border-[#333]">
      <h1 class="text-yellow-400 text-3xl font-bold">TENTANG KAMI</h1>
      <p class="text-sm tracking-widest text-white mt-1">CUTSPROJECT</p>
    </div>

    <!-- Main Content -->
    <div class="py-20 px-4">
      <!-- About Section Component -->
      <AboutSection />
      <TeamSection />

      <!-- FAQ -->
      <div class="max-w-6xl mx-auto pt-12">
        <FaqSection />
      </div>
    </div>
  </section>
</template>

<script setup>
import FaqSection from '@/components/FaqSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import TeamSection from '@/components/TeamSection.vue'
</script>
