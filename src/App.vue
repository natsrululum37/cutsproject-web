<script setup>
import Header from './components/HeaderComponent.vue.vue'
import Footer from './components/FooTer.vue'
</script>

<!-- src/App.vue -->
<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header />

    <main>
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
