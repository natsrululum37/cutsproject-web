<template>
  <div class="bg-black text-white">
    <main>
      <section class="view-section section-spacing">
        <AboutHeroSection />
      </section>
      <section class="view-section section-spacing">
        <AboutSection />
      </section>
      <section class="view-section section-spacing">
        <TeamSection />
      </section>
      <section class="view-section section-spacing">
        <FaqSection />
      </section>
    </main>
  </div>
</template>

<script setup>
import AboutHeroSection from '@/components/client/about/AboutHeroSection.vue'
import FaqSection from '@/components/client/about/FaqSection.vue'
import AboutSection from '@/components/client/about/AboutSection.vue'
import TeamSection from '@/components/client/about/TeamSection.vue'
</script>
