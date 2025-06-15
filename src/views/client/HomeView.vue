<template>
  <div class="bg-black text-white">
    <h1 class="sr-only">Welcome to CutsProject</h1>
    <main
      class="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 space-y-8 sm:space-y-10 md:space-y-14 lg:space-y-16"
    >
      <HeroSection />
      <VisionMission />
      <Location />
      <Services />
      <Cta />
    </main>
  </div>
</template>

<script setup>
import HeroSection from '@/components/client/home/HeroSection.vue'
import VisionMission from '@/components/client/home/VisionMissionSection.vue'
import Location from '@/components/client/home/LocationSection.vue'
import Services from '@/components/client/home/ServicesPriceSection.vue'
import Cta from '@/components/client/home/CtaSection.vue'
</script>
