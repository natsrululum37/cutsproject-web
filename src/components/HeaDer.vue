<template>
  <header class="bg-black">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <router-link to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Barber Mini</span>
          <div class="flex items-center">
            <img class="h-10 w-auto" src="/src/assets/lightning-bolt-3d.png" alt="Logo" />
            <span class="ml-2 text-xl font-bold text-yellow-500">CUTSPROJECT</span>
          </div>
        </router-link>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Buka menu utama</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-8">
        <router-link to="/" class="text-sm font-semibold text-gray-300 hover:text-yellow-500"
          >Beranda</router-link
        >
        <router-link
          to="/services"
          class="text-sm font-semibold text-gray-300 hover:text-yellow-500"
          >Layanan</router-link
        >
        <router-link to="/gallery" class="text-sm font-semibold text-gray-300 hover:text-yellow-500"
          >Galeri</router-link
        >
        <router-link to="/about" class="text-sm font-semibold text-gray-300 hover:text-yellow-500"
          >Tentang Kami</router-link
        >
        <router-link to="/contact" class="text-sm font-semibold text-gray-300 hover:text-yellow-500"
          >Kontak</router-link
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <router-link
          to="/reservation"
          class="rounded-md bg-yellow-500 px-3.5 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-600"
        >
          Reservasi
        </router-link>
      </div>
    </nav>

    <!-- Menu Mobile -->
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <router-link to="/" class="-m-1.5 p-1.5" @click="mobileMenuOpen = false">
            <span class="sr-only">Barber Mini</span>
            <div class="flex items-center">
              <img class="h-8 w-auto" src="/src/assets/lightning-bolt-3d.png" alt="Logo" />
              <span class="ml-2 text-lg font-bold text-yellow-500">BARBER MINI</span>
            </div>
          </router-link>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-300"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Tutup menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-700">
            <div class="space-y-2 py-6">
              <router-link
                to="/"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-300 hover:bg-gray-800 hover:text-yellow-500"
                @click="mobileMenuOpen = false"
                >Beranda</router-link
              >
              <router-link
                to="/services"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-300 hover:bg-gray-800 hover:text-yellow-500"
                @click="mobileMenuOpen = false"
                >Layanan</router-link
              >
              <router-link
                to="/gallery"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-300 hover:bg-gray-800 hover:text-yellow-500"
                @click="mobileMenuOpen = false"
                >Galeri</router-link
              >
              <router-link
                to="/about"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-300 hover:bg-gray-800 hover:text-yellow-500"
                @click="mobileMenuOpen = false"
                >Tentang Kami</router-link
              >
              <router-link
                to="/contact"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-300 hover:bg-gray-800 hover:text-yellow-500"
                @click="mobileMenuOpen = false"
                >Kontak</router-link
              >
            </div>
            <div class="py-6">
              <router-link
                to="/reservation"
                class="-mx-3 block rounded-lg bg-yellow-500 px-3 py-2.5 text-center text-base font-semibold text-black hover:bg-yellow-600"
                @click="mobileMenuOpen = false"
                >Reservasi</router-link
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
</script>
