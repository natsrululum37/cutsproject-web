<template>
  <header
    class="sticky top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{ 'bg-black/90 backdrop-blur-md shadow-md': isScrolled }"
    aria-label="Main navigation"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2 text-white text-xl font-bold">
          <span>CUT</span>
          <img src="@/assets/images/logo.webp" alt="S" class="w-7 h-7" />
          <span>PROJECT</span>
        </RouterLink>

        <!-- Mobile Actions -->
        <div class="md:hidden flex items-center space-x-4">
          <button @click="toggleSearch" class="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none" aria-label="Search">
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>
          <button @click="toggleMenu" class="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none" aria-label="Menu">
            <Bars3Icon class="h-6 w-6" />
          </button>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6 items-center">
          <div class="relative w-64">
            <input
              type="search"
              v-model="searchQuery"
              class="w-full bg-zinc-800/70 text-white text-sm rounded-md py-2 pl-10 pr-4 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="Cari layanan..."
              @focus="isSearchFocused = true"
              @blur="isSearchFocused = false"
              @keyup.enter="performSearch"
              aria-label="Search services"
            />
            <MagnifyingGlassIcon class="absolute top-2.5 left-3 w-4 h-4 text-gray-400" />
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <ul
                v-if="isSearchFocused && searchQuery.length > 0"
                class="absolute top-full mt-2 left-0 w-full bg-zinc-800 rounded-md shadow-lg z-50"
              >
                <li
                  v-for="result in searchResults"
                  :key="result.id"
                  @click="selectSearchResult(result)"
                  class="px-4 py-2 text-white hover:bg-zinc-700 cursor-pointer"
                >
                  {{ result.name }}
                </li>
                <li v-if="searchResults.length === 0" class="px-4 py-2 text-gray-400">
                  Tidak ada hasil
                </li>
              </ul>
            </Transition>
          </div>
          <RouterLink
            v-for="item in navigation?.menu || []"
            :key="item.name"
            :to="item.link"
            class="relative text-gray-300 hover:text-white font-medium"
            :class="{ 'text-yellow-400': navigation?.isActiveRoute?.(item.link) }"
          >
            {{ item.name }}
            <span
              class="absolute bottom-0 left-0 h-0.5 bg-yellow-400 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
              :class="{ 'scale-x-100': navigation?.isActiveRoute?.(item.link) }"
            ></span>
          </RouterLink>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <Transition name="slide-fade">
        <div v-if="isSearchOpen" class="md:hidden mt-2 relative z-40">
          <div class="relative mx-1">
            <MagnifyingGlassIcon class="absolute top-2.5 left-3 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              ref="mobileSearchInput"
              type="search"
              class="w-full py-2 pl-10 pr-10 bg-zinc-800/80 text-white text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
              placeholder="Cari layanan..."
              @keyup.enter="performSearch"
              aria-label="Search services"
            />
            <button @click="isSearchOpen = false" class="absolute right-2 top-2 text-gray-400 hover:text-white">
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
          <ul
            v-if="searchQuery.length > 0"
            class="absolute mx-1 mt-2 bg-zinc-800 rounded-md shadow-md w-full z-30"
          >
            <li
              v-for="result in searchResults"
              :key="result.id"
              class="px-4 py-2 text-white hover:bg-zinc-700 cursor-pointer"
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
    </nav>

    <!-- Mobile Menu Drawer -->
    <TransitionRoot :show="isOpen" as="template">
      <Dialog as="div" class="relative z-50 md:hidden" @close="isOpen = false">
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 flex justify-end">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <DialogPanel class="w-72 bg-zinc-900 p-6 overflow-y-auto shadow-xl">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-white text-lg font-semibold">Menu</h2>
                <button @click="isOpen = false" class="text-gray-400 hover:text-white">
                  <XMarkIcon class="w-6 h-6" />
                </button>
              </div>
              <nav class="space-y-4">
                <RouterLink
                  v-for="item in navigation?.menu || []"
                  :key="item.name"
                  :to="item.link"
                  @click="isOpen = false"
                  class="flex items-center text-gray-300 hover:text-white transition"
                >
                  <component
                    :is="navigation?.getMenuIcon?.(item.name)"
                    class="w-5 h-5 mr-3"
                  />
                  {{ item.name }}
                </RouterLink>
              </nav>
            </DialogPanel>
          </TransitionChild>
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

const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)

const isSearchOpen = ref(false)
const isSearchFocused = ref(false)
const searchQuery = ref('')
const mobileSearchInput = ref(null)

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) nextTick(() => mobileSearchInput.value?.focus())
}

const route = useRoute()
const router = useRouter()
const headerState = useHeaderState()
const navigation = useNavigation(route, headerState) || {
  menu: [],
  isActiveRoute: () => false,
  getMenuIcon: () => 'span',
}

const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const searchData = [
  { id: 1, name: 'Potong Rambut Pria', path: '/layanan/potong-rambut-pria' },
  { id: 2, name: 'Styling Rambut', path: '/layanan/styling-rambut' },
  { id: 3, name: 'Perawatan Jenggot', path: '/layanan/perawatan-jenggot' },
  { id: 4, name: 'Hair Coloring', path: '/layanan/hair-coloring' },
  { id: 5, name: 'Kids Haircut', path: '/layanan/kids-haircut' },
]

const searchResults = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return searchQuery.value
    ? searchData.filter((item) => item.name.toLowerCase().includes(query)).slice(0, 5)
    : []
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

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* Optional slide transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
