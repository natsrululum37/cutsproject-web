<template>
  <div class="bg-black text-white">
    <h1 class="sr-only">Welcome to CutsProject</h1>
    <main>
      <HeroSection />
      <VisionMission />
      <Location />
      <Services />
      <Cta />
    </main>
  </div>
</template>

<script setup>
import HeroSection from '@/components/home/HeroSection.vue'
import VisionMission from '@/components/home/VisionMissionSection.vue'
import Location from '@/components/home/LocationSection.vue'
import Services from '@/components/home/ServicesPriceSection.vue'
import Cta from '@/components/home/CtaSection.vue'
</script>
