import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/styles/main.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons'

// Add icons to library
library.add(faInstagram, faWhatsapp, faTiktok)

// Enhanced router guards for SEO and performance
router.beforeEach((to, from, next) => {
  // Update document title for SEO
  document.title = to.meta?.title ? `${to.meta.title} | CUT PROJECT` : 'CUT PROJECT'

  // Update meta description for SEO
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta?.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }

  // Performance mark for navigation timing
  if ('performance' in window && 'mark' in window.performance) {
    window.performance.mark(`navigation-${to.name}-start`)
  }

  next()
})

router.afterEach((to) => {
  // Performance measurement for navigation complete
  if ('performance' in window && 'mark' in window.performance) {
    window.performance.mark(`navigation-${to.name}-end`)
    window.performance.measure(
      `navigation-${to.name}`,
      `navigation-${to.name}-start`,
      `navigation-${to.name}-end`,
    )
  }

  // Reinitialize AOS after route change for better animation consistency
  setTimeout(() => {
    AOS.refresh()
  }, 100)
})

// Create Vue app
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)

// Register global components
app.component('font-awesome-icon', FontAwesomeIcon)

// Global error handler for better debugging
app.config.errorHandler = (err, instance, info) => {
  console.error('Global Vue Error:', {
    error: err,
    component: instance?.$options?.name || 'Unknown',
    info: info,
    timestamp: new Date().toISOString(),
  })

  // You can integrate with error reporting services here
  // Example: Sentry.captureException(err, { extra: { info, component: instance } })
}

// Performance monitoring setup
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Monitor navigation timing
      if (entry.entryType === 'measure' && entry.name.startsWith('navigation-')) {
        console.log(`🚀 Navigation: ${entry.name} completed in ${Math.round(entry.duration)}ms`)
      }

      // Monitor largest contentful paint
      if (entry.entryType === 'largest-contentful-paint') {
        console.log(`🎨 LCP: ${Math.round(entry.startTime)}ms`)
      }

      // Monitor first input delay
      if (entry.entryType === 'first-input') {
        console.log(`⚡ FID: ${Math.round(entry.processingStart - entry.startTime)}ms`)
      }
    }
  })

  // Observe multiple performance metrics
  try {
    observer.observe({ entryTypes: ['measure', 'largest-contentful-paint', 'first-input'] })
  } catch {
    // Fallback for browsers that don't support all entry types
    observer.observe({ entryTypes: ['measure'] })
  }
}

// Initialize AOS with optimized settings
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 50,
  delay: 0,
  // Disable on mobile for better performance
  disable: window.innerWidth < 768,
})

// Mount the app
app.mount('#app')
