// src/composables/useNavigation.js
import { reactive } from 'vue'
import {
  HomeIcon,
  PhotoIcon,
  InformationCircleIcon,
  AdjustmentsHorizontalIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

export function useNavigation(route, headerState) {
  // Enhanced menu items with additional data for future features
  const menu = [
    { name: 'Beranda', link: '/', description: 'Halaman utama website' },
    { name: 'Galeri', link: '/gallery', description: 'Koleksi hasil kerja terbaik kami' },
    { name: 'Tentang', link: '/about', description: 'Cerita dan misi kami' },
    { name: 'Layanan', link: '/service', description: 'Daftar lengkap layanan salon' },
    { name: 'Kontak', link: '/contact', description: 'Hubungi kami untuk informasi' },
    { name: 'Ulasan', link: '/review', description: 'Lihat ulasan pelanggan kami' },
  ]

  // Check if current route matches given path
  const isActiveRoute = (path) => route.path === path

  // Menu icons for mobile view
  const getMenuIcon = (menuName) => {
    switch (menuName) {
      case 'Beranda':
        return HomeIcon
      case 'Galeri':
        return PhotoIcon
      case 'Tentang':
        return InformationCircleIcon
      case 'Layanan':
        return AdjustmentsHorizontalIcon
      case 'Kontak':
        return EnvelopeIcon
      case 'Ulasan':
        return ChatBubbleLeftRightIcon
      default:
        return ChevronRightIcon
    }
  }

  // Toggle menu visibility
  const toggleMenu = () => {
    headerState.isOpen = !headerState.isOpen
  }

  return reactive({
    menu,
    isActiveRoute,
    getMenuIcon,
    toggleMenu
  })
}
