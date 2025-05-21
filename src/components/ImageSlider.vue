<template>
  <div ref="sliderContainer" class="w-full max-w-full mx-auto py-8 relative">
    <!-- Main Slider Container -->
    <div class="relative rounded-lg overflow-hidden shadow-xl">
      <div class="relative">
        <!-- Custom Navigation Buttons with Heroicons -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon class="h-6 w-6 text-white" />
        </button>

        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRightIcon class="h-6 w-6 text-white" />
        </button>
      </div>

      <!-- Swiper Component -->
      <swiper
        :modules="[Autoplay, Pagination, Navigation, EffectFade, A11y]"
        :slides-per-view="1"
        :loop="true"
        :effect="'fade'"
        :speed="800"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :pagination="{
          clickable: true,
          el: '.swiper-pagination',
          dynamicBullets: true,
          renderBullet: renderPaginationBullet
        }"
        :navigation="{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }"
        :a11y="{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}'
        }"
        @swiper="onSwiper"
        class="w-full rounded-lg"
      >
        <swiper-slide v-for="(image, index) in images" :key="index">
          <div class="relative w-full h-[550px] overflow-hidden">
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-full object-cover"
              :style="currentSlideIndex === index ? 'transform: scale(1); transition: transform 7s ease;' : ''"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :width="1280"
              :height="720"
            />
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
        <ScissorsIcon class="h-5 w-5 mr-2" />
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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
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

const swiperInstance = ref(null);
const currentSlideIndex = ref(0);
const sliderContainer = ref(null);
const isLoading = ref(true);
const observer = ref(null);

// Render custom pagination bullets for better accessibility
const renderPaginationBullet = (index, className) => {
  return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`;
};

onMounted(() => {
  nextTick(() => {
    isLoading.value = false;

    // Set up Intersection Observer for performance optimization
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
      threshold: 0.25
    });

    if (sliderContainer.value) {
      observer.value.observe(sliderContainer.value);
    }

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

<style scoped>
.swiper-pagination-bullet {
  background: white;
  opacity: 0.7;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  transition: all 0.3s ease;
}

.swiper-pagination-bullet-active {
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
