<template>
  <div
    class="flex flex-col min-h-screen bg-black text-white"
    :class="{ 'layout-stable': isLayoutStable }"
  >
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-yellow-400 focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
      @click="skipToMain"
    >
      Skip to main content
    </a>

    <!-- Slot for content above header (optional) -->
    <slot name="above-main"></slot>

    <!-- Header loaded synchronously -->
    <Header v-if="showHeaderFooter" />

    <main
      id="main-content"
      class="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 min-h-screen"
      role="main"
      :aria-live="isRouteChanging ? 'polite' : 'off'"
      tabindex="-1"
      @focus="handleMainFocus"
    >
      <!-- RouterView with error boundary -->
      <RouterView v-slot="{ Component }">
        <ErrorBoundary>
          <component :is="Component" />
        </ErrorBoundary>
      </RouterView>
    </main>

    <!-- Slot for content below main (optional) -->
    <slot name="below-main"></slot>

    <!-- Footer loaded synchronously -->
    <Footer v-if="showHeaderFooter" />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/HeaderComponent.vue'
import Footer from './components/FooterComponent.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// State
const isLayoutStable = ref(false)
const isRouteChanging = ref(false)
const route = useRoute()

// Improvisasi: Layout dinamis berdasarkan meta route
const showHeaderFooter = ref(true)
watch(
  () => route.meta,
  (meta) => {
    showHeaderFooter.value = meta?.layout !== 'minimal'
  },
  { immediate: true },
)

// Watch hanya untuk keperluan accessibility
watch(
  () => route.path,
  () => {
    isRouteChanging.value = true
    nextTick(() => {
      isRouteChanging.value = false
    })
  },
)

// Accessibility: Skip to main content
const skipToMain = () => {
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.focus()
    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Accessibility: handle main content focus
const handleMainFocus = () => {
  if (isRouteChanging.value) {
    const announcement = `Navigated to ${route.name || route.path}`
    announceToScreenReader(announcement)
  }
}

// Screen reader helper
const announceToScreenReader = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.setAttribute('class', 'sr-only')
  announcement.textContent = message
  document.body.appendChild(announcement)
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Initialize AOS
onMounted(() => {
  nextTick(() => {
    isLayoutStable.value = true
  })
  AOS.init({
    duration: 800,
    once: true,
    mirror: false,
    easing: 'ease-in-out',
    offset: 60,
  })
})
</script>

<style scoped>
/* Fade transition for page change */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
.layout-stable {
  contain: layout style paint;
}
#main-content:focus {
  outline: none;
}
</style>
