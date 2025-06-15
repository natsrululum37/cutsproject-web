<template>
  <section
    class="view-section section-content"
    aria-label="Daftar Layanan dan Harga"
    id="main-content"
  >
    <div class="flex items-center mb-6 justify-center gap-4">
      <slot name="service-logo"></slot>
      <div>
        <div class="flex items-center gap-2">
          <span class="section-title" tabindex="0">Layanan & Harga</span>
        </div>
        <div class="text-xs text-white mt-0.5 ml-[2px]">Berlaku di Semua Cabang</div>
      </div>
    </div>

    <!-- SERVICE GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch mb-8">
      <!-- General Service -->
      <div class="card-dark flex flex-col h-[320px] sm:h-[340px]">
        <div class="flex-1 flex flex-col p-3 sm:p-4">
          <h2 class="text-yellow-400 text-lg font-bold mb-3 sm:mb-4">
            {{ services.general.title.replace('General Service', 'Layanan Umum') }}
          </h2>
          <div class="space-y-3 sm:space-y-4 flex-1 overflow-auto">
            <template v-if="services.general && services.general.items">
              <div
                v-for="(service, index) in services.general.items"
                :key="index"
                class="flex justify-between mb-1 sm:mb-2 pb-1 sm:pb-2 border-b border-gray-700 last:border-b-0"
              >
                <div>
                  <div class="font-semibold text-sm sm:text-base">{{ service.name }}</div>
                  <div class="text-xs text-gray-300">{{ service.description }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-400">Mulai</div>
                  <div class="font-bold text-yellow-400 text-sm sm:text-base">
                    {{ service.price }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Service Image -->
      <div class="flex flex-col justify-center items-center h-[320px] sm:h-[340px]">
        <img
          src="/images/service/haircut.webp"
          alt="Ilustrasi layanan potong rambut di barbershop"
          class="w-full h-full object-cover rounded-lg shadow-lg border-4 border-zinc-900 aspect-video"
          loading="lazy"
        />
      </div>

      <!-- Pro Services -->
      <div class="card-dark flex flex-col h-[320px] sm:h-[340px]">
        <div class="flex-1 flex flex-col p-3 sm:p-4">
          <h2 class="text-yellow-400 text-lg font-bold mb-3 sm:mb-4">
            Layanan Pro &amp; Pewarnaan
          </h2>
          <div class="space-y-3 sm:space-y-4 flex-1 overflow-auto">
            <template v-if="services.proSculpting && services.proSculpting.items">
              <div
                v-for="(service, index) in services.proSculpting.items"
                :key="index"
                class="flex justify-between mb-1 sm:mb-2 pb-1 sm:pb-2 border-b border-gray-700 last:border-b-0"
              >
                <div>
                  <div class="font-semibold text-sm sm:text-base">{{ service.name }}</div>
                  <div class="text-xs text-gray-300">{{ service.description }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-400">Mulai</div>
                  <div class="font-bold text-yellow-400 text-sm sm:text-base">
                    {{ service.price }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- SECOND ROW -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
      <!-- LEFT: Hair Care Image -->
      <div class="flex flex-col justify-center items-center h-[320px] sm:h-[340px]">
        <img
          src="/images/service/hair-wash.webp"
          alt="Ilustrasi layanan hair wash di barbershop"
          class="w-full h-full object-cover rounded-lg shadow-lg border-4 border-zinc-900 aspect-video"
          loading="lazy"
        />
      </div>

      <!-- CENTER: Hair Care & Styling Product -->
      <div class="card-dark flex flex-col h-[320px] sm:h-[340px]">
        <div class="flex-1 flex flex-col p-3 sm:p-4">
          <h2 class="text-yellow-400 text-lg font-bold mb-3 sm:mb-4">
            Perawatan &amp; Produk Styling Rambut
          </h2>
          <div class="space-y-3 sm:space-y-4 flex-1 overflow-auto">
            <template v-if="services.hairCare && services.hairCare.items">
              <div
                v-for="(service, index) in services.hairCare.items"
                :key="index"
                class="flex justify-between mb-1 sm:mb-2 pb-1 sm:pb-2 border-b border-gray-700 last:border-b-0"
              >
                <div>
                  <div class="font-semibold text-sm sm:text-base">{{ service.name }}</div>
                  <div class="text-xs text-gray-300">{{ service.description }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-400">
                    {{ service.price.startsWith('Mulai') ? '' : 'Mulai' }}
                  </div>
                  <div class="font-bold text-yellow-400 text-sm sm:text-base">
                    {{ service.price }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- RIGHT: Other Services -->
      <div class="card-dark flex flex-col h-[320px] sm:h-[340px]">
        <div class="flex-1 flex flex-col p-3 sm:p-4">
          <h2 class="text-yellow-400 text-lg font-bold mb-3 sm:mb-4">Layanan Premium</h2>
          <div class="space-y-3 sm:space-y-4 flex-1 overflow-auto">
            <template v-if="services.premium && services.premium.items">
              <div
                v-for="(service, index) in services.premium.items"
                :key="index"
                class="flex justify-between mb-1 sm:mb-2 pb-1 sm:pb-2 border-b border-gray-700 last:border-b-0"
              >
                <div>
                  <div class="font-semibold text-sm sm:text-base">{{ service.name }}</div>
                  <div class="text-xs text-gray-300">{{ service.description }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-400">Mulai</div>
                  <div class="font-bold text-yellow-400 text-sm sm:text-base">
                    {{ service.price }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useServicesStore } from '@/stores/client/services'
const { services } = useServicesStore()
</script>
