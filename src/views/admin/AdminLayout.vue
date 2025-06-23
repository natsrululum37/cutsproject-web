<template>
  <div class="min-h-screen bg-[#111] text-white font-sans">
    <!-- Sidebar Fixed / Drawer -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full w-64 bg-black flex flex-col justify-between shadow-lg z-40 transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0'
      ]"
    >
      <div>
        <!-- Logo Gambar -->
        <div class="p-6 flex items-center justify-center gap-2">
          <span class="text-base font-medium text-gray-300">CUT</span>
          <img
            :src="logoSrc"
            alt="Logo CUT PROJECT Barbershop"
            class="h-8 w-8 object-contain"
            @error="logoSrc = '/fallback-logo.png'"
            loading="eager"
          />
          <span class="text-base font-medium text-gray-300">PROJECT</span>
        </div>
        <!-- Menu -->
        <nav class="space-y-2 px-4 mt-4">
          <router-link to="/admin" class="nav-link flex items-center gap-3" :class="{active: isActive('/admin')}">
            <HomeIcon class="w-5 h-5"/>
            Dashboard
          </router-link>
          <router-link to="/admin/reservasi" class="nav-link flex items-center gap-3" :class="{active: isActive('/admin/reservasi')}">
            <PencilSquareIcon class="w-5 h-5"/>
            Reservasi
          </router-link>
          <router-link to="/admin/gallery" class="nav-link flex items-center gap-3" :class="{active: isActive('/admin/gallery')}">
            <PhotoIcon class="w-5 h-5"/>
            Galeri
          </router-link>
          <router-link to="/admin/services" class="nav-link flex items-center gap-3" :class="{active: isActive('/admin/services')}">
            <ScissorsIcon class="w-5 h-5"/>
            Layanan
          </router-link>
          <router-link to="/admin/testimoni" class="nav-link flex items-center gap-3" :class="{active: isActive('/admin/testimoni')}">
            <ChatBubbleLeftRightIcon class="w-5 h-5"/>
            Testimoni
          </router-link>
          <router-link to="/admin/team" class="nav-link flex items-center gap-3" :class="{active: isActive('/admin/team')}">
            <UsersIcon class="w-5 h-5"/>
            Tim
          </router-link>
          <router-link to="/admin/manage-admin" class="nav-link flex items-center gap-3" :class="{active: isActive('/admin/manage-admin')}">
            <ShieldCheckIcon class="w-5 h-5"/>
            Kelola Admin
          </router-link>
        </nav>
      </div>
    </aside>

    <!-- Overlay untuk sidebar di mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/40 z-30 md:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main Area (margin-left for sidebar) -->
    <div class="md:ml-64 flex flex-col min-h-screen">
      <!-- Header Fixed -->
      <header class="sticky top-0 z-30 flex justify-between items-center px-4 md:px-6 py-4 border-b border-zinc-800 bg-[#1a1a1a]">
        <!-- Tombol menu di mobile -->
        <button
          class="md:hidden mr-2 text-yellow-400 focus:outline-none"
          @click="sidebarOpen = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 class="text-xl md:text-2xl font-bold text-yellow-400 capitalize flex-1">
          {{ pageTitle }}
        </h1>
        <div class="relative">
          <button @click="toggleProfileMenu" class="flex items-center gap-3 focus:outline-none">
            <img :src="admin.avatar" alt="Admin" class="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-yellow-400 object-cover" />
            <span class="font-semibold text-white hidden sm:inline">{{ admin.name }}</span>
          </button>
          <!-- Overlay Profile Menu -->
          <transition name="fade">
            <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
              <div class="p-4 border-b border-zinc-800 text-center">
                <img :src="admin.avatar" alt="Admin" class="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-yellow-400 object-cover" />
                <div class="font-semibold text-white">{{ admin.name }}</div>
                <div class="text-xs text-gray-400">{{ admin.email }}</div>
              </div>
              <button @click="showEditProfile = true; showProfileMenu = false" class="block w-full text-left px-6 py-3 hover:bg-zinc-800 text-yellow-400 font-semibold">Edit Profile</button>
              <button @click="logout" class="block w-full text-left px-6 py-3 hover:bg-zinc-800 text-red-400 font-semibold">Logout</button>
            </div>
          </transition>
        </div>
      </header>

      <!-- Edit Profile Modal -->
      <transition name="fade">
        <div v-if="showEditProfile" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div class="bg-zinc-900 rounded-xl p-8 w-full max-w-md shadow-lg border border-zinc-700">
            <h2 class="text-xl font-bold mb-4 text-yellow-400">Edit Profil Admin</h2>
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div>
                <label class="block text-gray-300 mb-1">Nama</label>
                <input v-model="admin.name" class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Email</label>
                <input v-model="admin.email" type="email" class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Avatar (URL)</label>
                <input v-model="admin.avatar" class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
              </div>
              <div class="flex gap-4 justify-end">
                <button type="button" @click="showEditProfile = false" class="px-6 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold">Batal</button>
                <button type="submit" class="px-6 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </transition>

      <!-- Main Content Scrollable -->
      <main class="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 bg-[#1a1a1a]" style="min-height:calc(100vh-64px)">
        <router-view />
      </main>
    </div>

    <!-- Footer Fixed -->
    <footer class="hidden sm:block fixed bottom-0 left-0 w-full bg-black text-gray-500 text-center py-2 border-t border-gray-700 z-50">
      © 2025 CutsProject
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  PhotoIcon,
  ScissorsIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ShieldCheckIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

axios.interceptors.request.use(config => {
  const auth = useAuthStore()
  if (auth.token && config.url.startsWith('/api/admin')) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

const route = useRoute()
const logoSrc = ref(new URL('@/assets/client/images/logo/logo.webp', import.meta.url).href)
const sidebarOpen = ref(false)

const admin = ref({
  name: '',
  email: '',
  avatar: '',
  photo: ''
})

const showProfileMenu = ref(false)
const showEditProfile = ref(false)
const loadingProfile = ref(false)

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
}

const auth = useAuthStore()
const router = useRouter()

async function fetchAdminProfile() {
  loadingProfile.value = true
  try {
    const res = await axios.get('/api/admin/profile', {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    // Gunakan photo sebagai avatar jika ada
    admin.value = {
      ...res.data,
      avatar: res.data.photo || res.data.avatar || 'https://ui-avatars.com/api/?name=Admin'
    }
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal memuat profil admin', 'error')
    // Jika gagal, logout paksa
    auth.logout()
    router.push('/login')
  } finally {
    loadingProfile.value = false
  }
}

async function saveProfile() {
  try {
    const payload = {
      name: admin.value.name,
      email: admin.value.email,
      photo: admin.value.avatar
    }
    const res = await axios.put('/api/admin/profile', payload, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    admin.value = {
      ...res.data.admin,
      avatar: res.data.admin.photo || res.data.admin.avatar || 'https://ui-avatars.com/api/?name=Admin'
    }
    Swal.fire({
      icon: 'success',
      title: 'Profil berhasil diupdate!',
      timer: 1200,
      showConfirmButton: false
    })
    showEditProfile.value = false
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal update profil', 'error')
  }
}

function logout() {
  auth.logout()
  router.push('/login')
}

function isActive(path) {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

const pageTitle = computed(() => {
  if (route.path.startsWith('/admin/reservasi')) return 'Reservasi'
  if (route.path.startsWith('/admin/gallery')) return 'Galeri'
  if (route.path.startsWith('/admin/services')) return 'Layanan'
  if (route.path.startsWith('/admin/testimoni')) return 'Testimoni'
  if (route.path.startsWith('/admin/team')) return 'Tim'
  if (route.path.startsWith('/admin/manage-admin')) return 'Kelola Admin'
  return 'Dashboard'
})

onMounted(() => {
  fetchAdminProfile()
})
</script>

<style scoped>
.nav-link {
  /* display: block; */
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #d1d5db;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.nav-link.active,
.nav-link.router-link-exact-active {
  background-color: #1f2937;
  color: #facc15;
}
.nav-link:hover {
  background-color: #23272e;
  color: #facc15;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive sidebar */
@media (max-width: 767px) {
  aside {
    width: 80vw !important;
    min-width: 0 !important;
    max-width: 320px !important;
  }
  .md\:ml-64 {
    margin-left: 0 !important;
  }
}
</style>
