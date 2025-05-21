<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="[
      headerState.scrolled ? 'bg-black/95 py-2 shadow-lg' : 'bg-black/80 py-4',
      headerState.isOpen ? 'bg-black' : '',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div class="flex items-center justify-between">
        <!-- Logo with Enhanced Animation -->
        <RouterLink to="/" class="flex items-center space-x-3 group">
          <div class="relative">
            <img
              src="@/assets/images/logo.webp"
              alt="Logo"
              class="w-7 h-7 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 logo-glow"
            />
            <div
              class="absolute -inset-1 bg-yellow-400/30 rounded-full blur-sm group-hover:bg-yellow-400/40 logo-pulse transition-all duration-500 group-hover:blur-md"
            ></div>
          </div>
          <span class="text-white text-2xl font-bold tracking-wide relative overflow-hidden">
            CUTSPROJECT
            <span
              class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            ></span>
          </span>
        </RouterLink>

        <!-- Search Box for Desktop with Animation -->
        <div class="hidden md:flex flex-1 max-w-xl mx-6 relative group">
          <input
            type="text"
            v-model="searchState.query"
            placeholder="Cari..."
            class="w-full px-4 py-2.5 rounded-lg bg-black/80 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:border-transparent placeholder-gray-400 transition-all duration-300"
            @focus="searchState.isFocused = true"
            @blur="searchState.isFocused = false"
          />
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-white group-hover:text-yellow-400 transition-colors duration-300"
            :class="{ 'text-yellow-400': searchState.isFocused || searchState.query }"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </span>
          <div
            v-if="searchState.query && searchState.suggestions.length > 0"
            class="absolute top-full left-0 w-full mt-1 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-20"
          >
            <div
              v-for="(suggestion, index) in searchState.suggestions"
              :key="index"
              class="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-200 flex items-center gap-2"
              @click="search.handleSelection(suggestion)"
            >
              <span class="text-yellow-400">
                <MagnifyingGlassIcon class="h-4 w-4" />
              </span>
              {{ suggestion }}
            </div>
          </div>
        </div>

        <!-- Desktop Menu with Visual Enhancements -->
        <nav class="hidden md:flex items-center space-x-8 font-medium">
          <RouterLink
            v-for="item in navigation.menu"
            :key="item.name"
            :to="item.link"
            class="relative text-gray-200 hover:text-white px-2 py-1.5 transition duration-300 group"
            :class="{ 'text-yellow-400': navigation.isActiveRoute(item.link) }"
          >
            <span class="relative z-10">{{ item.name }}</span>
            <span
              class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform origin-left transition-transform duration-300"
              :class="
                navigation.isActiveRoute(item.link) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              "
            ></span>
          </RouterLink>
          <RouterLink
            to="/reservation"
            class="relative overflow-hidden px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold transform hover:scale-105 transition-transform duration-300 ml-4 shadow-lg"
          >
            <span class="relative z-10 flex items-center">
              <CalendarDaysIcon class="h-4 w-4 mr-1" />
              <span>Reservasi</span>
            </span>
            <span
              class="absolute inset-0 bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform duration-300"
            ></span>
          </RouterLink>
        </nav>

        <!-- Mobile Menu Button with Animation -->
        <div class="md:hidden flex items-center space-x-4">
          <!-- Search Icon for Mobile -->
          <button
            @click="search.toggleMobileSearch()"
            class="text-gray-300 hover:text-yellow-400 focus:outline-none transition duration-300"
          >
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>

          <!-- Menu Toggle Button -->
          <button
            @click="navigation.toggleMenu()"
            class="text-gray-300 hover:text-yellow-400 focus:outline-none relative w-6 h-6 transition duration-300"
          >
            <span
              class="absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out"
              :class="headerState.isOpen ? 'rotate-45 top-3' : 'top-2'"
            ></span>
            <span
              class="absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out top-3"
              :class="headerState.isOpen ? 'opacity-0' : 'opacity-100'"
            ></span>
            <span
              class="absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out"
              :class="headerState.isOpen ? '-rotate-45 top-3' : 'top-4'"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Search Overlay -->
    <transition name="fade">
      <div
        v-if="searchState.isMobileOpen"
        class="md:hidden absolute inset-x-0 top-full bg-black/95 p-4 shadow-lg z-30"
      >
        <div class="relative">
          <input
            type="text"
            v-model="searchState.query"
            placeholder="Cari..."
            class="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
            @focus="searchState.isFocused = true"
            @blur="searchState.isFocused = false"
            ref="mobileSearchInput"
          />
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            <MagnifyingGlassIcon v-if="!searchState.query" class="h-5 w-5" />
            <button v-else @click="search.clearSearch()" class="focus:outline-none">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </span>
        </div>
        <!-- Mobile Search Suggestions -->
        <div
          v-if="searchState.query && searchState.suggestions.length > 0"
          class="mt-2 bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
        >
          <div
            v-for="(suggestion, index) in searchState.suggestions"
            :key="index"
            class="px-4 py-3 hover:bg-gray-700 cursor-pointer text-gray-200 flex items-center gap-2 border-b border-gray-700 last:border-0"
            @click="search.handleSelection(suggestion)"
          >
            <span class="text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            {{ suggestion }}
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile Menu with Animated Transitions -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="headerState.isOpen" class="md:hidden bg-black/95 border-t border-gray-800">
        <nav class="flex flex-col py-4 px-6">
          <RouterLink
            v-for="item in navigation.menu"
            :key="item.name"
            :to="item.link"
            @click="headerState.isOpen = false"
            class="flex items-center py-3 text-gray-200 hover:text-yellow-400 border-b border-gray-800 last:border-0 transition-colors duration-300"
            :class="{ 'text-yellow-400': navigation.isActiveRoute(item.link) }"
          >
            <component :is="navigation.getMenuIcon(item.name)" class="w-5 h-5 mr-3" />
            <span>{{ item.name }}</span>
            <span class="ml-auto">
              <ChevronRightIcon class="h-4 w-4" />
            </span>
          </RouterLink>
          <RouterLink
            to="/booking"
            @click="headerState.isOpen = false"
            class="mt-4 flex justify-center items-center py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold"
          >
            <CalendarDaysIcon class="h-5 w-5 mr-2" />
            Booking Sekarang
          </RouterLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted} from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  // HomeIcon,
  // PhotoIcon,
  // InformationCircleIcon,
  // AdjustmentsHorizontalIcon,
  // EnvelopeIcon,
  // ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

// Import composables
import { useNavigation } from '@/composables/useNavigation'
import { useSearch } from '@/composables/useSearch'
import { useHeaderState } from '@/composables/useHeaderState'

// Initialize composables
const route = useRoute()
const headerState = useHeaderState()
const navigation = useNavigation(route, headerState)
const search = useSearch(headerState)
const searchState = search.state

// Mobile search input ref for focus handling
const mobileSearchInput = ref(null)

// Set up search input focus when mobile search is opened
search.setMobileSearchInput(mobileSearchInput)

// Handle scroll events
onMounted(() => {
  window.addEventListener('scroll', headerState.handleScroll)
  headerState.handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', headerState.handleScroll)
})
</script>

<style scoped>
/* Gradient animation for the booking button on hover */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Basic animations for menus */
@keyframes slideInDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Logo glow effect */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(250, 204, 21, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(250, 204, 21, 0);
  }
}

.logo-glow {
  animation: glow 2s infinite;
}

.logo-pulse {
  animation: pulse-subtle 4s infinite;
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 1px rgba(234, 179, 8, 0.8));
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(234, 179, 8, 0.9));
  }
  100% {
    filter: drop-shadow(0 0 1px rgba(234, 179, 8, 0.8));
  }
}

@keyframes pulse-subtle {
  0% {
    opacity: 0.4;
    transform: scale(0.97);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.03);
  }
  100% {
    opacity: 0.4;
    transform: scale(0.97);
  }
}
</style>
