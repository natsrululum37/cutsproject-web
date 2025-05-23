<template>
  <section class="bg-black text-white py-8 px-2 md:px-8 w-full">
    <!-- MISI | VISI -->
    <div class="max-w-2xl mx-auto text-center mb-8">
      <h2 class="text-2xl font-bold tracking-wider mb-2">MISI & VISI</h2>
      <p class="text-gray-300 text-sm leading-relaxed mb-4">
        Bagi sebagian laki-laki, masalah hidup terasa rumit. Bawa diri sendiri ke barber adalah
        solusi pertama.<br />
        Kami bangga atas misi sederhana kami: menyediakan barbershop yang nyaman, bersih, dan
        profesional untuk semua kalangan.<br />
        <br />
        Barbershop kami didesain untuk memberikan pelayanan terbaik mulai dari gaya klasik, modern,
        hingga perawatan, dengan barber profesional dan produk terbaik. Kami selalu menjaga kualitas
        dan kebersihan demi kenyamanan pelanggan.
      </p>
    </div>
    <!-- Lokasi -->
    <div class="flex flex-col items-center gap-2 mb-8">
      <div class="flex items-center gap-3">
        <div
          class="bg-yellow-400 text-black rounded-full w-12 h-12 flex items-center justify-center text-xl font-extrabold shadow-lg border-2 border-yellow-300"
        >
          <span>4+</span>
        </div>
        <div>
          <div class="text-2xl font-semibold text-white">Lokasi</div>
          <div class="text-xs text-gray-400 -mt-1">Di Semarang</div>
        </div>
      </div>
      <div class="flex flex-wrap justify-center mt-1 text-xs text-gray-300 gap-x-4 gap-y-0">
        <span>CUTS 1 - Jl. Pemuda No.1 (Simpang Lima)</span>
        <span>CUTS 2 - Jl. Pandanaran No.34</span>
        <span>CUTS 3 - Jl. S. Parman No.5</span>
        <span>CUTS 4 - Jl. Majapahit, Tlogosari</span>
      </div>
    </div>
    <!-- Gambar Toko -->
    <div class="flex justify-center mb-8">
      <img
        :src="img('barbershop.webp')"
        alt="Foto Toko"
        class="rounded-lg shadow-lg w-full max-w-md object-cover"
      />
    </div>

    <!-- Service & Price Title (with slot for logo) -->
    <div class="flex items-center mb-6 justify-center gap-4">
      <!-- Slot for logo/icon -->
      <slot name="service-logo"></slot>
      <div>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-white">Service &amp; Price</span>
        </div>
        <div class="text-xs text-white mt-0.5 ml-[2px]">All Store Wide</div>
      </div>
    </div>

    <!-- SERVICE GRID -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-8">
      <!-- LEFT: General Service -->
      <div class="flex flex-col justify-between bg-black border border-gray-700 rounded-lg p-4">
        <div>
          <h3 class="text-yellow-400 text-base font-bold mb-4">General Service</h3>
          <div class="mb-3">
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
      <!-- CENTER: Service Image -->
      <div class="flex flex-col justify-center items-center gap-6">
        <img
          :src="img('haircut.webp')"
          alt="Haircut"
          class="w-full h-48 object-cover rounded-lg shadow-md border-4 border-black"
        />
      </div>
      <!-- RIGHT: Pro Services -->
      <div class="flex flex-col justify-between bg-black border border-gray-700 rounded-lg p-4">
        <div>
          <h3 class="text-yellow-400 text-base font-bold mb-4">Pro Sculpting & Coloring</h3>
          <div class="mb-3">
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
    <!-- SECOND ROW: Hair Care & Styling Product -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
      <!-- LEFT: Hair Care Image -->
      <div class="flex flex-col justify-center items-center">
        <img
          :src="img('hair-wash.webp')"
          alt="Hair Wash"
          class="w-full h-40 object-cover rounded-lg shadow-md border-4 border-black"
        />
      </div>
      <!-- CENTER: Hair Care & Styling Product -->
      <div class="flex flex-col justify-between bg-black border border-gray-700 rounded-lg p-4">
        <div>
          <h3 class="text-yellow-400 text-base font-bold mb-4">Hair Care & Styling Product</h3>
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
      <!-- RIGHT: Pro Services (repeat) -->
      <div class="flex flex-col justify-between bg-black border border-gray-700 rounded-lg p-4">
        <div>
          <h3 class="text-yellow-400 text-base font-bold mb-4">Pro Sculpting & Coloring</h3>
          <div class="mb-3">
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
  </section>
</template>

<script setup>
// Gunakan relative path, asumsi file ini ada di src/components/ dan gambar ada di src/assets/images/home-pict/
const img = (file) => new URL(`../assets/images/home-pict/${file}`, import.meta.url).href
</script>
