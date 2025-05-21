<template>
  <header
    class="sticky top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{ 'bg-black/90 backdrop-blur-sm shadow-lg': isScrolled }"
    aria-label="Main navigation"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-white text-xl font-bold" aria-label="CUTSPROJECT home page">
            CUTSPROJECT
          </RouterLink>
        </div>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex items-center relative mx-6 flex-1 max-w-xs">
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              v-model="searchQuery"
              class="w-full py-2 pl-10 pr-4 text-sm text-white bg-zinc-800/70 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="Cari layanan..."
              aria-label="Search services"
              @focus="isSearchFocused = true"
              @blur="isSearchFocused = false"
              @keyup.enter="performSearch"
            />
          </div>
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="isSearchFocused && searchQuery.length > 0"
              class="absolute top-full left-0 w-full mt-1 bg-zinc-800 rounded-md shadow-lg z-10"
            >
              <ul class="py-1 text-sm">
                <li
                  v-for="result in searchResults"
                  :key="result.id"
                  class="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
                  @click="selectSearchResult(result)"
                >
                  {{ result.name }}
                </li>
                <li v-if="searchResults.length === 0" class="px-4 py-2 text-gray-400">
                  Tidak ada hasil
                </li>
              </ul>
            </div>
          </Transition>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-4">
          <RouterLink
            v-for="item in navigation?.menu || []"
            :key="item.name"
            :to="item.link"
            class="relative text-gray-200 hover:text-white px-2 py-1.5 transition duration-300 group"
            :class="{ 'text-yellow-400': navigation?.isActiveRoute?.(item.link) }"
          >
            {{ item.name }}
            <span
              class="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              :class="{ 'scale-x-100': navigation?.isActiveRoute?.(item.link) }"
            ></span>
          </RouterLink>
        </div>

        <!-- Mobile Actions -->
        <div class="md:hidden flex items-center space-x-3">
          <!-- Search Button -->
          <button
            @click="toggleSearch"
            class="text-gray-200 hover:text-white focus:outline-none focus:text-white"
            aria-label="Search"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>

          <!-- Hamburger Menu -->
          <button
            @click="toggleMenu"
            class="text-gray-200 hover:text-white focus:outline-none focus:text-white"
            aria-label="Open main menu"
            :aria-expanded="isOpen"
          >
            <Bars3Icon class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-full opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-full opacity-0"
      >
        <div v-if="isSearchOpen" class="md:hidden py-2">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              v-model="searchQuery"
              class="w-full py-2 pl-10 pr-10 text-sm text-white bg-zinc-800/70 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="Cari layanan..."
              aria-label="Search services"
              @keyup.enter="performSearch"
              ref="mobileSearchInput"
            />
            <button
              @click="isSearchOpen = false"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
              aria-label="Close search"
            >
              <XMarkIcon class="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div
            v-if="searchQuery.length > 0"
            class="absolute left-0 right-0 bg-zinc-800 rounded-b-md shadow-lg z-10 mx-4"
          >
            <ul class="py-1 text-sm">
              <li
                v-for="result in searchResults"
                :key="result.id"
                class="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
                @click="selectSearchResult(result)"
              >
                {{ result.name }}
              </li>
              <li v-if="searchResults.length === 0" class="px-4 py-2 text-gray-400">
                Tidak ada hasil
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Mobile Menu -->
    <TransitionRoot :show="isOpen" as="template">
      <Dialog as="div" class="md:hidden relative z-50" @close="isOpen = false">
        <TransitionChild
          as="template"
          enter="transition ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div
            class="relative flex min-h-full items-start justify-end p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative w-full max-w-xs transform overflow-hidden bg-zinc-900 p-6 text-left shadow-xl transition-all"
              >
                <div class="flex items-center justify-between">
                  <h2 class="text-white font-bold text-lg">Menu</h2>
                  <button
                    @click="isOpen = false"
                    class="text-gray-400 hover:text-white"
                    aria-label="Close menu"
                  >
                    <XMarkIcon class="h-6 w-6" />
                  </button>
                </div>

                <div class="mt-6 space-y-4">
                  <RouterLink
                    v-for="item in navigation?.menu || []"
                    :key="item.name"
                    :to="item.link"
                    class="flex items-center text-gray-300 hover:text-white transition duration-300"
                    @click="isOpen = false"
                  >
                    <component
                      :is="navigation?.getMenuIcon?.(item.name)"
                      class="w-5 h-5 mr-3"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </RouterLink>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

import { useHeaderState } from '@/composables/useHeaderState'
import { useNavigation } from '@/composables/useNavigation'

// Menu state
const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// Search state
const isSearchOpen = ref(false)
const isSearchFocused = ref(false)
const searchQuery = ref('')
const mobileSearchInput = ref(null)

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => {
      mobileSearchInput.value?.focus()
    })
  }
}

// Navigation setup
const route = useRoute()
const router = useRouter()
const headerState = useHeaderState()

const navigation = useNavigation(route, headerState) || {
  menu: [],
  isActiveRoute: () => false,
  getMenuIcon: () => 'span',
}

// Scroll handling
const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// Mock search data - replace with actual data in production
const searchData = [
  { id: 1, name: 'Potong Rambut Pria', path: '/layanan/potong-rambut-pria' },
  { id: 2, name: 'Styling Rambut', path: '/layanan/styling-rambut' },
  { id: 3, name: 'Perawatan Jenggot', path: '/layanan/perawatan-jenggot' },
  { id: 4, name: 'Hair Coloring', path: '/layanan/hair-coloring' },
  { id: 5, name: 'Kids Haircut', path: '/layanan/kids-haircut' }
]

// Search functionality
const searchResults = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return searchData.filter(item =>
    item.name.toLowerCase().includes(query)
  ).slice(0, 5) // Limit to 5 results
})

const performSearch = () => {
  if (searchQuery.value && searchResults.value.length > 0) {
    selectSearchResult(searchResults.value[0])
  }
}

const selectSearchResult = (result) => {
  router.push(result.path)
  searchQuery.value = ''
  isSearchOpen.value = false
  isSearchFocused.value = false
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Add preconnect for external resources */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Optimize CSS with minimal specificity */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}

/* Ensure proper text color contrast for accessibility */
.text-gray-200 {
  color: #e4e4e7;
}

.text-gray-400 {
  color: #a1a1aa;
}
</style>
