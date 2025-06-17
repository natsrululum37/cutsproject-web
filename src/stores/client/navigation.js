// stores/navigation.js
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    user: null, // Status login pengguna
    menu: [
      { name: 'Beranda', link: '/', icon: 'HomeIcon' },
      { name: 'Tentang', link: '/about', icon: 'InformationCircleIcon' },
      { name: 'Layanan', link: '/services', icon: 'ScissorsIcon' },
      { name: 'Galeri', link: '/gallery', icon: 'PhotoIcon' },
      { name: 'Kontak', link: '/contact', icon: 'PhoneIcon' },
      { name: 'Ulasan', link: '/review', icon: 'StarIcon' },
      { name: 'Reservasi', link: '/reservation', icon: 'CalendarIcon' },
      { name: 'Login', link: '/login', icon: 'UserIcon' } // Akan diganti jadi "Profil" jika login
    ],
    activeRoute: '/',
  }),

  getters: {
    // Dinamis: Ganti Login jadi Profil jika user login
    dynamicMenu(state) {
      const menuCopy = [...state.menu]
      if (state.user) {
        const loginIndex = menuCopy.findIndex(item => item.link === '/login')
        if (loginIndex !== -1) {
          menuCopy[loginIndex] = {
            name: 'Profil',
            link: '/profile',
            icon: 'UserIcon'
          }
        }
      }
      return menuCopy
    },

    getMenuItemByPath: (state) => (path) => {
      return state.menu.find((item) => {
        if (!path) return false
        if (item.link === path) return true
        if (path !== '/' && path.startsWith(item.link + '/')) return true
        return false
      })
    },

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

    hasActiveRoute: (state) => {
      return state.activeRoute !== null && state.activeRoute !== ''
    },
  },

  actions: {
    // Login: set user data
    setUser(userData) {
      this.user = userData
    },

    // Logout: hapus user dan arahkan ke halaman utama
    logout() {
      this.user = null
      this.setActiveRoute('/')
    },

    // Ganti route aktif
    setActiveRoute(path) {
      if (!path) return
      const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
      this.activeRoute = normalizedPath
    },

    isActiveRoute(path) {
      if (!path || !this.activeRoute) return false

      const normalizedCurrentPath =
        this.activeRoute.endsWith('/') && this.activeRoute !== '/'
          ? this.activeRoute.slice(0, -1)
          : this.activeRoute
      const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path

      if (normalizedCurrentPath === normalizedPath) return true
      if (path !== '/' && normalizedCurrentPath.startsWith(normalizedPath + '/')) return true

      return false
    },

    updateMenuItem(index, newItem) {
      if (index >= 0 && index < this.menu.length) {
        this.menu[index] = { ...this.menu[index], ...newItem }
      }
    },

    addMenuItem(item) {
      if (item?.name && item?.link) {
        this.menu.push({
          icon: item.icon || 'HomeIcon',
          ...item,
        })
      }
    },

    removeMenuItem(index) {
      if (index >= 0 && index < this.menu.length) {
        this.menu.splice(index, 1)
      }
    },
  },
})
