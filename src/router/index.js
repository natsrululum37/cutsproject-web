import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/HomeView.vue'
import Gallery from '@/views/GalleryView.vue'
import About from '@/views/AboutView.vue'
import Contact from '@/views/ContactView.vue'
import Reservation from '@/views/ReservationView.vue'
import Services from '@/views/ServiceView.vue'
import Review from '@/views/ReviewViews.vue' // Pastikan nama file dan import sama persis!

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      description: 'Selamat datang di CUT PROJECT - barbershop terbaik untuk gaya Anda.'
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: {
      title: 'Services',
      description: 'Layanan potong rambut, shaving, dan styling eksklusif di CUT PROJECT.'
    }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
    meta: {
      title: 'Gallery',
      description: 'Lihat hasil potongan terbaik dari tim barber profesional kami.'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About',
      description: 'Kenali tim dan filosofi di balik CUT PROJECT.'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact',
      description: 'Hubungi CUT PROJECT untuk pertanyaan dan kerja sama.'
    }
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
    meta: {
      title: 'Review',
      description: 'Lihat ulasan dan pengalaman pelanggan CUT PROJECT.'
    }
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: Reservation,
    meta: {
      title: 'Reservation',
      description: 'Pesan jadwal potong rambut Anda sekarang juga.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
