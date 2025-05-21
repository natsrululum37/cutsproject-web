<template>
  <header
    class="sticky top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{ 'bg-black backdrop-blur-md shadow-lg': isScrolled }"
    aria-label="Main navigation"
  >
    <nav class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Logo - Responsive sizing -->
        <RouterLink
          to="/"
          class="flex items-center space-x-1.5 sm:space-x-2 text-white text-lg sm:text-xl font-bold flex-shrink-0"
        >
          <span class="text-sm sm:text-base md:text-lg">CUT</span>
          <img src="@/assets/images/logo.webp" alt="S" class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          <span class="text-sm sm:text-base md:text-lg">PROJECT</span>
        </RouterLink>

        <!-- Desktop Search & Menu -->
        <div class="hidden lg:flex space-x-6 items-center flex-1 justify-end">
          <!-- Search Bar Desktop -->
          <div class="relative w-48 xl:w-64">
            <input
              type="search"
              v-model="searchQuery"
              class="w-full bg-zinc-800/70 text-white text-sm rounded-md py-2 pl-10 pr-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
              placeholder="Cari layanan..."
              @focus="isSearchFocused = true"
              @blur="handleSearchBlur"
              @keyup.enter="performSearch"
              aria-label="Search services"
            />
            <MagnifyingGlassIcon class="absolute top-2.5 left-3 w-4 h-4 text-gray-400" />

            <!-- Search Results Dropdown -->
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
                class="absolute top-full mt-2 left-0 w-full bg-zinc-800 rounded-md shadow-lg border border-zinc-700 z-50 max-h-60 overflow-y-auto"
              >
                <li
                  v-for="result in searchResults"
                  :key="result.id"
                  @mousedown="selectSearchResult(result)"
                  class="px-4 py-2.5 text-white hover:bg-zinc-700 cursor-pointer transition-colors border-b border-zinc-700 last:border-b-0"
                >
                  <div class="font-medium">{{ result.name }}</div>
                  <div class="text-xs text-gray-400 mt-0.5">{{ result.category || 'Layanan' }}</div>
                </li>
                <li v-if="searchResults.length === 0" class="px-4 py-3 text-gray-400 text-center">
                  Tidak ada hasil ditemukan
                </li>
              </ul>
            </Transition>
          </div>

          <!-- Desktop Navigation Links -->
          <div class="flex space-x-4 xl:space-x-6">
            <RouterLink
              v-for="item in navigation?.menu || []"
              :key="item.name"
              :to="item.link"
              class="relative text-gray-300 hover:text-white font-medium transition-colors group px-2 py-1"
              :class="{ 'text-yellow-400': navigation?.isActiveRoute?.(item.link) }"
            >
              {{ item.name }}
              <span
                class="absolute bottom-0 left-0 h-0.5 bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200"
                :class="{ 'scale-x-100': navigation?.isActiveRoute?.(item.link) }"
              ></span>
            </RouterLink>
          </div>
        </div>

        <!-- Mobile & Tablet Actions -->
        <div class="flex items-center space-x-2 sm:space-x-3 lg:hidden">
          <!-- Search Button -->
          <button
            @click="toggleMobileSearch"
            class="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
            aria-label="Search"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>

          <!-- Mobile Menu Dropdown -->
          <div class="relative">
            <button
              @click="toggleMobileMenu"
              class="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              aria-label="Menu"
              :aria-expanded="isMobileMenuOpen"
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
                <XMarkIcon v-if="isMobileMenuOpen" class="h-6 w-6" />
                <Bars3Icon v-else class="h-6 w-6" />
              </Transition>
            </button>

            <!-- Mobile Dropdown Menu -->
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
                class="fixed top-20 left-1/2 transform -translate-x-1/2 w-80 sm:w-96 bg-zinc-900 rounded-lg shadow-xl border border-zinc-700 z-50 mx-4"
                @click.stop
              >
                <div class="py-2">
                  <div class="px-4 py-2 border-b border-zinc-700">
                    <h3 class="text-white text-sm font-semibold">Menu Navigasi</h3>
                  </div>
                  <nav class="py-1">
                    <RouterLink
                      v-for="item in navigation?.menu || []"
                      :key="item.name"
                      :to="item.link"
                      @click="closeMobileMenu"
                      class="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-800 transition-all duration-150"
                      :class="{
                        'text-yellow-400 bg-zinc-800/50': navigation?.isActiveRoute?.(item.link)
                      }"
                    >
                      <component
                        :is="navigation?.getMenuIcon?.(item.name) || 'div'"
                        class="w-5 h-5 mr-3 flex-shrink-0"
                      />
                      <span class="font-medium">{{ item.name }}</span>
                      <ChevronRightIcon
                        v-if="navigation?.isActiveRoute?.(item.link)"
                        class="w-4 h-4 ml-auto text-yellow-400"
                      />
                    </RouterLink>
                  </nav>
                </div>
              </div>
            </Transition>

            <!-- Mobile Menu Backdrop -->
            <div
              v-if="isMobileMenuOpen"
              @click="closeMobileMenu"
              class="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            ></div>
          </div>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileSearchOpen" class="lg:hidden pb-3 px-1">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute top-1/2 left-3 w-4 h-4 text-gray-400 transform -translate-y-1/2 z-10" />
            <input
              v-model="mobileSearchQuery"
              ref="mobileSearchInput"
              type="search"
              class="w-full py-3 pl-10 pr-12 bg-zinc-800/90 text-white text-sm rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Cari layanan..."
              @keyup.enter="performMobileSearch"
              @focus="isMobileSearchFocused = true"
              @blur="handleMobileSearchBlur"
              aria-label="Search services"
            />
            <button
              @click="closeMobileSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Mobile Search Results -->
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
              class="mt-2 bg-zinc-800/95 rounded-lg shadow-lg border border-zinc-700 max-h-64 overflow-y-auto"
            >
              <li
                v-for="result in mobileSearchResults"
                :key="result.id"
                class="px-4 py-3 text-white hover:bg-zinc-700 cursor-pointer transition-colors border-b border-zinc-700 last:border-b-0"
                @mousedown="selectMobileSearchResult(result)"
              >
                <div class="font-medium">{{ result.name }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ result.category || 'Layanan' }}</div>
              </li>
              <li v-if="mobileSearchResults.length === 0" class="px-4 py-4 text-gray-400 text-center">
                Tidak ada hasil ditemukan
              </li>
            </ul>
          </Transition>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

import { useHeaderState } from '@/composables/useHeaderState'
import { useNavigation } from '@/composables/useNavigation'

// Mobile menu state
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Desktop search state
const isSearchFocused = ref(false)
const searchQuery = ref('')
const showSearchResults = computed(() =>
  isSearchFocused.value && searchQuery.value.length > 0
)

// Mobile search state
const isMobileSearchOpen = ref(false)
const isMobileSearchFocused = ref(false)
const mobileSearchQuery = ref('')
const mobileSearchInput = ref(null)

const showMobileSearchResults = computed(() =>
  isMobileSearchFocused.value && mobileSearchQuery.value.length > 0
)

const toggleMobileSearch = () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value
  if (isMobileSearchOpen.value) {
    nextTick(() => mobileSearchInput.value?.focus())
  } else {
    mobileSearchQuery.value = ''
  }
}

const closeMobileSearch = () => {
  isMobileSearchOpen.value = false
  mobileSearchQuery.value = ''
  isMobileSearchFocused.value = false
}

// Router and navigation
const route = useRoute()
const router = useRouter()
const headerState = useHeaderState()
const navigation = useNavigation(route, headerState) || {
  menu: [],
  isActiveRoute: () => false,
  getMenuIcon: () => 'span',
}

// Scroll state
const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// Enhanced search data with categories
const searchData = [
  { id: 1, name: 'Potong Rambut Pria', path: '/layanan/potong-rambut-pria', category: 'Hair Service' },
  { id: 2, name: 'Styling Rambut', path: '/layanan/styling-rambut', category: 'Hair Service' },
  { id: 3, name: 'Perawatan Jenggot', path: '/layanan/perawatan-jenggot', category: 'Grooming' },
  { id: 4, name: 'Hair Coloring', path: '/layanan/hair-coloring', category: 'Hair Service' },
  { id: 5, name: 'Kids Haircut', path: '/layanan/kids-haircut', category: 'Hair Service' },
  { id: 6, name: 'Hair Wash', path: '/layanan/hair-wash', category: 'Hair Service' },
  { id: 7, name: 'Facial Treatment', path: '/layanan/facial-treatment', category: 'Skincare' },
  { id: 8, name: 'Mustache Trim', path: '/layanan/mustache-trim', category: 'Grooming' },
]

// Desktop search results
const searchResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return searchQuery.value
    ? searchData.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      ).slice(0, 6)
    : []
})

// Mobile search results
const mobileSearchResults = computed(() => {
  const query = mobileSearchQuery.value.toLowerCase().trim()
  return mobileSearchQuery.value
    ? searchData.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      ).slice(0, 5)
    : []
})

// Search handlers
const handleSearchBlur = () => {
  // Delay to allow click on search results
  setTimeout(() => {
    isSearchFocused.value = false
  }, 150)
}

const handleMobileSearchBlur = () => {
  setTimeout(() => {
    isMobileSearchFocused.value = false
  }, 150)
}

const performSearch = () => {
  if (searchQuery.value && searchResults.value.length > 0) {
    selectSearchResult(searchResults.value[0])
  }
}

const performMobileSearch = () => {
  if (mobileSearchQuery.value && mobileSearchResults.value.length > 0) {
    selectMobileSearchResult(mobileSearchResults.value[0])
  }
}

const selectSearchResult = (result) => {
  router.push(result.path)
  searchQuery.value = ''
  isSearchFocused.value = false
}

const selectMobileSearchResult = (result) => {
  router.push(result.path)
  closeMobileSearch()
}

// Click outside handler for mobile menu
const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest('[aria-label="Menu"]')) {
    closeMobileMenu()
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Enhanced smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar for search results */
.max-h-60::-webkit-scrollbar,
.max-h-64::-webkit-scrollbar {
  width: 6px;
}

.max-h-60::-webkit-scrollbar-track,
.max-h-64::-webkit-scrollbar-track {
  background: #3f3f46;
  border-radius: 3px;
}

.max-h-60::-webkit-scrollbar-thumb,
.max-h-64::-webkit-scrollbar-thumb {
  background: #71717a;
  border-radius: 3px;
}

.max-h-60::-webkit-scrollbar-thumb:hover,
.max-h-64::-webkit-scrollbar-thumb:hover {
  background: #a1a1aa;
}

/* Focus states for better accessibility */
button:focus-visible,
input:focus-visible {
  outline: 2px solid #facc15;
  outline-offset: 2px;
}

/* Smooth logo animation */
.flex-shrink-0 img {
  transition: transform 0.2s ease-in-out;
}

.flex-shrink-0:hover img {
  transform: scale(1.05);
}
</style>
