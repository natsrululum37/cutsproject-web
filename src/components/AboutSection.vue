<template>
  <div>
    <section class="bg-[#121212] text-white">
      <!-- Main Content -->
      <div class="max-w-6xl mx-auto py-20 px-4 space-y-12">
        <!-- Gambar Tengah & Teks Kiri-Kanan -->
        <div class="grid md:grid-cols-3 gap-6 items-start">
          <!-- Teks Kiri -->
          <div class="text-gray-300 text-base leading-relaxed text-justify">
            <p class="mb-6">
              <span class="float-left text-5xl font-bold text-yellow-400 pr-2 leading-none">C</span>
              uts Project Barber Shop telah menjadi simbol keahlian dan gaya dalam dunia grooming
              sejak didirikan pada tahun 2018. Dengan komitmen untuk memberikan pelayanan terbaik,
              kami menghadirkan pengalaman cukur dan perawatan rambut yang tak tertandingi. Setiap
              kunjungan di Cuts Project dirancang untuk memenuhi kebutuhan individual pelanggan,
              mulai dari potongan klasik hingga gaya modern yang trendi, semuanya dikerjakan oleh
              tim barber profesional yang berpengalaman dan penuh dedikasi.
            </p>
          </div>

          <!-- Gambar Tengah -->
          <div class="flex justify-center">
            <img
              src="@/assets/images/cutsproject_place.webp"
              alt="CutsProject"
              class="w-full max-w-[250px] rounded"
            />
          </div>

          <!-- Teks Kanan -->
          <div class="text-gray-300 text-base leading-relaxed text-justify">
            <p class="mb-6">
              Lingkungan yang nyaman dan pelayanan ramah menjadi ciri khas Cuts Project, menciptakan
              lingkungan di mana pelanggan dapat merasa rileks dan diperhatikan. Kami menggunakan
              peralatan berkualitas tinggi dan produk terbaik untuk memastikan hasil yang presisi
              dan memuaskan. Tidak hanya sekadar mencukur atau memotong rambut, kami berusaha untuk
              memahami kepribadian dan preferensi setiap pelanggan, sehingga setiap gaya yang
              diciptakan mampu mencerminkan karakter unik mereka.
            </p>
          </div>
        </div>

        <!-- Paragraf Tambahan -->
        <div class="text-gray-300 text-base leading-relaxed space-y-4 text-justify">
          <p>
            Selama lebih dari enam tahun berkarya, Cuts Project telah membangun reputasi sebagai
            barber shop terpercaya yang tidak hanya fokus pada hasil akhir, tetapi juga pada
            pengalaman pelanggan secara menyeluruh. Kami terus berinovasi dengan mengikuti
            perkembangan tren terkini sambil tetap mempertahankan teknik-teknik klasik yang telah
            teruji. Setiap kunjungan di Cuts Project adalah sebuah perjalanan gaya mulai dari
            konsultasi mendetail tentang kebutuhan rambut dan gaya wajah, pemilihan produk yang
            tepat, hingga proses grooming yang dilakukan dengan ketelitian tinggi. Kami percaya
            bahwa penampilan yang baik akan membawa dampak positif pada kepercayaan diri seseorang,
            itulah mengapa kami tidak pernah berkompromi dengan kualitas. Bergabunglah dengan
            komunitas pelanggan setia kami dan buktikan sendiri mengapa CutsProject telah menjadi
            pilihan utama bagi mereka yang menginginkan transformasi gaya yang sempurna.
          </p>
        </div>

        <!-- Profil Owner -->
        <div
          class="flex flex-col md:flex-row items-center bg-[#1e1e1e] p-6 rounded-lg shadow-lg hover:shadow-yellow-400/40 transition-shadow duration-300 max-w-3xl mx-auto gap-6"
        >
          <img
            src="@/assets/images/titis_dk_profil.jpg"
            alt="Profil Titis D.K"
            class="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 shadow-lg flex-shrink-0"
          />
          <div class="text-center md:text-left">
            <h3 class="text-yellow-400 text-3xl font-extrabold mb-3 drop-shadow-lg">Titis D.K</h3>
            <p class="text-gray-300 text-lg max-w-xl leading-relaxed">
              Owner dan Founder CutsProject Barber Shop. Dengan visi dan dedikasi tinggi, Titis D.K
              memimpin tim barber profesional untuk memberikan layanan terbaik dan membangun
              komunitas grooming yang solid.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutSection',
}
</script>
