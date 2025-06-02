<template>
  <header
    class="sticky top-0 left-0 w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-md shadow-md"
    :class="headerStore.headerClasses"
    role="banner"
    aria-label="Main navigation"
  >
    <nav class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8" role="navigation">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="flex items-center space-x-1.5 sm:space-x-2 text-white text-lg sm:text-xl font-bold flex-shrink-0 group focus-visible:ring-2 focus-visible:ring-yellow-400"
          aria-label="CUT PROJECT - Home"
          @click="trackLogoClick"
        >
          <span class="text-sm sm:text-base md:text-lg transition-all group-hover:text-yellow-400"
            >CUT</span
          >
          <div class="relative">
            <img
              :src="logoSrc"
              alt="CUT PROJECT Logo"
              class="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
              width="40"
              height="40"
              loading="eager"
              @load="logoLoaded = true"
              @error="logoSrc = '/fallback-logo.png'"
              :aria-busy="!logoLoaded"
              :class="{ 'animate-pulse-soft': !logoLoaded }"
            />
            <div
              class="absolute inset-0 rounded-full bg-yellow-400/20 scale-0 group-hover:scale-150 transition-all duration-300 -z-10"
              aria-hidden="true"
            ></div>
          </div>
          <span class="text-sm sm:text-base md:text-lg transition-all group-hover:text-yellow-400"
            >PROJECT</span
          >
        </RouterLink>

        <!-- Desktop navigation & search -->
        <div class="hidden lg:flex space-x-6 items-center flex-1 justify-end">
          <!-- Desktop Search -->
          <div class="relative w-48 xl:w-64 group" role="search">
            <label for="desktop-search" class="sr-only">Cari layanan/menu</label>
            <div class="relative">
              <input
                id="desktop-search"
                type="search"
                v-model="desktopSearchQuery"
                class="w-full bg-zinc-800/80 hover:bg-zinc-800/90 text-white text-sm rounded-xl py-2.5 pl-10 pr-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:bg-zinc-700/90 transition-all duration-300 border border-zinc-700/50 focus:border-yellow-400/30"
                placeholder="Cari layanan/menu…"
                autocomplete="off"
                spellcheck="false"
                :aria-autocomplete="'list'"
                :aria-controls="'desktop-search-listbox'"
                :aria-activedescendant="activeDesktopSearchResultId"
                @focus="handleDesktopSearchFocus"
                @blur="handleDesktopSearchBlur"
                @keydown="handleDesktopSearchKeydown"
                @input="handleDesktopSearchInput"
              />
              <MagnifyingGlassIcon
                class="absolute top-1/2 left-3 w-4 h-4 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200 transform -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <!-- Desktop Search Results -->
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 scale-95 translate-y-2"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-2"
            >
              <ul
                v-if="showDesktopSearchResults"
                :id="'desktop-search-listbox'"
                class="absolute top-full mt-3 left-0 w-full bg-zinc-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-700/50 z-50 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent"
                role="listbox"
                aria-label="Hasil pencarian menu dan layanan"
              >
                <li
                  v-for="(result, index) in desktopSearchResults"
                  :id="getDesktopSearchResultId(index)"
                  :key="result.id"
                  class="px-4 py-3 text-white hover:bg-zinc-800/60 cursor-pointer transition-all duration-200 border-b border-zinc-700/30 last:border-b-0 group/item"
                  :class="{
                    'bg-zinc-800/80 border-yellow-400/20': selectedDesktopSearchIndex === index,
                  }"
                  :aria-selected="selectedDesktopSearchIndex === index"
                  role="option"
                  @mousedown.prevent="selectDesktopSearchResult(result)"
                  @mouseenter="selectedDesktopSearchIndex = index"
                >
                  <div class="font-medium flex items-center">
                    <div
                      class="p-1.5 rounded-lg bg-yellow-400/10 mr-3 group-hover/item:bg-yellow-400/20 transition-colors"
                    >
                      <component
                        v-if="result.icon && icons[result.icon]"
                        :is="icons[result.icon]"
                        class="w-4 h-4 text-yellow-400 flex-shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="flex-1">
                      <div class="font-medium">{{ result.name }}</div>
                      <div class="text-xs text-gray-400 mt-0.5">
                        {{ result.category || 'Layanan' }}
                      </div>
                    </div>
                    <ChevronRightIcon
                      class="w-4 h-4 text-gray-500 opacity-0 group-hover/item:opacity-100 transition-all duration-200"
                      aria-hidden="true"
                    />
                  </div>
                </li>
                <li
                  v-if="desktopSearchResults.length === 0 && desktopSearchQuery.length > 0"
                  class="px-4 py-6 text-gray-400 text-center"
                  role="option"
                  aria-disabled="true"
                >
                  <div class="flex flex-col items-center space-y-2">
                    <MagnifyingGlassIcon class="w-8 h-8 text-gray-500" aria-hidden="true" />
                    <div>Tidak ada hasil ditemukan untuk "{{ desktopSearchQuery }}"</div>
                  </div>
                </li>
              </ul>
            </Transition>
          </div>

          <!-- Desktop nav links -->
          <nav class="flex space-x-2 xl:space-x-4" role="navigation" aria-label="Navigasi utama">
            <RouterLink
              v-for="(item, index) in navigationMenu"
              :key="`nav-${item.name}-${index}`"
              :to="item.link"
              class="relative text-gray-300 hover:text-white font-medium transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-zinc-800/50 focus-visible:ring-2 focus-visible:ring-yellow-400"
              :class="{
                'text-yellow-400': isActiveRoute(item.link),
              }"
              @click="trackNavClick(item.name)"
              :aria-current="isActiveRoute(item.link) ? 'page' : undefined"
            >
              <span class="relative z-10">{{ item.name }}</span>
              <span
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 transition-all duration-300 transform origin-left scale-x-0"
                :class="{
                  'scale-x-100': isActiveRoute(item.link),
                  'group-hover:scale-x-100': !isActiveRoute(item.link),
                }"
                aria-hidden="true"
              ></span>
            </RouterLink>
          </nav>
        </div>

        <!-- Mobile buttons -->
        <div class="flex items-center space-x-2 sm:space-x-3 lg:hidden">
          <button
            type="button"
            @click="handleMobileSearchToggle"
            class="text-gray-300 hover:text-white p-2.5 rounded-xl hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-200"
            :class="{ 'bg-zinc-800/50 text-yellow-400': isMobileSearchOpen }"
            aria-label="Buka pencarian"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>

          <button
            type="button"
            @click="handleMobileMenuToggle"
            class="text-gray-300 hover:text-white p-2.5 rounded-xl hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-200"
            :class="{ 'bg-zinc-800/50 text-yellow-400': isMobileMenuOpen }"
            aria-label="Buka menu navigasi"
          >
            <Transition mode="out-in">
              <XMarkIcon v-if="isMobileMenuOpen" class="h-6 w-6" />
              <Bars3Icon v-else class="h-6 w-6" />
            </Transition>
          </button>

          <!-- Mobile menu -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-2"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-2"
          >
            <div
              v-if="isMobileMenuOpen"
              class="fixed top-20 left-1/2 transform -translate-x-1/2 w-80 sm:w-96 bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-700/50 z-50 mx-4 overflow-hidden"
              @click.stop
              aria-modal="true"
              role="dialog"
            >
              <div class="py-2">
                <div
                  class="px-6 py-4 border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/30 to-zinc-900/30"
                >
                  <h3 class="text-white text-sm font-semibold flex items-center">
                    <Bars3Icon class="w-4 h-4 mr-2 text-yellow-400" />
                    Menu Navigasi
                  </h3>
                </div>
                <nav class="py-2" aria-label="Navigasi mobile">
                  <RouterLink
                    v-for="(item, index) in navigationMenu"
                    :key="`mobile-nav-${item.name}-${index}`"
                    :to="item.link"
                    class="flex items-center px-6 py-4 text-gray-300 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-yellow-400"
                    :class="{
                      'text-yellow-400 bg-zinc-800/30 border-r-2 border-yellow-400': isActiveRoute(
                        item.link,
                      ),
                    }"
                    @click="handleMobileNavClick(item.name)"
                    :aria-current="isActiveRoute(item.link) ? 'page' : undefined"
                  >
                    <div
                      class="p-2 rounded-lg bg-zinc-800/30 mr-4 group-hover:bg-zinc-700/50 transition-colors"
                    >
                      <component
                        v-if="item.icon && icons[item.icon]"
                        :is="icons[item.icon]"
                        class="w-5 h-5 flex-shrink-0"
                        :class="{
                          'text-yellow-400': isActiveRoute(item.link),
                          'text-gray-400 group-hover:text-white': !isActiveRoute(item.link),
                        }"
                        aria-hidden="true"
                      />
                    </div>
                    <span class="font-medium flex-1">{{ item.name }}</span>
                    <ChevronRightIcon
                      class="w-4 h-4 transition-all duration-200"
                      aria-hidden="true"
                    />
                  </RouterLink>
                </nav>
              </div>
            </div>
          </Transition>

          <!-- Mobile menu backdrop -->
          <div
            v-if="isMobileMenuOpen"
            class="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10"
            @click="closeMobileMenu"
            aria-hidden="true"
          ></div>
        </div>
      </div>

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
            <label for="mobile-search" class="sr-only">Cari layanan/menu</label>
            <MagnifyingGlassIcon
              class="absolute top-1/2 left-4 w-5 h-5 text-gray-400 transform -translate-y-1/2 z-10 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="mobile-search"
              v-model="mobileSearchQuery"
              ref="mobileSearchInput"
              type="search"
              class="w-full py-4 pl-12 pr-12 bg-zinc-800/90 hover:bg-zinc-800 text-white text-sm rounded-xl border border-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300 placeholder-gray-400"
              placeholder="Cari layanan/menu…"
              autocomplete="off"
              spellcheck="false"
              :aria-autocomplete="'list'"
              :aria-controls="'mobile-search-listbox'"
              :aria-activedescendant="activeMobileSearchResultId"
              @focus="handleMobileSearchFocus"
              @blur="handleMobileSearchBlur"
              @keydown="handleMobileSearchKeydown"
              @input="handleMobileSearchInput"
            />
            <button
              type="button"
              @click="closeMobileSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-zinc-700/50 transition-all duration-200"
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
              :id="'mobile-search-listbox'"
              class="mt-3 bg-zinc-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-700/50 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent"
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
import { useHeaderStore } from '@/stores/header'
import { useNavigationStore } from '@/stores/navigation'
import { useSearchStore } from '@/stores/search'
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

// STATE
const logoSrc = ref('/src/assets/images/logo.webp')
const logoLoaded = ref(false)
const mobileSearchInput = ref(null)

const desktopSearchQuery = ref('')
const mobileSearchQuery = ref('')
const desktopSearchFocused = ref(false)
const mobileSearchFocused = ref(false)
const selectedDesktopSearchIndex = ref(-1)
const selectedMobileSearchIndex = ref(-1)

const isMobileMenuOpen = computed(() => headerStore.isMobileMenuOpen)
const isMobileSearchOpen = computed(() => headerStore.isMobileSearchOpen)
const navigationMenu = computed(() => navigationStore.menu)

// SEARCH DATA
const searchData = computed(() => [
  {
    id: 1,
    name: 'Haircut Classic',
    category: 'Layanan',
    path: '/services',
    keywords: ['potong', 'rambut'],
    icon: 'ScissorsIcon',
  },
  {
    id: 2,
    name: 'Beard Styling',
    category: 'Layanan',
    path: '/services',
    keywords: ['jenggot', 'styling'],
    icon: 'ScissorsIcon',
  },
  {
    id: 3,
    name: 'Hair Wash',
    category: 'Layanan',
    path: '/services',
    keywords: ['cuci', 'keramas'],
    icon: 'ScissorsIcon',
  },
  {
    id: 4,
    name: 'Hair Coloring',
    category: 'Layanan',
    path: '/services',
    keywords: ['warna', 'cat'],
    icon: 'ScissorsIcon',
  },
  {
    id: 5,
    name: 'Hair Treatment',
    category: 'Layanan',
    path: '/services',
    keywords: ['perawatan', 'treatment'],
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
      scrollSearchOptionIntoView('desktop', selectedDesktopSearchIndex.value)
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
      scrollSearchOptionIntoView('mobile', selectedMobileSearchIndex.value)
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

// === OVERLAY & TOGGLE HANDLERS ===
const handleMobileMenuToggle = () => {
  headerStore.toggleMobileMenu()
  if (headerStore.isMobileMenuOpen) {
    headerStore.setMobileSearchOpen(false)
    mobileSearchFocused.value = false
    mobileSearchQuery.value = ''
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
// Scroll selected search option into view for accessibility
function scrollSearchOptionIntoView(mode, idx) {
  if (idx < 0) return
  const id = mode === 'desktop' ? getDesktopSearchResultId(idx) : getMobileSearchResultId(idx)
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ block: 'nearest' })
}

// === ANALYTICS ===
const trackLogoClick = () => {
  // Example: send GA event
  // window.gtag && window.gtag('event', 'logo_click')
}
const trackNavClick = (name) => {
  // Example: send GA event
  // window.gtag && window.gtag('event', 'nav_click', { label: name })
  // Untuk menghindari warning, gunakan param:
  void name
}
const trackSearchClick = (term) => {
  // Example: send GA event
  // window.gtag && window.gtag('event', 'search_click', { term })
  // Untuk menghindari warning, gunakan param:
  void term
}

// === LIFECYCLE ===
onMounted(() => {
  const handleScroll = () => {
    headerStore.setScrolled(window.scrollY > 10)
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  navigationStore.setActiveRoute(route.path)

  // Preload logo
  if (logoSrc.value) {
    const img = new window.Image()
    img.src = logoSrc.value
    img.onload = () => (logoLoaded.value = true)
    img.onerror = () => (logoSrc.value = '/fallback-logo.png')
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => {})
})

// Route change handler: always close overlays & clear search
watch(
  () => route.path,
  () => {
    navigationStore.setActiveRoute(route.path)
    headerStore.closeAllMobileOverlays()
    desktopSearchQuery.value = ''
    mobileSearchQuery.value = ''
    desktopSearchFocused.value = false
    mobileSearchFocused.value = false
  },
)
</script>

<style scoped>
@keyframes pulse-soft {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
.animate-pulse-soft {
  animation: pulse-soft 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
header {
  /* Responsive shadow and blur for sticky header */
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(8px);
}
</style>
