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
    // Get menu item by path with better matching
    getMenuItemByPath: (state) => (path) => {
      return state.menu.find((item) => {
        if (!path) return false
        if (item.link === path) return true
        if (path !== '/' && path.startsWith(item.link + '/')) return true
        return false
      })
    }, // Mendapatkan item menu untuk pencarian/filter
    menuForSearch: (state) => {
      return state.menu.map((item, idx) => ({
        id: `menu-${idx}`,
        name: item.name,
        category: 'Menu Navigasi',
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
      if (!path) return
      // Handle trailing slashes consistently
      const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
      this.activeRoute = normalizedPath
    },

    isActiveRoute(path) {
      if (!path || !this.activeRoute) return false

      // Normalize paths (handle trailing slashes)
      const normalizedCurrentPath =
        this.activeRoute.endsWith('/') && this.activeRoute !== '/'
          ? this.activeRoute.slice(0, -1)
          : this.activeRoute
      const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path

      // Exact match
      if (normalizedCurrentPath === normalizedPath) return true

      // Handle nested routes
      if (path !== '/' && normalizedCurrentPath.startsWith(normalizedPath + '/')) return true

      return false
    },

    // Update menu item
    updateMenuItem(index, newItem) {
      if (index >= 0 && index < this.menu.length) {
        this.menu[index] = { ...this.menu[index], ...newItem }
      }
    },

    // Add menu item
    addMenuItem(item) {
      if (item?.name && item?.link) {
        this.menu.push({
          icon: item.icon || 'HomeIcon', // Default icon
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
