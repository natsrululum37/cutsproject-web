<template>
  <div id="app" class="flex flex-col min-h-screen bg-black text-white">
    <!-- Header -->
    <Header />

    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/HeaderComponent.vue'
import Footer from './components/FooTer.vue'
</script>

<style>
#app {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
