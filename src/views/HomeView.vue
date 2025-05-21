<template>
  <div class="bg-black text-white font-sans">
    <HeroCarousel />
    <ImageSlider :images="myCustomImages" height="700px" />
    <CallToAction />
  </div>
</template>

<script setup>
import HeroCarousel from '@/components/HeroCarousel.vue'
import ImageSlider from '@/components/ImageSlider.vue';
import CallToAction from '@/components/CallToAction.vue';
</script>
