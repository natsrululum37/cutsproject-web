<script setup>
import Header from './components/HeaDer.vue'
</script>

<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <main class="flex-grow">
      <RouterView />
    </main>
    <!-- <main class="p-4">
      <router-view />
    </main> -->
  </div>
</template>

<style>
#app {
  font-family: sans-serif;
}
</style>
