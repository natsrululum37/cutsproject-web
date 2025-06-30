# CutsProject Web

**CutsProject Web** adalah aplikasi web barbershop modern berbasis Vue 3 + Vite untuk frontend, dengan backend menggunakan **Express.js** dan database **MySQL**.  
Aplikasi ini menyediakan fitur lengkap untuk user dan admin, desain responsif, serta siap produksi dan SEO friendly.

---

## 🚀 Fitur Utama

- **Landing Page**: Beranda, About, Service, Gallery, FAQ, Maps, dsb.
- **Reservasi Online**: Booking layanan, pilih barber, cek jadwal.
- **Autentikasi**: Login, Register, Lupa Password, Ganti Password.
- **Profile User**: Edit profil, riwayat reservasi, statistik.
- **Admin Panel**: Kelola reservasi, layanan, user, testimoni, dsb.
- **Responsive Design**: Mobile & desktop friendly.
- **SEO Friendly**: Meta tag dinamis, Open Graph, dsb.
- **Animasi Modern**: Transisi, fade, slide, AOS, dsb.
- **Notifikasi**: SweetAlert2, Toastification.
- **Validasi Form**: Vuelidate.
- **Peta Lokasi**: Google Maps/Embed.
- **Chart & Statistik**: Chart.js, vue-chartjs.
- **Aksesibilitas**: Alt gambar, kontras warna, heading terstruktur.

---

## 🛠️ Teknologi

### Frontend
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Vue Toastification](https://vue-toastification.maronato.dev/)
- [@heroicons/vue](https://github.com/tailwindlabs/heroicons)
- [Vuelidate](https://vuelidate-next.netlify.app/)
- [AOS](https://michalsnik.github.io/aos/)
- [Chart.js](https://www.chartjs.org/) & [vue-chartjs](https://vue-chartjs.org/)
- [Swiper](https://swiperjs.com/)

### Backend
- [Express.js](https://expressjs.com/) (REST API)
- [MySQL](https://www.mysql.com/) (database)
- JWT Auth, bcrypt, multer, dsb.

---

## 📦 Instalasi

### 1. **Frontend**

```bash
git clone https://github.com/natsrululum37/cutsproject-web.git
cd cutsproject-web
npm install
npm run dev
# Buka http://localhost:5173/
```

### 2. **Backend**

```bash
git clone https://github.com/natsrululum37/cutsproject-backend.git
cd cutsproject-backend
npm install
# Atur .env (lihat contoh di repo backend)
npm run dev
# API berjalan di http://localhost:3000/
```

### 3. **Database**

- Import file SQL dari repo backend ke MySQL Anda.
- Atur koneksi database di file `.env` backend.

---

## ⚙️ Konfigurasi

- **API URL**: Ubah endpoint API di file `.env` frontend atau di axios instance.
- **SEO**: Atur meta title & description di router meta dan `public/index.html`.
- **Gambar**: Letakkan gambar di `public/` atau `src/assets/`.
- **Maps**: Ganti embed/link Google Maps sesuai lokasi barbershop Anda.

---

## 🗂️ Struktur Folder

```
src/
  assets/           # Gambar, icon, dsb
  components/       # Komponen UI (client, admin, layouts, dsb)
  router/           # Konfigurasi vue-router
  stores/           # Pinia store (auth, user, dsb)
  views/            # Halaman utama (user, admin, auth)
  App.vue           # Root component
  main.js           # Entry point
public/
  index.html        # HTML utama & meta tag global
  robots.txt        # SEO robots
  ...
```

---

## 📦 Dependencies

Pastikan Anda sudah meng-install library berikut sebelum menjalankan project:

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Vue Toastification](https://vue-toastification.maronato.dev/)
- [@heroicons/vue](https://github.com/tailwindlabs/heroicons)
- [Vuelidate](https://vuelidate-next.netlify.app/)
- [AOS](https://michalsnik.github.io/aos/)
- [Chart.js](https://www.chartjs.org/) & [vue-chartjs](https://vue-chartjs.org/)
- [Swiper](https://swiperjs.com/)

Install semua dependencies dengan:
```bash
npm install
```
atau jika manual:
```bash
npm install vue@^3 vite pinia vue-router tailwindcss postcss autoprefixer axios sweetalert2 vue-toastification @heroicons/vue vuelidate aos chart.js vue-chartjs swiper
```

---

## 📝 Fitur User

- **Beranda**: Info singkat, promo, galeri, testimoni.
- **Tentang Kami**: Hero, visi misi, tim, FAQ, maps.
- **Service**: Daftar layanan, harga, deskripsi.
- **Reservasi**: Pilih layanan, tanggal, barber, konfirmasi.
- **Profile**: Edit data, ganti password, lihat riwayat reservasi.
- **Lupa Password**: Reset password via email + captcha.
- **Notifikasi**: Sukses/gagal aksi, info penting.

---

## 🛡️ Fitur Admin

- **Dashboard**: Statistik reservasi, user, dsb.
- **Kelola Reservasi**: Konfirmasi, batalkan, selesai, alasan pembatalan.
- **Kelola Layanan**: Tambah/edit/hapus layanan.
- **Kelola User**: Lihat, blokir, dsb.
- **Kelola Testimoni**: Moderasi testimoni.
- **Kelola Konten**: FAQ, About, dsb.

---

## 🌐 SEO & Meta Tag

- **Meta title & description**: Diatur otomatis via router meta.
- **Open Graph & Social**: Di `public/index.html`.
- **robots.txt & sitemap.xml**: Untuk Google Search Console.
- **Aksesibilitas**: Alt gambar, heading, kontras warna.

---

## 🧑‍💻 Pengembangan

- **Linting**:  
  ```bash
  npm run lint
  ```
- **Format kode**:  
  ```bash
  npm run format
  ```
- **Build production**:  
  ```bash
  npm run build
  ```
- **Preview production**:  
  ```bash
  npm run preview
  ```
- **Deploy ke GitHub Pages**:  
  ```bash
  npm run deploy
  ```

---

## 📝 Kontribusi

1. Fork repo ini.
2. Buat branch fitur/bugfix baru.
3. Commit perubahan dengan pesan yang jelas.
4. Pull request ke branch `main`.

---

## ❓ FAQ

- **Bagaimana reset password?**  
  Klik "Lupa password?" di halaman login, masukkan email, cek inbox Anda.

- **Bagaimana mengatur SEO?**  
  Lihat bagian SEO & Meta Tag di atas.

- **Bagaimana deploy ke hosting lain?**  
  Build dengan `npm run build`, upload folder `dist/` ke hosting pilihan Anda.

---

## 📄 Lisensi

MIT License © 2025 [CutsProject Team](https://github.com/username/cutsproject-web)

---

## 🙏 Terima Kasih

Terima kasih telah menggunakan CutsProject Web!  
Untuk pertanyaan, saran, atau bug, silakan buka [issue](https://github.com/username/cutsproject-web/issues) di repo ini.
