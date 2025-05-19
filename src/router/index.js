import { createRouter, createWebHistory } from 'vue-router'

// Import komponen halaman
import Home from '@/views/HomeView.vue'
import Gallery from '@/views/GalleryView.vue'
import About from '@/views/AboutView.vue'
import Contact from '@/views/ContactView.vue'
import Reservation from '@/views/ReservationView.vue'
import Service from '@/views/ServiceView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Service },
  { path: '/gallery', component: Gallery },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/reservation', component: Reservation },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
