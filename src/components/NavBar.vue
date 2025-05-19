<template>
  <nav class="bg-black text-white p-4 flex justify-between items-center relative">
    <!-- Logo dan Judul -->
    <div class="flex items-center space-x-2">
      <img src="/icon.png" alt="Logo" class="w-8 h-8" />
      <h1 class="text-xl font-bold">CutsProject</h1>
    </div>

    <!-- Hamburger Menu Button -->
    <button
      class="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-400"
      @click="toggleMenu"
      aria-label="Toggle navigation menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-800 dark:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Menu Links -->
    <ul
      :class="[
        showMenu ? 'block' : 'hidden',
        'md:flex md:space-x-6 absolute md:static top-[100%] inset-x-0 w-full md:w-auto bg-black md:bg-transparent z-50',
        'flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 p-4 md:p-0'
      ]"
    >
      <li @click="toggleMenu"><router-link to="/">Home</router-link></li>
      <li @click="toggleMenu"><router-link to="/about">About</router-link></li>
      <li @click="toggleMenu"><router-link to="/services">Services</router-link></li>
      <li @click="toggleMenu"><router-link to="/gallery">Gallery</router-link></li>
      <li @click="toggleMenu"><router-link to="/contact">Contact</router-link></li>
      <li @click="toggleMenu"><router-link to="/reservation">Reservation</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const showMenu = ref(false)
function toggleMenu() {
  showMenu.value = !showMenu.value
}
</script>

<style scoped>
ul {
  transition: all 0.3s ease-in-out;
}
</style>
