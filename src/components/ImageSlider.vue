<template>
  <div ref="sliderContainer" class="w-full max-w-full mx-auto relative" aria-label="Image Slider">
    <!-- Main Slider Container -->
    <div class="relative rounded-lg overflow-hidden shadow-xl">
      <div class="relative">
        <!-- Custom Navigation Buttons with Heroicons -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </button>

        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRightIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>

      <!-- Swiper Component -->
      <swiper
        :modules="swiperModules"
        :slides-per-view="1"
        :loop="true"
        :effect="'fade'"
        :speed="800"
        :autoplay="autoplayConfig"
        :pagination="paginationConfig"
        :navigation="navigationConfig"
        :a11y="a11yConfig"
        @swiper="onSwiper"
        class="w-full rounded-lg"
      >
        <swiper-slide v-for="(image, index) in images" :key="index">
          <div class="relative w-full h-[550px] overflow-hidden">
            <picture>
              <!-- WebP format for modern browsers -->
              <source
                :srcset="convertToWebP(image.src)"
                type="image/webp"
              />
              <!-- Original format as fallback -->
              <img
                :src="image.src"
                :alt="image.alt"
                class="w-full h-full object-cover"
                :style="currentSlideIndex === index ? 'transform: scale(1); transition: transform 7s ease;' : ''"
                :loading="index === 0 ? 'eager' : 'lazy'"
                width="1280"
                height="720"
                fetchpriority="high"
              />
            </picture>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          </div>
        </swiper-slide>

        <!-- Hidden original navigation buttons that are connected to the swiper -->
        <div class="swiper-button-prev opacity-0 pointer-events-none"></div>
        <div class="swiper-button-next opacity-0 pointer-events-none"></div>
      </swiper>

      <!-- Pagination Dots -->
      <div class="swiper-pagination absolute bottom-6 w-full z-10"></div>

      <!-- "CUTS PROJECT" Badge with animation -->
      <div
        class="absolute left-0 bottom-0 bg-yellow-500 text-white py-3 px-8 font-bold tracking-wider z-10 flex items-center shadow-lg translate-y-0 transition-transform duration-500"
        :class="{ 'translate-y-full': isLoading }"
      >
        <ScissorsIcon class="h-5 w-5 mr-2" aria-hidden="true" />
        <span>CUTS PROJECT</span>
      </div>

      <!-- Image counter -->
      <div class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
        {{ currentSlideIndex + 1 }} / {{ images.length }}
      </div>
    </div>

    <!-- Thumbnails Navigation -->
    <div
      class="mt-4 flex justify-center space-x-2 overflow-hidden"
      aria-label="Thumbnail navigation"
    >
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="goToSlide(index)"
        class="w-16 h-12 rounded-md overflow-hidden transition-all duration-300 border-2"
        :class="currentSlideIndex === index ? 'border-yellow-500 scale-105' : 'border-transparent opacity-70'"
        :aria-label="`Go to slide ${index + 1}`"
        :aria-current="currentSlideIndex === index"
      >
        <img
          :src="image.src"
          :alt="`Thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
          width="64"
          height="48"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick} from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation, EffectFade, A11y } from "swiper/modules";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ScissorsIcon
} from '@heroicons/vue/24/solid';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/a11y";

// Image data with proper alt texts
const images = [
  {
    src: new URL('@/assets/images/hero1.webp', import.meta.url).href,
    alt: "Cuts Project - Featured hairstyle showcase"
  },
  {
    src: new URL('@/assets/images/hero2.webp', import.meta.url).href,
    alt: "Cuts Project - Professional barber services"
  },
  {
    src: new URL('@/assets/images/hero3.webp', import.meta.url).href,
    alt: "Cuts Project - Salon interior and equipment"
  }
];

// Computed properties for Swiper configuration to improve readability and optimization
const swiperModules = [Autoplay, Pagination, Navigation, EffectFade, A11y];

const autoplayConfig = {
  delay: 5000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true
};

const paginationConfig = {
  clickable: true,
  el: '.swiper-pagination',
  dynamicBullets: true,
  renderBullet: (index, className) => {
    return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`;
  }
};

const navigationConfig = {
  prevEl: '.swiper-button-prev',
  nextEl: '.swiper-button-next',
};

const a11yConfig = {
  prevSlideMessage: 'Previous slide',
  nextSlideMessage: 'Next slide',
  firstSlideMessage: 'This is the first slide',
  lastSlideMessage: 'This is the last slide',
  paginationBulletMessage: 'Go to slide {{index}}'
};

const swiperInstance = ref(null);
const currentSlideIndex = ref(0);
const sliderContainer = ref(null);
const isLoading = ref(true);
const observer = ref(null);

// WebP conversion helper function
const convertToWebP = (imagePath) => {
  // If the image is already webp, return it as is
  if (imagePath.toLowerCase().endsWith('.webp')) {
    return imagePath;
  }

  // This is a mock function - in production you would have actual WebP versions
  // This assumes you have corresponding WebP files for each image
  return imagePath.replace(/\.(jpe?g|png)$/i, '.webp');
};

onMounted(() => {
  // Use requestIdleCallback for non-critical operations
  const idleCallback = 'requestIdleCallback' in window ?
    window.requestIdleCallback :
    (callback) => setTimeout(callback, 1);

  nextTick(() => {
    isLoading.value = false;

    // Set up Intersection Observer for performance optimization
    idleCallback(() => {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && swiperInstance.value) {
            // Resume autoplay when visible
            swiperInstance.value.autoplay.start();
          } else if (swiperInstance.value) {
            // Pause autoplay when not visible
            swiperInstance.value.autoplay.stop();
          }
        });
      }, {
        threshold: 0.25,
        rootMargin: '0px 0px 200px 0px' // Slightly expanded detection area
      });

      if (sliderContainer.value) {
        observer.value.observe(sliderContainer.value);
      }
    });

    // Apply the zoom effect to the first slide
    if (swiperInstance.value) {
      const activeSlide = swiperInstance.value.slides[swiperInstance.value.activeIndex];
      if (activeSlide) {
        const img = activeSlide.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1.05)';
        }
      }
    }
  });
});

onBeforeUnmount(() => {
  // Clean up observer
  if (observer.value && sliderContainer.value) {
    observer.value.unobserve(sliderContainer.value);
    observer.value.disconnect();
  }
});

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;

  // Update current slide index when slide changes
  swiper.on('slideChange', () => {
    currentSlideIndex.value = swiper.realIndex;

    // Apply zoom effect to the active slide
    nextTick(() => {
      const slides = swiper.slides;
      slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img) {
          if (index === swiper.activeIndex) {
            img.style.transform = 'scale(1.05)';
          } else {
            img.style.transform = 'scale(1)';
          }
        }
      });
    });
  });
};

const nextSlide = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};

const prevSlide = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev();
  }
};

const goToSlide = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(index);
  }
};
</script>

<style>
/* Preload critical resources for better LCP */
:root {
  --swiper-theme-color: #FFD700;
}

/* Use :where pseudo-class for lower specificity */
:where(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.7;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  transition: all 0.3s ease;
}

:where(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #FFD700;
  width: 12px;
  height: 12px;
}

/* Remove default focus outline and add custom styling */
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.5);
}

/* Performance optimized animations */
@media (prefers-reduced-motion: no-preference) {
  .swiper-slide img {
    will-change: transform;
    backface-visibility: hidden;
  }
}

/* Support users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .swiper-slide img {
    transition: none !important;
    transform: none !important;
  }
}
</style>
