import { createRouter, createWebHistory } from 'vue-router'

// 📁 Halaman Utama (Client)
import Home from '@/views/client/HomeView.vue'
import Gallery from '@/views/client/GalleryView.vue'
import About from '@/views/client/AboutView.vue'
import Contact from '@/views/client/ContactView.vue'
import Reservation from '@/views/client/ReservationView.vue'
import Services from '@/views/client/ServiceView.vue'
import Review from '@/views/client/ReviewViews.vue'

// 📁 Halaman Autentikasi
import Login from '@/views/auth/LoginView.vue'
import Register from '@/views/auth/RegisterView.vue'

const routes = [
  // Halaman Utama
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      description: 'Selamat datang di CUT PROJECT - barbershop terbaik untuk gaya Anda.',
    },
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: {
      title: 'Services',
      description: 'Layanan potong rambut, shaving, dan styling eksklusif di CUT PROJECT.',
    },
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
    meta: {
      title: 'Gallery',
      description: 'Lihat hasil potongan terbaik dari tim barber profesional kami.',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About',
      description: 'Kenali tim dan filosofi di balik CUT PROJECT.',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact',
      description: 'Hubungi CUT PROJECT untuk pertanyaan dan kerja sama.',
    },
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
    meta: {
      title: 'Review',
      description: 'Lihat ulasan dan pengalaman pelanggan CUT PROJECT.',
    },
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: Reservation,
    meta: {
      title: 'Reservation',
      description: 'Pesan jadwal potong rambut Anda sekarang juga.',
    },
  },

  // Autentikasi
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      description: 'Masuk ke akun CutsProject Anda.',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      description: 'Daftar akun baru untuk membuat reservasi di CutsProject.',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/auth/ProfileView.vue'),
    meta: {
      title: 'Profil Saya',
      description: 'Lihat dan kelola data profil Anda di CutsProject.',
    },
  },

  // Halaman Admin
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/DashboardAdminView.vue'),
    meta: {
      title: 'Dashboard Admin',
      description: 'Halaman utama admin dashboard.',
    },
  },
  {
    path: '/admin/reservations',
    name: 'AdminReservations',
    component: () => import('@/views/admin/ReservationAdminView.vue'),
    meta: {
      title: 'Data Reservasi',
      description: 'Kelola semua data reservasi pelanggan.',
    },
  },
  {
    path: '/admin/services',
    name: 'AdminServices',
    component: () => import('@/views/admin/ServiceAdminView.vue'),
    meta: {
      title: 'Layanan Admin',
      description: 'Kelola layanan potong rambut.',
    },
  },
  {
    path: '/admin/gallery',
    name: 'AdminGallery',
    component: () => import('@/views/admin/GalleryAdminView.vue'),
    meta: {
      title: 'Galeri Admin',
      description: 'Kelola konten galeri.',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      top: 0,
      left: 0,
      behavior: 'auto',
      immediate: true,
    }
  },
})

// Reset scroll saat pindah halaman
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
  next()
})

// Update judul halaman
router.afterEach((to) => {
  document.title = to.meta.title || 'CutsProject'
})

export default router
