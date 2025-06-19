<template>
  <section class="view-section section-content" aria-label="Services & Pricing">
    <div class="flex items-center mb-8 justify-center gap-4">
      <slot name="service-logo"></slot>
      <div>
        <div class="flex items-center gap-2">
          <TagIcon class="h-6 w-6 text-yellow-400" aria-hidden="true" />
          <span class="section-title bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Service & Price</span>
        </div>
        <div class="text-xs text-gray-300 mt-0.5 ml-[2px] font-medium">All Store Wide</div>
      </div>
    </div>

    <!-- SERVICE GRID -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <!-- General Service -->
      <div class="group relative overflow-hidden rounded-xl bg-black border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20 h-full min-h-[400px] flex flex-col">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative p-6 flex-1 flex flex-col">
          <div class="flex items-center gap-2 mb-5">
            <ScissorsIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <h3 class="text-yellow-400 text-lg font-bold">{{ services.general.title }}</h3>
          </div>
          <div class="space-y-4 flex-1">
            <div v-for="(service, index) in services.general.items" :key="index" class="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/60 transition-colors duration-200 group/item border border-gray-800/50">
              <component :is="service.icon" class="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-white group-hover/item:text-gray-100 transition-colors">{{ service.name }}</div>
                <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ service.description }}</div>
              </div>
              <div class="text-right ml-4 flex-shrink-0">
                <div class="text-xs text-gray-500 mb-1">Start from</div>
                <div class="font-bold text-yellow-400 text-sm">{{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Image -->
      <div class="group relative overflow-hidden rounded-xl bg-black border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20 h-full min-h-[400px] flex flex-col">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative p-6 flex-1 flex items-center justify-center">
          <div class="relative group w-full h-full">
            <div class="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <img src="/images/service/haircut.webp" alt="Haircut" class="relative w-full h-full object-cover rounded-xl shadow-xl border border-gray-700/50 group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <!-- Pro Services -->
      <div class="group relative overflow-hidden rounded-xl bg-black border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20 h-full min-h-[400px] flex flex-col">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative p-6 flex-1 flex flex-col">
          <div class="flex items-center gap-2 mb-5">
            <PaintBrushIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <h3 class="text-yellow-400 text-lg font-bold">Pro Sculpting & Coloring</h3>
          </div>
          <div class="space-y-4 flex-1">
            <div v-for="(service, index) in services.proSculpting.items" :key="index" class="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/60 transition-colors duration-200 group/item border border-gray-800/50">
              <component :is="service.icon" class="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-white group-hover/item:text-gray-100 transition-colors">{{ service.name }}</div>
                <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ service.description }}</div>
              </div>
              <div class="text-right ml-4 flex-shrink-0">
                <div class="text-xs text-gray-500 mb-1">Start from</div>
                <div class="font-bold text-yellow-400 text-sm">{{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECOND ROW -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- LEFT: Hair Care Image -->
      <div class="group relative overflow-hidden rounded-xl bg-black border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20 h-full min-h-[400px] flex flex-col">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative p-6 flex-1 flex items-center justify-center">
          <div class="relative group w-full h-full">
            <div class="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <img src="/images/service/hair-wash.webp" alt="Hair Wash" class="relative w-full h-full object-cover rounded-xl shadow-xl border border-gray-700/50 group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <!-- CENTER: Hair Care & Styling Product -->
      <div class="group relative overflow-hidden rounded-xl bg-black border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20 h-full min-h-[400px] flex flex-col">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative p-6 flex-1 flex flex-col">
          <div class="flex items-center gap-2 mb-5">
            <SparklesIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <h3 class="text-yellow-400 text-lg font-bold">Hair Care & Styling Product</h3>
          </div>
          <div class="space-y-4 flex-1">
            <div v-for="(service, index) in services.hairCare.items" :key="index" class="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/60 transition-colors duration-200 group/item border border-gray-800/50">
              <component :is="service.icon" class="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-white group-hover/item:text-gray-100 transition-colors">{{ service.name }}</div>
                <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ service.description }}</div>
              </div>
              <div class="text-right ml-4 flex-shrink-0">
                <div class="text-xs text-gray-500 mb-1">Start from</div>
                <div class="font-bold text-yellow-400 text-sm">{{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Premium Services -->
      <div class="group relative overflow-hidden rounded-xl bg-black border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20 h-full min-h-[400px] flex flex-col">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative p-6 flex-1 flex flex-col">
          <div class="flex items-center gap-2 mb-5">
            <StarIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <h3 class="text-yellow-400 text-lg font-bold">Premium Service</h3>
          </div>
          <div class="space-y-4 flex-1">
            <div v-for="(service, index) in services.premium.items" :key="index" class="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/60 transition-colors duration-200 group/item border border-gray-800/50">
              <component :is="service.icon" class="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-white group-hover/item:text-gray-100 transition-colors">{{ service.name }}</div>
                <div class="text-xs text-gray-400 mt-1 leading-relaxed">{{ service.description }}</div>
              </div>
              <div class="text-right ml-4 flex-shrink-0">
                <div class="text-xs text-gray-500 mb-1">Start from</div>
                <div class="font-bold text-yellow-400 text-sm">{{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useServicesStore } from '@/stores/client/services.js'
import { TagIcon, ScissorsIcon, PaintBrushIcon, SparklesIcon, StarIcon } from '@heroicons/vue/24/solid'
const { services } = useServicesStore()
</script>