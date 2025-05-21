<template>
  <section class="bg-[#121212] text-white">

    <!-- Hero Fullscreen Image -->
    <div class="relative w-full h-screen max-h-[500px] overflow-hidden">
      <img
        src="@/assets/images/CUTS.webp"
        alt="Haircut"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Subtitle After Hero Image -->
    <div class="bg-[#282424] text-center py-8 border-t border-[#333]">
      <h2 class="text-yellow-400 text-3xl font-bold">TENTANG KAMI</h2>
      <p class="text-sm tracking-widest text-white mt-1">CUTSPROJECT</p>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto py-20 px-4 space-y-12">

      <!-- Gambar Tengah & Teks Kiri-Kanan -->
      <div class="grid md:grid-cols-3 gap-6 items-start">
        <!-- Teks Kiri -->
        <div class="text-gray-300 text-base leading-relaxed text-justify">
          <p class="mb-6">
            <span class="float-left text-5xl font-bold text-yellow-400 pr-2 leading-none">C</span>
            utsProject Barber Shop telah menjadi simbol keahlian dan gaya dalam dunia grooming sejak didirikan pada tahun 2018.
            Dengan komitmen untuk memberikan pelayanan terbaik, kami menghadirkan pengalaman cukur dan perawatan rambut yang tak
            tertandingi. Setiap kunjungan di CutsProject dirancang untuk memenuhi kebutuhan individual pelanggan, mulai dari potongan
            klasik hingga gaya modern yang trendi, semuanya dikerjakan oleh tim barber profesional yang berpengalaman dan penuh dedikasi.
          </p>
        </div>

        <!-- Gambar Tengah -->
        <div class="flex justify-center">
          <img src="@/assets/images/cutsproject_place.webp" alt="CutsProject" class="w-full max-w-[300px] rounded" />
        </div>

        <!-- Teks Kanan -->
        <div class="text-gray-300 text-base leading-relaxed text-justify">
          <p class="mb-6">
            Lingkungan yang nyaman dan pelayanan ramah menjadi ciri khas CutsProject, menciptakan lingkungan di mana pelanggan dapat merasa
            rileks dan diperhatikan. Kami menggunakan peralatan berkualitas tinggi dan produk terbaik untuk memastikan hasil yang presisi
            dan memuaskan. Tidak hanya sekadar mencukur atau memotong rambut, kami berusaha untuk memahami kepribadian dan preferensi setiap
            pelanggan, sehingga setiap gaya yang diciptakan mampu mencerminkan karakter unik mereka.
          </p>
        </div>
      </div>

      <!-- Paragraf Tambahan -->
      <div class="text-gray-300 text-sm leading-relaxed space-y-4 text-justify">
        <p>
          Selama lebih dari enam tahun berkarya, CutsProject telah membangun reputasi sebagai barber shop terpercaya yang tidak hanya fokus pada
          hasil akhir, tetapi juga pada pengalaman pelanggan secara menyeluruh. Kami terus berinovasi dengan mengikuti perkembangan tren terkini
          sambil tetap mempertahankan teknik-teknik klasik yang telah teruji. Setiap kunjungan di CutsProject adalah sebuah perjalanan gaya mulai
          dari konsultasi mendetail tentang kebutuhan rambut dan gaya wajah, pemilihan produk yang tepat, hingga proses grooming yang dilakukan dengan
          ketelitian tinggi. Kami percaya bahwa penampilan yang baik akan membawa dampak positif pada kepercayaan diri seseorang, itulah mengapa kami
          tidak pernah berkompromi dengan kualitas. Bergabunglah dengan komunitas pelanggan setia kami dan buktikan sendiri mengapa CutsProject telah
          menjadi pilihan utama bagi mereka yang menginginkan transformasi gaya yang sempurna.
        </p>
      </div>

      <!-- FAQ dan Gambar Kursi -->
      <div class="grid md:grid-cols-2 gap-8 mt-12 items-center">
        <!-- Gambar Kursi -->
        <div class="flex justify-center">
          <img src="@/assets/images/kursi.webp" alt="Barber Chair" class="w-[4500px]" />
        </div>

        <!-- FAQ -->
        <div>
          <h3 class="text-5xl font-bold text-white mb-4">FAQ ABOUT CUTS PROJECT</h3>
          <div class="text-gray-300 text-sm space-y-4 leading-relaxed text-justify">
            <div>
              <p class="font-semibold text-white">Bisakah saya meminta gaya potongan rambut sesuai preferensi saya?</p>
              <p>Tentu saja! Tim barber profesional kami akan dengan senang hati mendengarkan keinginan Anda dan menyesuaikan potongan
                rambut sesuai gaya yang Anda inginkan. Kami selalu memprioritaskan konsultasi terlebih dahulu untuk memastikan hasil akhir
                sesuai dengan ekspektasi Anda, sekaligus memberikan saran profesional berdasarkan bentuk wajah dan tekstur rambut Anda.</p>
            </div>
            <div>
              <p class="font-semibold text-white">Haruskah saya reservasi terlebih dahulu atau bisa langsung datang?</p>
              <p>Kami sangat merekomendasikan untuk melakukan reservasi terlebih dahulu, terutama di akhir pekan atau hari libur, karena
                antrean bisa cukup panjang. Dengan reservasi, kami dapat memastikan Anda mendapatkan waktu yang tepat tanpa harus menunggu
                lama. Namun, jika Anda ingin langsung datang, kami akan berusaha melayani sebaik mungkin sesuai dengan ketersediaan slot yang ada.</p>
            </div>
            <div>
              <p class="font-semibold text-white">Apakah CUTS PROJECT hanya melayani pria atau bisa wanita juga?</p>
              <p>Saat ini, CUTS PROJECT adalah barbershop yang secara khusus didedikasikan untuk perawatan rambut dan grooming pria.
                Layanan kami dirancang untuk memenuhi kebutuhan gaya pria modern, mulai dari potongan klasik hingga kontemporer.
                Namun, kami bisa memberikan rekomendasi tempat salon terdekat yang cocok untuk wanita jika diperlukan.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
