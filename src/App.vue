<script setup>
import Header from './components/HeaDer.vue'
import Footer from './components/FooTer.vue'
</script>

<!-- src/App.vue -->
<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header />

    <main class="flex-grow p-4">
      <RouterView />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
#app {
  font-family: sans-serif;
}
</style>
