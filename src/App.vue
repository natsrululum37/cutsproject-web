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

    <!-- Lazy load Header -->
    <Header />

    <main
      id="main-content"
      class="flex-grow"
      role="main"
      :aria-live="isRouteChanging ? 'polite' : 'off'"
      @focus="handleMainFocus"
    >
      <!-- Best practice: router-view slot with transition -->
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Lazy load Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'

// Lazy load Header and Footer
const Header = defineAsyncComponent(() => import('./components/HeaderComponent.vue'))
const Footer = defineAsyncComponent(() => import('./components/FooterComponent.vue'))

// State
const isLayoutStable = ref(false)
const isRouteChanging = ref(false)
const route = useRoute()

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

// Transition event handlers for layout stability (optional)
onMounted(() => {
  nextTick(() => {
    isLayoutStable.value = true
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
