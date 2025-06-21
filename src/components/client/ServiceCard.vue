<template>
  <div
    :class="[
      'bg-zinc-900 border border-gray-800 rounded-2xl p-6 sm:p-8 text-center shadow-xl transform transition duration-500',
      hoverColor,
      'hover:-translate-y-1'
    ]"
    
    style="cursor: pointer;"
  >
    <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 bg-white rounded-full flex items-center justify-center">
      <img :src="icon" :alt="title + ' Icon'" class="w-8 h-8 sm:w-10 sm:h-10 object-contain" loading="lazy" />
    </div>
    <h3 class="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{{ title }}</h3>
    <p class="text-gray-400 text-sm sm:text-base leading-relaxed">{{ desc }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  desc: String,
  hoverColor: String,
  delay: Number,
})
</script>