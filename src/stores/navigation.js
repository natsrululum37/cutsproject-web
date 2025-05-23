import { defineStore } from 'pinia'
// stores/navigation.js
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
  actions: {
    setActiveRoute(path) { this.activeRoute = path },
    isActiveRoute(path) { return this.activeRoute === path },
  },
})
