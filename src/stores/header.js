import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    isScrolled: false,
    isMobileMenuOpen: false,
    isMobileSearchOpen: false,
  }),
  actions: {
    setScrolled(val) {
      this.isScrolled = val
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    toggleMobileSearch() {
      this.isMobileSearchOpen = !this.isMobileSearchOpen
    },
    setMobileMenuOpen(val) {
      this.isMobileMenuOpen = val
    },
    setMobileSearchOpen(val) {
      this.isMobileSearchOpen = val
    },
  },
})
