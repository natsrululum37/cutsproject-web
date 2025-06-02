// stores/navigation.js
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    menu: [
      { name: 'Beranda', link: '/', icon: 'HomeIcon' },
      { name: 'Tentang', link: '/about', icon: 'InformationCircleIcon' },
      { name: 'Layanan', link: '/services', icon: 'ScissorsIcon' },
      { name: 'Galeri', link: '/gallery', icon: 'PhotoIcon' },
      { name: 'Kontak', link: '/contact', icon: 'PhoneIcon' },
      { name: 'Ulasan', link: '/review', icon: 'StarIcon' },
      { name: 'Reservasi', link: '/reservation', icon: 'CalendarIcon' },
    ],
    activeRoute: '/',
  }),

  getters: {
    // Get menu item by path
    getMenuItemByPath: (state) => (path) => {
      return state.menu.find((item) => item.link === path)
    },

    // Get menu items for search/filtering
    menuForSearch: (state) => {
      return state.menu.map((item, idx) => ({
        id: `menu-${idx}`,
        name: item.name,
        category: 'Menu',
        path: item.link,
        keywords: [item.name.toLowerCase()],
        icon: item.icon,
      }))
    },

    // Check if any path matches current route
    hasActiveRoute: (state) => {
      return state.activeRoute !== null && state.activeRoute !== ''
    },
  },

  actions: {
    setActiveRoute(path) {
      this.activeRoute = path || '/'
    },

    isActiveRoute(path) {
      if (!path) return false

      // Exact match
      if (this.activeRoute === path) return true

      // Handle nested routes (e.g., /services/detail should match /services)
      if (path !== '/' && this.activeRoute?.startsWith(path + '/')) return true

      return false
    },

    // Update menu items dynamically
    updateMenuItem(index, newItem) {
      if (index >= 0 && index < this.menu.length) {
        this.menu[index] = { ...this.menu[index], ...newItem }
      }
    },

    // Add new menu item
    addMenuItem(item) {
      if (item && item.name && item.link) {
        this.menu.push({
          icon: 'HomeIcon',
          ...item,
        })
      }
    },

    // Remove menu item
    removeMenuItem(index) {
      if (index >= 0 && index < this.menu.length) {
        this.menu.splice(index, 1)
      }
    },
  },
})
