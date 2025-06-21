<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only bg-yellow-400 text-black px-4 py-2 absolute z-50 left-2 top-2 rounded"
    >Lewati ke Konten Utama</a
  >
  <header
    class="sticky top-0 left-0 w-full z-50 transition-all duration-300 shadow-header"
    :class="[headerStore.headerClasses, { 'gradient-header': isScrolled }]"
    role="banner"
    aria-label="Navigasi Utama Barbershop"
  >
    <nav
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      role="navigation"
      aria-label="Menu Navigasi"
    >
      <!-- Logo and Navigation Section -->
      <div class="flex flex-wrap items-center justify-between h-auto py-2 gap-y-2">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="flex items-center gap-1.5 group hover-link focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="CUT PROJECT - Beranda"
          @click="trackLogoClick"
        >
          <span class="text-base font-medium text-gray-300 group-hover:text-white transition-colors"
            >CUT</span
          >
          <img
            :src="logoSrc"
            alt="Logo CUT PROJECT Barbershop"
            class="h-6 w-6 object-contain group-hover:scale-105 transition-transform duration-300"
            @error="handleLogoError"
            loading="eager"
          />
          <span class="text-base font-medium text-gray-300 group-hover:text-white transition-colors"
            >PROJECT</span
          >
        </RouterLink>

        <!-- Desktop Search -->
        <div class="hidden lg:flex flex-1 justify-center mx-4">
          <div class="relative w-64 group" role="search">
            <label for="desktop-search" class="sr-only">Cari layanan atau menu</label>
            <input
              id="desktop-search"
              type="search"
              v-model="desktopSearchQuery"
              class="search-input"
              placeholder="Cari layanan..."
              autocomplete="off"
              spellcheck="false"
              :aria-expanded="showDesktopSearchResults"
              :aria-haspopup="'listbox'"
              :aria-controls="showDesktopSearchResults ? 'desktop-search-listbox' : undefined"
              :aria-activedescendant="activeDesktopSearchResultId"
              @focus="handleDesktopSearchFocus"
              @blur="handleDesktopSearchBlur"
              @keydown="handleDesktopSearchKeydown"
              @input="handleDesktopSearchInput"
            />
            <!-- Tombol X untuk clear desktop search -->
            <button
              v-if="desktopSearchQuery.length > 0"
              type="button"
              @click="desktopSearchQuery = ''"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-zinc-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              aria-label="Bersihkan pencarian"
              tabindex="0"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
            <MagnifyingGlassIcon
              class="absolute top-1/2 left-3 w-4 h-4 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200 transform -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />

            <!-- Desktop Search Results -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <ul
                v-if="showDesktopSearchResults"
                id="desktop-search-listbox"
                class="absolute top-full left-0 right-0 mt-2 bg-zinc-800/95 backdrop-blur rounded-xl shadow-lg border border-zinc-700/50 max-h-80 overflow-y-auto scrollbar-custom z-50"
                role="listbox"
                aria-label="Hasil pencarian menu dan layanan"
              >
                <li
                  v-for="(result, index) in desktopSearchResults"
                  :id="getDesktopSearchResultId(index)"
                  :key="result.id"
                  class="px-4 py-3 text-white hover:bg-zinc-700/60 cursor-pointer transition-all duration-200 border-b border-zinc-700/30 last:border-b-0"
                  :class="{
                    'bg-zinc-700/80': selectedDesktopSearchIndex === index,
                  }"
                  :aria-selected="selectedDesktopSearchIndex === index"
                  role="option"
                  @mousedown.prevent="selectDesktopSearchResult(result)"
                  @mouseenter="selectedDesktopSearchIndex = index"
                >
                  <div class="flex items-center">
                    <div class="p-2 rounded-lg bg-yellow-400/10 mr-3">
                      <component
                        v-if="result.icon && icons[result.icon]"
                        :is="icons[result.icon]"
                        class="w-4 h-4 text-yellow-400 flex-shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-sm">{{ result.name }}</div>
                      <div class="text-xs text-gray-400 mt-1">
                        {{ result.category || 'Layanan' }}
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  v-if="desktopSearchResults.length === 0 && desktopSearchQuery.length > 0"
                  class="px-4 py-6 text-gray-400 text-center text-sm"
                  role="option"
                  aria-disabled="true"
                >
                  <div class="flex flex-col items-center space-y-2">
                    <MagnifyingGlassIcon class="w-8 h-8 text-gray-500" aria-hidden="true" />
                    <div>Tidak ada hasil untuk "{{ desktopSearchQuery }}"</div>
                  </div>
                </li>
              </ul>
            </Transition>
          </div>
        </div>

        <!-- Desktop nav links -->
        <nav
          class="hidden lg:flex space-x-2 xl:space-x-4 items-center"
          role="navigation"
          aria-label="Navigasi utama"
        >
          <RouterLink
            v-for="(item, index) in navigationMenuWithoutLogin"
            :key="`nav-${item.name}-${index}`"
            :to="item.link"
            class="relative text-base font-medium text-gray-300 hover:text-white transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-zinc-800/50"
            :class="{ 'text-yellow-400': isActiveRoute(item.link) }"
            @click="trackNavClick(item.name)"
          >
            <span>{{ item.name }}</span>
          </RouterLink>
          <!-- Tampilkan Login hanya jika belum login -->
          <RouterLink
            v-if="!auth.isLoggedIn"
            to="/login"
            class="relative text-base font-medium text-gray-300 hover:text-white transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-zinc-800/50"
            :class="{ 'text-yellow-400': isActiveRoute('/login') }"
          >
            <span>Login</span>
          </RouterLink>
          <!-- Tampilkan Profile jika sudah login -->
          <RouterLink
            v-else
            to="/profile"
            class="relative text-base font-medium text-yellow-400 hover:text-white transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-zinc-800/50"
            :class="{ 'text-yellow-400': isActiveRoute('/profile') }"
          >
            <span>Profile</span>
          </RouterLink>
        </nav>

        <!-- Mobile menu & search buttons -->
        <div class="flex items-center space-x-2 lg:hidden ml-auto z-50">
          <button
            type="button"
            @click="handleMobileSearchToggle"
            class="text-gray-300 hover:text-white p-2.5 rounded-xl hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
            :class="{ 'bg-zinc-800/50 text-yellow-400': isMobileSearchOpen }"
            :aria-expanded="isMobileSearchOpen"
            aria-label="Buka pencarian"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>
          <button
            type="button"
            @click="handleMobileMenuToggle"
            class="text-gray-300 hover:text-white p-2.5 rounded-xl hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
            :class="{ 'bg-zinc-800/50 text-yellow-400': isMobileMenuOpen }"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Buka menu navigasi"
            style="z-index:51"
          >
            <Transition mode="out-in">
              <XMarkIcon v-if="isMobileMenuOpen" class="h-6 w-6" />
              <Bars3Icon v-else class="h-6 w-6" />
            </Transition>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="isMobileMenuOpen"
        class="fixed top-20 left-0 w-full bg-zinc-900/95 backdrop-blur rounded-b-2xl shadow-lg border-t border-zinc-700/50 z-[60] overflow-y-auto"
        style="min-height:calc(100vh - 5rem); max-height:calc(100vh - 5rem);"
        aria-modal="true"
        role="dialog"
        aria-labelledby="mobile-menu-title"
        tabindex="-1"
        ref="mobileMenuRef"
      >
        <div class="py-2">
          <div
            class="px-6 py-4 border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/30 to-zinc-900/30"
          >
            <h3 id="mobile-menu-title" class="text-white text-sm font-semibold flex items-center">
              <Bars3Icon class="w-4 h-4 mr-2 text-yellow-400" />
              Menu Navigasi
            </h3>
          </div>
          <nav class="py-2" aria-label="Navigasi mobile">
            <!-- Tampilkan SEMUA menu utama (kecuali /login) -->
            <RouterLink
              v-for="(item, index) in navigationMenuWithoutLogin"
              :key="`mobile-nav-${item.name}-${index}`"
              :to="item.link"
              class="flex items-center px-6 py-4 text-gray-300 hover:text-white hover:bg-zinc-800/50"
              :class="{ 'text-yellow-400 bg-zinc-800/30 border-r-2 border-yellow-400': isActiveRoute(item.link) }"
              @click="handleMobileNavClick(item.name)"
            >
              <span class="font-medium flex-1">{{ item.name }}</span>
            </RouterLink>
            <!-- Tampilkan Login hanya jika belum login -->
            <RouterLink
              v-if="!auth.isLoggedIn"
              to="/login"
              class="flex items-center px-6 py-4 text-gray-300 hover:text-white hover:bg-zinc-800/50"
              :class="{ 'text-yellow-400 bg-zinc-800/30 border-r-2 border-yellow-400': isActiveRoute('/login') }"
              @click="handleMobileNavClick('Login')"
            >
              <span class="font-medium flex-1">Login</span>
            </RouterLink>
            <!-- Tampilkan Profile jika sudah login -->
            <RouterLink
              v-else
              to="/profile"
              class="flex items-center px-6 py-4 text-yellow-400 hover:text-white hover:bg-zinc-800/50"
              :class="{ 'text-yellow-400 bg-zinc-800/30 border-r-2 border-yellow-400': isActiveRoute('/profile') }"
              @click="handleMobileNavClick('Profile')"
            >
              <span class="font-medium flex-1">Profile</span>
            </RouterLink>
          </nav>
        </div>
      </div>

      <!-- Mobile menu backdrop -->
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black/40 mobile-menu-backdrop z-40"
        @click="closeMobileMenu"
        aria-hidden="true"
      ></div>

      <!-- Mobile search -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileSearchOpen" class="lg:hidden pb-4 px-1">
          <div class="relative group">
            <label for="mobile-search" class="sr-only">Cari layanan atau menu</label>
            <MagnifyingGlassIcon
              class="absolute top-1/2 left-4 w-5 h-5 text-gray-400 transform -translate-y-1/2 z-10 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="mobile-search"
              v-model="mobileSearchQuery"
              ref="mobileSearchInput"
              type="search"
              class="search-input mobile-search-input"
              placeholder="Cari layanan..."
              autocomplete="off"
              spellcheck="false"
              :aria-expanded="showMobileSearchResults"
              :aria-haspopup="'listbox'"
              :aria-controls="showMobileSearchResults ? 'mobile-search-listbox' : undefined"
              :aria-activedescendant="activeMobileSearchResultId"
              @focus="handleMobileSearchFocus"
              @blur="handleMobileSearchBlur"
              @keydown="handleMobileSearchKeydown"
              @input="handleMobileSearchInput"
            />
            <button
              type="button"
              @click="closeMobileSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-zinc-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              aria-label="Tutup pencarian"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Mobile Search Results -->
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <ul
              v-if="showMobileSearchResults"
              id="mobile-search-listbox"
              class="mt-3 bg-zinc-800/95 backdrop-blur rounded-xl shadow-2xl border border-zinc-700/50 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent"
              role="listbox"
              aria-label="Hasil pencarian menu dan layanan"
            >
              <li
                v-for="(result, index) in mobileSearchResults"
                :id="getMobileSearchResultId(index)"
                :key="result.id"
                class="px-4 py-4 text-white hover:bg-zinc-700/60 cursor-pointer transition-all duration-200 border-b border-zinc-700/30 last:border-b-0"
                :class="{
                  'bg-zinc-700/80': selectedMobileSearchIndex === index,
                }"
                :aria-selected="selectedMobileSearchIndex === index"
                role="option"
                @mousedown.prevent="selectMobileSearchResult(result)"
                @mouseenter="selectedMobileSearchIndex = index"
              >
                <div class="font-medium flex items-center">
                  <div class="p-2 rounded-lg bg-yellow-400/10 mr-3 transition-colors">
                    <component
                      v-if="result.icon && icons[result.icon]"
                      :is="icons[result.icon]"
                      class="w-5 h-5 text-yellow-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="flex-1">
                    <div class="font-medium">{{ result.name }}</div>
                    <div class="text-xs text-gray-400 mt-1">{{ result.category || 'Layanan' }}</div>
                  </div>
                  <ChevronRightIcon class="w-5 h-5 text-gray-500" aria-hidden="true" />
                </div>
              </li>
              <li
                v-if="mobileSearchResults.length === 0 && mobileSearchQuery.length > 0"
                class="px-4 py-8 text-gray-400 text-center"
                role="option"
                aria-disabled="true"
              >
                <div class="flex flex-col items-center space-y-3">
                  <MagnifyingGlassIcon class="w-10 h-10 text-gray-500" aria-hidden="true" />
                  <div>Tidak ada hasil ditemukan untuk "{{ mobileSearchQuery }}"</div>
                </div>
              </li>
            </ul>
          </Transition>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHeaderStore } from '@/stores/client/header'
import { useNavigationStore } from '@/stores/client/navigation'
import { useSearchStore } from '@/stores/client/search'
import { useAuthStore } from '@/stores/auth' 
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
  HomeIcon,
  ScissorsIcon,
  PhotoIcon,
  InformationCircleIcon,
  StarIcon,
  CalendarIcon,
  PhoneIcon,
} from '@heroicons/vue/24/outline'

// ICONS MAP
const icons = {
  HomeIcon,
  ScissorsIcon,
  PhotoIcon,
  InformationCircleIcon,
  StarIcon,
  CalendarIcon,
  PhoneIcon,
}

// STORES
const router = useRouter()
const route = useRoute()
const headerStore = useHeaderStore()
const navigationStore = useNavigationStore()
const searchStore = useSearchStore()
const auth = useAuthStore() 

// STATE
const logoSrc = ref(new URL('@/assets/client/images/logo/logo.webp', import.meta.url).href)
const logoLoaded = ref(false)
const mobileSearchInput = ref(null)
const mobileMenuRef = ref(null)
const scrollHandler = ref(null)

const desktopSearchQuery = ref('')
const mobileSearchQuery = ref('')
const desktopSearchFocused = ref(false)
const mobileSearchFocused = ref(false)
const selectedDesktopSearchIndex = ref(-1)
const selectedMobileSearchIndex = ref(-1)

const isMobileMenuOpen = computed(() => headerStore.isMobileMenuOpen)
const isMobileSearchOpen = computed(() => headerStore.isMobileSearchOpen)
const navigationMenu = computed(() => navigationStore.menu)
const navigationMenuWithoutLogin = computed(() =>
  navigationMenu.value.filter(item => item.link !== '/login')
)
//ref untuk isScrolled
const isScrolled = ref(false)

// SEARCH DATA
const searchData = computed(() => [
  {
    id: 1,
    name: 'Haircut Classic',
    category: 'Layanan',
    path: '/services',
    keywords: ['potong', 'rambut', 'haircut', 'classic'],
    icon: 'ScissorsIcon',
  },
  {
    id: 2,
    name: 'Beard Styling',
    category: 'Layanan',
    path: '/services',
    keywords: ['jenggot', 'styling', 'beard'],
    icon: 'ScissorsIcon',
  },
  {
    id: 3,
    name: 'Hair Wash',
    category: 'Layanan',
    path: '/services',
    keywords: ['cuci', 'keramas', 'wash', 'shampoo'],
    icon: 'ScissorsIcon',
  },
  {
    id: 4,
    name: 'Hair Coloring',
    category: 'Layanan',
    path: '/services',
    keywords: ['warna', 'cat', 'coloring', 'pewarna'],
    icon: 'ScissorsIcon',
  },
  {
    id: 5,
    name: 'Hair Treatment',
    category: 'Layanan',
    path: '/services',
    keywords: ['perawatan', 'treatment', 'vitamin'],
    icon: 'ScissorsIcon',
  },
  ...navigationMenu.value.map((item, idx) => ({
    id: `menu-${idx}`,
    name: item.name,
    category: 'Menu',
    path: item.link,
    keywords: [item.name.toLowerCase()],
    icon: item.icon,
  })),
])

// SEARCH RESULTS
const desktopSearchResults = computed(() =>
  searchStore.performSearch(searchData.value, desktopSearchQuery.value),
)
const mobileSearchResults = computed(() =>
  searchStore.performSearch(searchData.value, mobileSearchQuery.value),
)
const showDesktopSearchResults = computed(
  () => desktopSearchFocused.value && desktopSearchQuery.value.length > 0,
)
const showMobileSearchResults = computed(
  () => mobileSearchFocused.value && mobileSearchQuery.value.length > 0,
)

// ACCESSIBILITY: id and aria
const getDesktopSearchResultId = (idx) => `desktop-search-result-${idx}`
const getMobileSearchResultId = (idx) => `mobile-search-result-${idx}`
const activeDesktopSearchResultId = computed(() =>
  selectedDesktopSearchIndex.value >= 0
    ? getDesktopSearchResultId(selectedDesktopSearchIndex.value)
    : null,
)
const activeMobileSearchResultId = computed(() =>
  selectedMobileSearchIndex.value >= 0
    ? getMobileSearchResultId(selectedMobileSearchIndex.value)
    : null,
)

// ROUTE CHECK
const isActiveRoute = (path) => navigationStore.isActiveRoute(path)

// === SEARCH HANDLERS ===
const handleDesktopSearchFocus = () => {
  desktopSearchFocused.value = true
  selectedDesktopSearchIndex.value = -1
}

const handleDesktopSearchBlur = () => {
  setTimeout(() => (desktopSearchFocused.value = false), 150)
}

const handleDesktopSearchInput = () => {
  selectedDesktopSearchIndex.value = -1
}

const handleDesktopSearchKeydown = (e) => {
  const results = desktopSearchResults.value
  if (!results.length) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      selectedDesktopSearchIndex.value = Math.min(
        selectedDesktopSearchIndex.value + 1,
        results.length - 1,
      )
      scrollSearchOptionIntoView('desktop', selectedDesktopSearchIndex.value)
      break
    case 'ArrowUp':
      e.preventDefault()
      selectedDesktopSearchIndex.value = Math.max(selectedDesktopSearchIndex.value - 1, -1)
      if (selectedDesktopSearchIndex.value >= 0) {
        scrollSearchOptionIntoView('desktop', selectedDesktopSearchIndex.value)
      }
      break
    case 'Enter':
      e.preventDefault()
      if (selectedDesktopSearchIndex.value >= 0) {
        selectDesktopSearchResult(results[selectedDesktopSearchIndex.value])
      } else if (results.length > 0) {
        selectDesktopSearchResult(results[0])
      }
      break
    case 'Escape':
      desktopSearchFocused.value = false
      selectedDesktopSearchIndex.value = -1
      e.target.blur()
      break
  }
}

const selectDesktopSearchResult = (result) => {
  router.push(result.path)
  searchStore.addToRecentSearches(result.name)
  desktopSearchQuery.value = ''
  desktopSearchFocused.value = false
  selectedDesktopSearchIndex.value = -1
  headerStore.closeAllMobileOverlays()
  trackSearchClick(result.name)
}

// === MOBILE SEARCH HANDLERS ===
const handleMobileSearchFocus = () => {
  mobileSearchFocused.value = true
  selectedMobileSearchIndex.value = -1
}

const handleMobileSearchBlur = () => {
  setTimeout(() => (mobileSearchFocused.value = false), 150)
}

const handleMobileSearchInput = () => {
  selectedMobileSearchIndex.value = -1
}

const handleMobileSearchKeydown = (e) => {
  const results = mobileSearchResults.value
  if (!results.length) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      selectedMobileSearchIndex.value = Math.min(
        selectedMobileSearchIndex.value + 1,
        results.length - 1,
      )
      scrollSearchOptionIntoView('mobile', selectedMobileSearchIndex.value)
      break
    case 'ArrowUp':
      e.preventDefault()
      selectedMobileSearchIndex.value = Math.max(selectedMobileSearchIndex.value - 1, -1)
      if (selectedMobileSearchIndex.value >= 0) {
        scrollSearchOptionIntoView('mobile', selectedMobileSearchIndex.value)
      }
      break
    case 'Enter':
      e.preventDefault()
      if (selectedMobileSearchIndex.value >= 0) {
        selectMobileSearchResult(results[selectedMobileSearchIndex.value])
      } else if (results.length > 0) {
        selectMobileSearchResult(results[0])
      }
      break
    case 'Escape':
      closeMobileSearch()
      break
  }
}

const selectMobileSearchResult = (result) => {
  router.push(result.path)
  searchStore.addToRecentSearches(result.name)
  closeMobileSearch()
  trackSearchClick(result.name)
}

// === MOBILE MENU HANDLERS ===

// === OVERLAY & TOGGLE HANDLERS ===
const handleMobileMenuToggle = async () => {
  headerStore.toggleMobileMenu()
  if (headerStore.isMobileMenuOpen) {
    headerStore.setMobileSearchOpen(false)
    mobileSearchFocused.value = false
    mobileSearchQuery.value = ''
    await nextTick()
    mobileMenuRef.value?.focus()
  }
}

const handleMobileSearchToggle = async () => {
  headerStore.toggleMobileSearch()
  if (headerStore.isMobileSearchOpen) {
    headerStore.setMobileMenuOpen(false)
    await nextTick()
    mobileSearchInput.value?.focus()
  } else {
    mobileSearchFocused.value = false
    mobileSearchQuery.value = ''
  }
}

const handleMobileNavClick = (name) => {
  headerStore.setMobileMenuOpen(false)
  trackNavClick(name)
}

const closeMobileMenu = () => {
  headerStore.setMobileMenuOpen(false)
}

const closeMobileSearch = () => {
  headerStore.setMobileSearchOpen(false)
  mobileSearchFocused.value = false
  mobileSearchQuery.value = ''
}

// === UTILS ===
const scrollSearchOptionIntoView = (mode, idx) => {
  if (idx < 0) return
  const id = mode === 'desktop' ? getDesktopSearchResultId(idx) : getMobileSearchResultId(idx)
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

const handleLogoError = () => {
  logoSrc.value = '/fallback-logo.png'
  logoLoaded.value = true
}

// === ANALYTICS ===
const trackLogoClick = () => {
  // Analytics tracking untuk logo click
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'logo_click', {
      event_category: 'navigation',
      event_label: 'header_logo',
    })
  }
}

const trackNavClick = (name) => {
  // Analytics tracking untuk navigation click
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'nav_click', {
      event_category: 'navigation',
      event_label: name.toLowerCase(),
    })
  }
}

const trackSearchClick = (term) => {
  // Analytics tracking untuk search click
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search_click', {
      event_category: 'search',
      search_term: term,
    })
  }
}

// === EVENT HANDLERS ===
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
  headerStore.setScrolled(isScrolled.value)
}

const handleClickOutside = (event) => {
  // Close mobile overlays when clicking outside
  if (isMobileMenuOpen.value || isMobileSearchOpen.value) {
    const target = event.target
    const header = document.querySelector('header')

    if (header && !header.contains(target)) {
      headerStore.closeAllMobileOverlays()
      mobileSearchFocused.value = false
      mobileSearchQuery.value = ''
    }
  }
}

const handleKeydown = (event) => {
  // Global keyboard shortcuts
  if (event.key === 'Escape') {
    headerStore.closeAllMobileOverlays()
    desktopSearchFocused.value = false
    mobileSearchFocused.value = false
  }

  // Search shortcut (Ctrl/Cmd + K)
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()
    if (window.innerWidth >= 1024) {
      document.getElementById('desktop-search')?.focus()
    } else {
      handleMobileSearchToggle()
    }
  }
}

// === LIFECYCLE ===
onMounted(() => {
  // Scroll handler dengan throttling
  let ticking = false
  scrollHandler.value = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', scrollHandler.value, { passive: true })
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleKeydown)

  navigationStore.setActiveRoute(route.path)

  // Preload logo dengan error handling
  if (logoSrc.value) {
    const img = new Image()
    img.src = logoSrc.value
    img.onload = () => (logoLoaded.value = true)
    img.onerror = handleLogoError
  }
})

onBeforeUnmount(() => {
  if (scrollHandler.value) {
    window.removeEventListener('scroll', scrollHandler.value)
  }
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeydown)
})

// Route change handler: cleanup state
watch(
  () => route.path,
  () => {
    navigationStore.setActiveRoute(route.path)
    headerStore.closeAllMobileOverlays()

    // Reset search states
    desktopSearchQuery.value = ''
    mobileSearchQuery.value = ''
    desktopSearchFocused.value = false
    mobileSearchFocused.value = false
    selectedDesktopSearchIndex.value = -1
    selectedMobileSearchIndex.value = -1
  },
)

// Watch for mobile menu changes to manage focus
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      mobileMenuRef.value?.focus()
    })
  }
})

// Watch for mobile search changes to manage focus
watch(isMobileSearchOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      mobileSearchInput.value?.focus()
    })
  }
})
</script>

<style scoped>
.hover-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  transform: scaleX(0);
  transition: transform var(--transition-base) var(--transition-timing);
  transform-origin: right;
}

.hover-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Search result hover effect */
.search-result-item {
  position: relative;
  overflow: hidden;
}

.search-result-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.1), transparent);
  transition: left var(--transition-slow) var(--transition-timing);
}

.search-result-item:hover::before {
  left: 100%;
}

/* Logo loading state */
.logo-container {
  position: relative;
}

.logo-loading {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Hide default clear (X) button in search input for all browsers */
input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}
input[type='search']::-ms-clear {
  display: none;
}
input[type='search']::-o-clear {
  display: none;
}
input[type='search']::-moz-clear {
  display: none;
}
input[type='search']::-webkit-search-decoration {
  display: none;
}
</style>
