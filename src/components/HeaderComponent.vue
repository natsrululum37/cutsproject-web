<template>
  <header
    class="sticky top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{ 'bg-black backdrop-blur-md shadow-lg': isScrolled }"
    role="banner"
    aria-label="Main navigation"
  >
    <nav class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8" role="navigation">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <RouterLink
          to="/"
          class="flex items-center space-x-1.5 sm:space-x-2 text-white text-lg sm:text-xl font-bold flex-shrink-0"
          aria-label="CUT PROJECT - Home"
          @click="trackLogoClick"
        >
          <span class="text-sm sm:text-base md:text-lg" aria-hidden="true">CUT</span>
          <img
            :src="logoSrc"
            alt="CUT PROJECT Logo"
            class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            width="28"
            height="28"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            @load="() => (logoLoaded = true)"
            @error="() => (logoSrc = '/fallback-logo.png')"
          />
          <span class="text-sm sm:text-base md:text-lg" aria-hidden="true">PROJECT</span>
        </RouterLink>

        <!-- Desktop navigation & search -->
        <div class="hidden lg:flex space-x-6 items-center flex-1 justify-end">
          <!-- Search input desktop -->
          <div class="relative w-48 xl:w-64" role="search">
            <label for="desktop-search" class="sr-only">Search services</label>
            <input
              id="desktop-search"
              type="search"
              v-model="searchQuery"
              class="w-full bg-zinc-800/70 text-white text-sm rounded-md py-2 pl-10 pr-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Cari layanan/menu..."
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              :aria-expanded="showSearchResults"
              :aria-describedby="showSearchResults ? 'search-results' : undefined"
              @focus="() => { searchStore.setFocused(true); selectedSearchIndex = -1 }"
              @blur="() => setTimeout(() => searchStore.setFocused(false), 150)"
              @keydown="handleSearchKeydown"
              @input="debounceSearch"
            />
            <MagnifyingGlassIcon
              class="absolute top-2.5 left-3 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 scale-95 translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-1"
            >
              <ul
                v-if="showSearchResults"
                id="search-results"
                class="absolute top-full mt-2 left-0 w-full bg-zinc-800 rounded-md shadow-lg border border-zinc-700 z-50 max-h-60 overflow-y-auto"
                role="listbox"
                :aria-label="`${searchResults.length} search results available`"
              >
                <li
                  v-for="(result, index) in searchResults"
                  :key="result.id"
                  :id="`search-result-${index}`"
                  class="px-4 py-2.5 text-white hover:bg-zinc-700 cursor-pointer transition-colors border-b border-zinc-700 last:border-b-0"
                  role="option"
                  :aria-selected="selectedSearchIndex === index"
                  :class="{ 'bg-zinc-700': selectedSearchIndex === index }"
                  @mousedown="() => selectSearchResult(result)"
                  @mouseenter="() => (selectedSearchIndex = index)"
                >
                  <div class="font-medium flex items-center">
                    <component
                      v-if="result.icon && icons[result.icon]"
                      :is="icons[result.icon]"
                      class="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {{ result.name }}
                  </div>
                  <div class="text-xs text-gray-400 mt-0.5">{{ result.category || 'Layanan' }}</div>
                </li>
                <li
                  v-if="searchResults.length === 0 && searchQuery.length > 0"
                  class="px-4 py-3 text-gray-400 text-center"
                  role="option"
                  aria-selected="false"
                >
                  Tidak ada hasil ditemukan untuk "{{ searchQuery }}"
                </li>
              </ul>
            </Transition>
          </div>

          <!-- Desktop nav links -->
          <nav class="flex space-x-4 xl:space-x-6" role="navigation" aria-label="Main menu">
            <RouterLink
              v-for="(item, index) in navigationMenu"
              :key="`nav-${item.name}-${index}`"
              :to="item.link"
              class="relative text-gray-300 hover:text-white font-medium transition-colors group px-2 py-1"
              :class="{ 'text-yellow-400': isActiveRoute(item.link) }"
              :aria-current="isActiveRoute(item.link) ? 'page' : undefined"
              @click="() => trackNavClick(item.name)"
            >
              {{ item.name }}
              <span
                class="absolute bottom-0 left-0 h-0.5 bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200"
                :class="{ 'scale-x-100': isActiveRoute(item.link) }"
                aria-hidden="true"
              ></span>
            </RouterLink>
          </nav>
        </div>

        <!-- Mobile search & menu button -->
        <div class="flex items-center space-x-2 sm:space-x-3 lg:hidden">
          <button
            type="button"
            @click="toggleMobileSearch"
            class="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
            :aria-label="isMobileSearchOpen ? 'Close search' : 'Open search'"
            :aria-expanded="isMobileSearchOpen"
          >
            <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
          </button>

          <div class="relative">
            <button
              type="button"
              @click="toggleMobileMenu"
              class="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
              :aria-expanded="isMobileMenuOpen"
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              <Transition
                mode="out-in"
                enter-active-class="transition duration-150"
                enter-from-class="opacity-0 rotate-90"
                enter-to-class="opacity-100 rotate-0"
                leave-active-class="transition duration-150"
                leave-from-class="opacity-100 rotate-0"
                leave-to-class="opacity-0 -rotate-90"
              >
                <XMarkIcon v-if="isMobileMenuOpen" class="h-6 w-6" aria-hidden="true" />
                <Bars3Icon v-else class="h-6 w-6" aria-hidden="true" />
              </Transition>
            </button>

            <!-- Mobile menu -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 scale-95 translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-1"
            >
              <div
                v-if="isMobileMenuOpen"
                id="mobile-menu"
                class="fixed top-20 left-1/2 transform -translate-x-1/2 w-80 sm:w-96 bg-zinc-900 rounded-lg shadow-xl border border-zinc-700 z-50 mx-4"
                role="menu"
                aria-labelledby="mobile-menu-button"
                @click.stop
                @keydown="handleMobileMenuKeydown"
              >
                <div class="py-2">
                  <div class="px-4 py-2 border-b border-zinc-700">
                    <h3 class="text-white text-sm font-semibold">Menu Navigasi</h3>
                  </div>
                  <nav class="py-1" role="navigation">
                    <RouterLink
                      v-for="(item, index) in navigationMenu"
                      :key="`mobile-nav-${item.name}-${index}`"
                      :to="item.link"
                      class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-800 transition-all duration-150"
                      :class="{
                        'text-yellow-400 bg-zinc-800/50': isActiveRoute(item.link),
                      }"
                      role="menuitem"
                      :aria-current="isActiveRoute(item.link) ? 'page' : undefined"
                      :tabindex="isMobileMenuOpen ? 0 : -1"
                      @click="() => handleMobileNavClick(item.name)"
                    >
                      <component
                        v-if="item.icon && icons[item.icon]"
                        :is="icons[item.icon]"
                        class="w-5 h-5 mr-3 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span class="font-medium">{{ item.name }}</span>
                      <ChevronRightIcon
                        v-if="isActiveRoute(item.link)"
                        class="w-4 h-4 ml-auto text-yellow-400"
                        aria-hidden="true"
                      />
                    </RouterLink>
                  </nav>
                </div>
              </div>
            </Transition>

            <div
              v-if="isMobileMenuOpen"
              class="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              @click="closeMobileMenu"
              aria-hidden="true"
            ></div>
          </div>
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
        <div v-if="isMobileSearchOpen" class="lg:hidden pb-3 px-1" role="search">
          <div class="relative">
            <label for="mobile-search" class="sr-only">Search services</label>
            <MagnifyingGlassIcon
              class="absolute top-1/2 left-3 w-4 h-4 text-gray-400 transform -translate-y-1/2 z-10 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="mobile-search"
              v-model="mobileSearchQuery"
              ref="mobileSearchInput"
              type="search"
              class="w-full py-3 pl-10 pr-12 bg-zinc-800/90 text-white text-sm rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Cari layanan/menu..."
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              :aria-expanded="showMobileSearchResults"
              :aria-describedby="showMobileSearchResults ? 'mobile-search-results' : undefined"
              @keydown="handleMobileSearchKeydown"
              @focus="() => { searchStore.setFocused(true); selectedMobileSearchIndex = -1 }"
              @blur="() => setTimeout(() => searchStore.setFocused(false), 150)"
              @input="debounceMobileSearch"
            />
            <button
              type="button"
              @click="closeMobileSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <XMarkIcon class="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <ul
              v-if="showMobileSearchResults"
              id="mobile-search-results"
              class="mt-2 bg-zinc-800/95 rounded-lg shadow-lg border border-zinc-700 max-h-64 overflow-y-auto"
              role="listbox"
              :aria-label="`${mobileSearchResults.length} mobile search results available`"
            >
              <li
                v-for="(result, index) in mobileSearchResults"
                :key="result.id"
                class="px-4 py-3 text-white hover:bg-zinc-700 cursor-pointer transition-colors border-b border-zinc-700 last:border-b-0"
                role="option"
                :aria-selected="selectedMobileSearchIndex === index"
                :class="{ 'bg-zinc-700': selectedMobileSearchIndex === index }"
                @mousedown="() => selectMobileSearchResult(result)"
                @mouseenter="() => (selectedMobileSearchIndex = index)"
              >
                <div class="font-medium flex items-center">
                  <component
                    v-if="result.icon && icons[result.icon]"
                    :is="icons[result.icon]"
                    class="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {{ result.name }}
                </div>
                <div class="text-xs text-gray-400 mt-1">{{ result.category || 'Layanan' }}</div>
              </li>
              <li
                v-if="mobileSearchResults.length === 0 && mobileSearchQuery.length > 0"
                class="px-4 py-4 text-gray-400 text-center"
                role="option"
                aria-selected="false"
              >
                Tidak ada hasil ditemukan untuk "{{ mobileSearchQuery }}"
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

const icons = {
  HomeIcon,
  ScissorsIcon,
  PhotoIcon,
  InformationCircleIcon,
  StarIcon,
  CalendarIcon,
  PhoneIcon,
}

const router = useRouter()
const route = useRoute()
const headerStore = useHeaderStore()
const navigationStore = useNavigationStore()
const searchStore = useSearchStore()

const isScrolled = computed(() => headerStore.isScrolled)
const isMobileMenuOpen = computed(() => headerStore.isMobileMenuOpen)
const isMobileSearchOpen = computed(() => headerStore.isMobileSearchOpen)
const searchQuery = computed({
  get: () => searchStore.query,
  set: (val) => searchStore.setQuery(val),
})
const navigationMenu = computed(() => navigationStore.menu)

let selectedSearchIndex = ref(-1)
let selectedMobileSearchIndex = ref(-1)
const mobileSearchQuery = ref('')
let logoSrc = ref('/src/assets/images/logo.webp')
let logoLoaded = ref(false)
const mobileSearchInput = ref(null)

const searchData = computed(() => [
  { id: 1, name: 'Haircut Classic', category: 'Layanan', path: '/services', keywords: ['potong', 'rambut'], icon: 'ScissorsIcon' },
  { id: 2, name: 'Beard Styling', category: 'Layanan', path: '/services', keywords: ['jenggot', 'styling'], icon: 'ScissorsIcon' },
  { id: 3, name: 'Hair Wash', category: 'Layanan', path: '/services', keywords: ['cuci', 'keramas'], icon: 'ScissorsIcon' },
  { id: 4, name: 'Hair Coloring', category: 'Layanan', path: '/services', keywords: ['warna', 'cat'], icon: 'ScissorsIcon' },
  { id: 5, name: 'Hair Treatment', category: 'Layanan', path: '/services', keywords: ['perawatan', 'treatment'], icon: 'ScissorsIcon' },
  ...navigationMenu.value.map((item, idx) => ({
    id: `menu-${idx}`,
    name: item.name,
    category: 'Menu',
    path: item.link,
    keywords: [item.name.toLowerCase()],
    icon: item.icon,
  })),
])

const performSearch = (query) => {
  const term = query.toLowerCase().trim()
  if (!term) return []
  return searchData.value
    .filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(term)
      const categoryMatch = item.category?.toLowerCase().includes(term)
      const keywordMatch = item.keywords?.some((k) => k.includes(term))
      return nameMatch || categoryMatch || keywordMatch
    })
    .sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(term)
      const bExact = b.name.toLowerCase().startsWith(term)
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      return 0
    })
    .slice(0, 6)
}

const searchResults = computed(() => performSearch(searchStore.query))
const mobileSearchResults = computed(() => performSearch(mobileSearchQuery.value))

const showSearchResults = computed(
  () => searchStore.isFocused && searchStore.query.length > 0 && searchResults.value.length >= 0,
)
const showMobileSearchResults = computed(
  () => searchStore.isFocused && mobileSearchQuery.value.length > 0 && mobileSearchResults.value.length >= 0,
)

let searchTimeout = null
const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {}, 300)
}
const debounceMobileSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {}, 300)
}

const isActiveRoute = (path) => route.path === path || navigationStore.isActiveRoute(path)

watch(
  () => route.path,
  (newPath) => {
    navigationStore.setActiveRoute(newPath)
  },
)

const handleSearchKeydown = (e) => {
  const results = searchResults.value
  if (!results.length) return
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      selectedSearchIndex.value = Math.min(selectedSearchIndex.value + 1, results.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      selectedSearchIndex.value = Math.max(selectedSearchIndex.value - 1, -1)
      break
    case 'Enter':
      e.preventDefault()
      if (selectedSearchIndex.value >= 0) selectSearchResult(results[selectedSearchIndex.value])
      else if (results.length > 0) selectSearchResult(results[0])
      break
    case 'Escape':
      searchStore.setFocused(false)
      selectedSearchIndex.value = -1
      break
  }
}
const handleMobileSearchKeydown = (e) => {
  const results = mobileSearchResults.value
  if (!results.length) return
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      selectedMobileSearchIndex.value = Math.min(selectedMobileSearchIndex.value + 1, results.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      selectedMobileSearchIndex.value = Math.max(selectedMobileSearchIndex.value - 1, -1)
      break
    case 'Enter':
      e.preventDefault()
      if (selectedMobileSearchIndex.value >= 0) selectMobileSearchResult(results[selectedMobileSearchIndex.value])
      else if (results.length > 0) selectMobileSearchResult(results[0])
      break
    case 'Escape':
      closeMobileSearch()
      break
  }
}
const handleMobileMenuKeydown = (e) => { if (e.key === 'Escape') closeMobileMenu() }
const selectSearchResult = (result) => {
  router.push(result.path)
  searchStore.setQuery('')
  searchStore.setFocused(false)
  selectedSearchIndex.value = -1
  trackSearchClick(result.name)
}
const selectMobileSearchResult = (result) => {
  router.push(result.path)
  closeMobileSearch()
  trackSearchClick(result.name)
}
const handleMobileNavClick = (name) => {
  closeMobileMenu()
  trackNavClick(name)
}

const toggleMobileMenu = () => headerStore.toggleMobileMenu()
const toggleMobileSearch = async () => {
  headerStore.toggleMobileSearch()
  if (headerStore.isMobileSearchOpen) {
    await nextTick()
    mobileSearchInput.value?.focus()
  }
}
const closeMobileMenu = () => headerStore.setMobileMenuOpen(false)
const closeMobileSearch = () => {
  headerStore.setMobileSearchOpen(false)
  searchStore.setFocused(false)
  mobileSearchQuery.value = ''
}

const trackLogoClick = () => {}
const trackNavClick = () => {}
const trackSearchClick = () => {}

onMounted(() => {
  window.addEventListener('scroll', () => headerStore.setScrolled(window.scrollY > 10), { passive: true })
  navigationStore.setActiveRoute(route.path)
  if (logoSrc.value) {
    const img = new window.Image()
    img.src = logoSrc.value
    img.onload = () => { logoLoaded.value = true }
    img.onerror = () => { logoSrc.value = '/fallback-logo.png' }
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => headerStore.setScrolled(window.scrollY > 10))
  clearTimeout(searchTimeout)
})
watch(
  () => route.path,
  () => {
    closeMobileMenu()
    closeMobileSearch()
  },
)
</script>

<style scoped>
/* ... (style sama seperti sebelumnya, jika ingin lebih ringkas bisa dipangkas) ... */
.transition-all {transition-property:all;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms;will-change:auto;}
.max-h-60::-webkit-scrollbar,.max-h-64::-webkit-scrollbar{width:6px;}
.max-h-60::-webkit-scrollbar-track,.max-h-64::-webkit-scrollbar-track{background:#3f3f46;border-radius:3px;}
.max-h-60::-webkit-scrollbar-thumb,.max-h-64::-webkit-scrollbar-thumb{background:#71717a;border-radius:3px;}
.max-h-60::-webkit-scrollbar-thumb:hover,.max-h-64::-webkit-scrollbar-thumb:hover{background:#a1a1aa;}
button:focus-visible,input:focus-visible,a:focus-visible{outline:2px solid #facc15;outline-offset:2px;}
.flex-shrink-0 img{transition:transform .2s ease-in-out;transform:translateZ(0);}
.flex-shrink-0:hover img{transform:scale(1.05) translateZ(0);}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
.sticky{contain:layout style paint;}
.backdrop-blur-md{backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}
.transform{transform:translateZ(0);}
.bg-zinc-800\/70,.bg-zinc-800\/90,.bg-zinc-800\/95{will-change:auto;}
.fixed.inset-0{backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);}
</style>
