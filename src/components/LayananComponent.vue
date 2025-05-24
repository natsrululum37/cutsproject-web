<template>
  <section class="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-28 px-6" id="layanan">
    <div class="max-w-7xl mx-auto text-center mb-24 px-4">
      <h2 class="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">Layanan Kami</h2>
      <p class="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
        Dapatkan layanan grooming premium dengan barber berpengalaman, suasana nyaman, dan produk
        berkualitas tinggi yang membuat Anda tampil maksimal setiap hari.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-4" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out">
      <!-- Haircut -->
      <div class="bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay="100">
        <div class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
          <img src="/images/haircut.png" alt="Haircut Icon" class="w-10 h-10 object-contain" loading="lazy" />
        </div>
        <h3 class="text-3xl font-semibold mb-3 drop-shadow-md">Haircut</h3>
        <p class="text-gray-400 text-base leading-relaxed">
          Potongan rambut presisi, klasik dan modern, disesuaikan bentuk wajah dan gaya pribadi Anda.
        </p>
      </div>

      <!-- Shaving -->
      <div class="bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-lg hover:shadow-green-400/50 transform hover:scale-105 transition duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay="200">
        <div class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
          <img src="/images/shaving.png" alt="Shaving Icon" class="w-10 h-10 object-contain" loading="lazy" />
        </div>
        <h3 class="text-3xl font-semibold mb-3 drop-shadow-md">Shaving</h3>
        <p class="text-gray-400 text-base leading-relaxed">
          Cukur bersih atau trim rapi dengan teknik barber tradisional dan alat higienis.
        </p>
      </div>

      <!-- Hair Coloring -->
      <div class="bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105 transition duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay="300">
        <div class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
          <img src="/images/haircoloring.png" alt="Hair Coloring Icon" class="w-10 h-10 object-contain" loading="lazy" />
        </div>
        <h3 class="text-3xl font-semibold mb-3 drop-shadow-md">Hair Coloring</h3>
        <p class="text-gray-400 text-base leading-relaxed">
          Pewarnaan rambut aman dan tahan lama, mulai dari highlight hingga full color.
        </p>
      </div>

      <!-- Facial -->
      <div class="bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-lg hover:shadow-pink-400/50 transform hover:scale-105 transition duration-500 cursor-pointer" data-aos="fade-up" data-aos-delay="400">
        <div class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
          <img src="/images/facial.png" alt="Facial Icon" class="w-10 h-10 object-contain" loading="lazy" />
        </div>
        <h3 class="text-3xl font-semibold mb-3 drop-shadow-md">Facial</h3>
        <p class="text-gray-400 text-base leading-relaxed">
          Perawatan kulit wajah dengan teknik relaksasi dan produk terbaik untuk hasil maksimal.
        </p>
      </div>
    </div>

    <!-- CTA Button -->
    <div class="text-center mt-20">
      <a href="/reservation" class="inline-block bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 text-black font-bold text-lg px-10 py-4 rounded-full shadow-lg transition transform hover:-translate-y-1 active:scale-95" role="button" aria-label="Booking Sekarang">
        Booking Sekarang
      </a>
    </div>

    <!-- Service & Price Title (with slot for logo) -->
    <div class="flex items-center mb-6 justify-center gap-4 mt-24">
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
        <img :src="img('haircut.webp')" alt="Haircut" class="w-full h-48 object-cover rounded-lg shadow-md border-4 border-black" />
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
        <img :src="img('hair-wash.webp')" alt="Hair Wash" class="w-full h-40 object-cover rounded-lg shadow-md border-4 border-black" />
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
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 800,
  once: true,
})
</script>
