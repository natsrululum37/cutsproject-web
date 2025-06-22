import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// 📁 Halaman Utama (Client)
import Home from '@/views/client/HomeView.vue'
import Gallery from '@/views/client/GalleryView.vue'
import About from '@/views/client/AboutView.vue'
import Contact from '@/views/client/ContactView.vue'
import Reservation from '@/views/client/ReservationView.vue'
import Services from '@/views/client/ServiceView.vue'
import Review from '@/views/client/ReviewViews.vue'
import ProfileView from '@/views/auth/ProfileView.vue'

// 📁 Halaman Autentikasi
import Login from '@/views/auth/LoginView.vue'
import Register from '@/views/auth/RegisterView.vue'

// 📁 Halaman Admin
import AdminLayout from '@/views/admin/AdminLayout.vue'
import DashboardAdminView from '@/views/admin/DashboardAdminView.vue'
import GalleryAdminView from '@/views/admin/GalleryAdminView.vue'
import ServiceAdminView from '@/views/admin/ServiceAdminView.vue'
import TeamAdminView from '@/views/admin/TeamAdminView.vue'
import ManageAdminView from '@/views/admin/ManageAdminView.vue'

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
    name: 'ProfileView',
    component: ProfileView,
    meta: {
      title: 'Profil Saya',
      description: 'Lihat dan kelola data profil Anda di CutsProject.',
      requiresAuth: true,
    },
  },

  // Halaman Admin
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: DashboardAdminView,
        meta: {
          title: 'Dashboard Admin',
          description: 'Halaman utama admin dashboard.',
        },
      },
      {
        path: 'gallery',
        name: 'AdminGallery',
        component: GalleryAdminView,
        meta: {
          title: 'Galeri Admin',
          description: 'Kelola konten galeri.',
        },
      },
      {
        path: 'services',
        name: 'AdminServices',
        component: ServiceAdminView,
        meta: {
          title: 'Layanan Admin',
          description: 'Kelola layanan potong rambut.',
        },
      },
      {
        path: 'team',
        name: 'AdminTeam',
        component: TeamAdminView,
        meta: {
          title: 'Tim Admin',
          description: 'Kelola data dan informasi tim.',
        },
      },
      {
        path: 'manage-admin',
        name: 'ManageAdmin',
        component: ManageAdminView,
        meta: {
          title: 'Kelola Admin',
          description: 'Kelola akun dan hak akses admin lain.',
        },
      },
    ],
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
  const auth = useAuthStore()
  // Jika route butuh login dan belum login, redirect ke login
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/login')
    return
  }
  // Jika sudah login, blokir akses ke login/register
  if ((to.path === '/login' || to.path === '/register') && auth.isLoggedIn) {
    next('/profile')
    return
  }
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
