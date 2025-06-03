<template>
  <section class="view-section section-spacing">
    <div class="flex items-center mb-6 justify-center gap-4">
      <slot name="service-logo"></slot>
      <div>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-white">Service &amp; Price</span>
        </div>
        <div class="text-xs text-white mt-0.5 ml-[2px]">All Store Wide</div>
      </div>
    </div>

    <!-- SERVICE GRID -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-8">
      <!-- General Service -->
      <div class="flex flex-col justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div>
          <h3 class="text-yellow-400 text-lg font-bold mb-4">General Service</h3>
          <div class="space-y-4">
            <div class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">Hair Cut</div>
                <div class="text-xs text-gray-300">
                  Potong + Keramas + hair tonic + hot towel + Blow dry + full styling
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">50K</div>
              </div>
            </div>
            <div class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">Shaving</div>
                <div class="text-xs text-gray-300">Razor, facial shaves, full trim, dll</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">5K</div>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <div class="font-semibold">Treatments</div>
                <div class="text-xs text-gray-300">
                  Protein hair mask, creambath, dandruff scalling, totok wajah, pijat 15 menit, dll
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">20K</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Image -->
      <div class="flex flex-col justify-center items-center gap-6">
        <img
          src="/images/home-page/haircut.webp"
          alt="Haircut"
          class="w-full h-48 object-cover rounded-lg shadow-xl border-4 border-zinc-900"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- Pro Services -->
      <div class="flex flex-col justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div>
          <h3 class="text-yellow-400 text-lg font-bold mb-4">Pro Sculpting &amp; Coloring</h3>
          <div class="space-y-4">
            <div class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">Pro Sculpting</div>
                <div class="text-xs text-gray-300">
                  Pelurusan rambut permanen natural dengan 4 tahap proses
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">205K</div>
              </div>
            </div>
            <div class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">Paket Coloring</div>
                <div class="text-xs text-gray-300">Merk reguler, merk premium, merk exotic</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">188K</div>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <div class="font-semibold">Top Perming</div>
                <div class="text-xs text-gray-300">
                  Keriting permanen dengan tingkat ke keritingan yang bervariatif
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">196K</div>
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
          src="/images/home-page/hair-wash.webp"
          alt="Hair Wash"
          class="w-full h-40 object-cover rounded-lg shadow-md border-4 border-black"
          loading="lazy"
          decoding="async"
        />
      </div>
      <!-- CENTER: Hair Care & Styling Product -->
      <div class="flex flex-col justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div>
          <h3 class="text-yellow-400 text-lg font-bold mb-4">Hair Care & Styling Product</h3>
          <div class="mb-3">
            <div class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">Bro.Kil Styling</div>
                <div class="text-xs text-gray-300">
                  Valerian water based, slicker oil based, bonafide cream wax, urbanous clay
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">50K</div>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <div class="font-semibold">Bro.Kil Hair Treatment</div>
                <div class="text-xs text-gray-300">
                  Hair tonic, vitapom, men shampoo, conditioner, dll
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">30K</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- RIGHT: Other Services -->
      <div class="flex flex-col justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div>
          <h3 class="text-yellow-400 text-lg font-bold mb-4">Other Services</h3>
          <div class="space-y-4">
            <div class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">VIP Treatment</div>
                <div class="text-xs text-gray-300">
                  Full service dengan ruangan private dan layanan premium
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">250K</div>
              </div>
            </div>
            <div class="flex justify-between mb-2 pb-2 border-b border-gray-700">
              <div>
                <div class="font-semibold">Kids Haircut</div>
                <div class="text-xs text-gray-300">Khusus anak-anak usia 5-12 tahun</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">35K</div>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <div class="font-semibold">Special Package</div>
                <div class="text-xs text-gray-300">
                  Haircut + shaving + hair spa + pijat kepala
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Start from</div>
                <div class="font-bold text-yellow-400">100K</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ...existing code...
</script>
