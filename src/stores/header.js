// stores/header.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHeaderStore = defineStore('header', () => {
  // State
  const isScrolled = ref(false)
  const isMobileMenuOpen = ref(false)
  const isMobileSearchOpen = ref(false)

  // Getters
  const headerClasses = computed(() => ({
    'bg-black/95 backdrop-blur-lg shadow-xl border-b border-zinc-800': isScrolled.value,
    'bg-gradient-to-r from-zinc-900/50 to-black/50': !isScrolled.value
  }))

  // Actions
  const setScrolled = (value) => {
    isScrolled.value = Boolean(value)
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    if (isMobileMenuOpen.value) {
      isMobileSearchOpen.value = false
    }
  }

  const toggleMobileSearch = () => {
    isMobileSearchOpen.value = !isMobileSearchOpen.value
    if (isMobileSearchOpen.value) {
      isMobileMenuOpen.value = false
    }
  }

  const setMobileMenuOpen = (value) => {
    isMobileMenuOpen.value = Boolean(value)
  }

  const setMobileSearchOpen = (value) => {
    isMobileSearchOpen.value = Boolean(value)
  }

  const closeAllMobileOverlays = () => {
    isMobileMenuOpen.value = false
    isMobileSearchOpen.value = false
  }

  return {
    // State
    isScrolled,
    isMobileMenuOpen,
    isMobileSearchOpen,

    // Getters
    headerClasses,

    // Actions
    setScrolled,
    toggleMobileMenu,
    toggleMobileSearch,
    setMobileMenuOpen,
    setMobileSearchOpen,
    closeAllMobileOverlays
  }
})
