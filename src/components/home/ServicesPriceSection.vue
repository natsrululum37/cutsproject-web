<template>
  <section class="view-section section-content" aria-label="Services & Pricing">
    <div class="flex items-center mb-6 justify-center gap-4">
      <slot name="service-logo"></slot>
      <div>
        <div class="flex items-center gap-2">
          <span class="section-title">Service &amp; Price</span>
        </div>
        <div class="text-xs text-white mt-0.5 ml-[2px]">All Store Wide</div>
      </div>
    </div>

    <!-- SERVICE GRID -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-8">
      <!-- General Service -->
      <div class="card-dark">
        <div>
          <h3 class="text-yellow-400 text-lg font-bold mb-4">{{ services.general.title }}</h3>
          <div class="space-y-4">
            <div v-for="(service, index) in services.general.items"
                 :key="index"
                 class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">{{ service.name }}</div>
                <div class="text-xs text-gray-300">{{ service.description }}</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">{{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Image -->
      <div class="flex flex-col justify-center items-center gap-6">
        <img
          src="/images/service/haircut.webp"
          alt="Haircut"
          class="w-full h-48 object-cover rounded-lg shadow-lg border-4 border-zinc-900"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- Pro Services -->
      <div class="card-dark">
        <div>
          <h3 class="text-yellow-400 text-lg font-bold mb-4">Pro Sculpting &amp; Coloring</h3>
          <div class="space-y-4">
            <div v-for="(service, index) in services.proSculpting.items" :key="index" class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">{{ service.name }}</div>
                <div class="text-xs text-gray-300">{{ service.description }}</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">{{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECOND ROW -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
      <!-- LEFT: Hair Care Image -->
      <div class="flex flex-col justify-center items-center">
        <img
          src="/images/service/hair-wash.webp"
          alt="Hair Wash"
          class="w-full h-40 object-cover rounded-lg shadow-lg border-4 border-zinc-900"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- CENTER: Hair Care & Styling Product -->
      <div class="card-dark">
        <div>
          <h3 class="text-yellow-400 text-lg font-bold mb-4">Hair Care &amp; Styling Product</h3>
          <div class="space-y-4">
            <div v-for="(service, index) in services.hairCare.items" :key="index" class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">{{ service.name }}</div>
                <div class="text-xs text-gray-300">{{ service.description }}</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">{{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Other Services -->
      <div class="card-dark">
        <div>
          <h3 class="text-yellow-400 text-lg font-bold mb-4">Premium Service</h3>
          <div class="space-y-4">
            <div v-for="(service, index) in services.premium.items" :key="index" class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">{{ service.name }}</div>
                <div class="text-xs text-gray-300">{{ service.description }}</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">{{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useServicesStore } from '@/stores/services'
const { services } = useServicesStore()
</script>
