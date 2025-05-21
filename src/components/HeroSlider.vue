<template>
  <div ref="sliderContainer" class="w-full max-w-full mx-auto relative" aria-label="Image Slider">
    <!-- Swiper Component -->
    <swiper
      :modules="swiperModules"
      :slides-per-view="1"
      :loop="true"
      effect="fade"
      :speed="800"
      :autoplay="autoplayConfig"
      :pagination="paginationConfig"
      :navigation="navigationConfig"
      :a11y="a11yConfig"
      @swiper="onSwiper"
      class="w-full rounded-lg"
    >
      <swiper-slide
        v-for="(slide, index) in slides"
        :key="index"
        class="relative w-full h-[550px] overflow-hidden"
      >
        <picture>
          <source :srcset="slide.imageWebp" type="image/webp" />
          <img
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-cover"
            :loading="index === 0 ? 'eager' : 'lazy'"
            width="1280"
            height="720"
            fetchpriority="high"
          />
        </picture>
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>

        <!-- Hero Content Overlay -->
        <div
          class="absolute inset-0 flex flex-col items-start justify-center px-8 lg:px-16 text-white z-10"
        >
          <h1 class="text-3xl lg:text-5xl font-bold mb-4">{{ slide.title }}</h1>
          <p class="mb-6 max-w-lg">{{ slide.subtitle }}</p>
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-5 rounded-lg transition"
            @click="navigateTo(slide.ctaLink)"
          >
            {{ slide.ctaText }}
          </button>
        </div>
      </swiper-slide>

      <!-- Navigation Buttons -->
      <div class="swiper-button-prev" aria-label="Previous slide"></div>
      <div class="swiper-button-next" aria-label="Next slide"></div>

      <!-- Pagination Dots -->
      <div class="swiper-pagination absolute bottom-6 w-full z-10"></div>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, EffectFade, A11y } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css/a11y'

// Slide data
const slides = [
  {
    image: new URL('@/assets/images/hero1.webp', import.meta.url).href,
    imageWebp: new URL('@/assets/images/hero1.webp', import.meta.url).href,
    alt: 'Featured hairstyle showcase',
    title: 'Transform Your Look',
    subtitle: 'Experience the best barber services in town.',
    ctaText: 'Book Now',
    ctaLink: '/booking',
  },
  {
    image: new URL('@/assets/images/hero2.webp', import.meta.url).href,
    imageWebp: new URL('@/assets/images/hero2.webp', import.meta.url).href,
    alt: 'Professional barber services',
    title: 'Expert Stylists',
    subtitle: 'Our team is ready to give you the perfect cut.',
    ctaText: 'Meet the Team',
    ctaLink: '/team',
  },
  {
    image: new URL('@/assets/images/hero3.webp', import.meta.url).href,
    imageWebp: new URL('@/assets/images/hero3.webp', import.meta.url).href,
    alt: 'Salon interior and equipment',
    title: 'Modern Facilities',
    subtitle: 'Enjoy our state-of-the-art salon environment.',
    ctaText: 'View Gallery',
    ctaLink: '/gallery',
  },
]

// Swiper configuration
const swiperModules = [Autoplay, Pagination, Navigation, EffectFade, A11y]

const autoplayConfig = {
  delay: 5000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
}

const paginationConfig = {
  clickable: true,
  el: '.swiper-pagination',
  dynamicBullets: true,
  renderBullet: (index, className) => {
    return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`
  },
}

const navigationConfig = {
  prevEl: '.swiper-button-prev',
  nextEl: '.swiper-button-next',
}

const a11yConfig = {
  prevSlideMessage: 'Previous slide',
  nextSlideMessage: 'Next slide',
  firstSlideMessage: 'This is the first slide',
  lastSlideMessage: 'This is the last slide',
  paginationBulletMessage: 'Go to slide {{index}}',
}

const swiperInstance = ref(null)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const navigateTo = (link) => {
  // Implement navigation logic here, e.g., using Vue Router
  console.log(`Navigating to ${link}`)
}
</script>

<style scoped>
/* Navigation Buttons Styling */
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  color: #fff;
  z-index: 10;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Pagination Bullets Styling */
:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.7;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #ffd700;
  width: 12px;
  height: 12px;
}

/* Focus Styling for Accessibility */
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.5);
}

/* Reduced Motion Preferences */
@media (prefers-reduced-motion: reduce) {
  .swiper-slide img {
    transition: none !important;
    transform: none !important;
  }
}
</style>
