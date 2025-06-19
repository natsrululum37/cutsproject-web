import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/client/styles/main.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(faInstagram, faWhatsapp, faTiktok, faUser, faEnvelope, faLock)

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
  // We can still measure performance without logging
  if ('performance' in window && 'mark' in window.performance) {
    window.performance.mark(`navigation-${to.name}-end`)
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

app.use(Toast, {
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  position: 'top-right',
})

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
}

// Performance monitoring setup
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver(() => {})

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
