<template>
  <footer class="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {{ year }} <a href="https://flowbite.com/" class="hover:underline">TEST</a>. All Rights
        Reserved.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
      >
        <li v-for="(link, index) in links" :key="index">
          <a :href="link.href" class="hover:underline me-4 md:me-6">{{ link.text }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = new Date().getFullYear()

const links = ref([
  { text: 'About', href: '#' },
  { text: 'Privacy Policy', href: '#' },
  { text: 'Licensing', href: '#' },
  { text: 'Contact', href: '#' },
])
</script>
