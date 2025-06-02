<template>
  <section class="bg-black text-white">
    <HeroSection />
    <!-- <IntroSection /> -->
    <VisiMisi />
    <Location />
    <Services />
    <Cta />
  </section>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue'
// import IntroSection from '@/components/HomeIntroSection.vue'
import VisiMisi from '@/components/VisionMissionSection.vue'
import Location from '@/components/LocationSection.vue'
import Services from '@/components/ServicesPriceSection.vue'
import Cta from '@/components/HomeCtaSection.vue'

</script>
