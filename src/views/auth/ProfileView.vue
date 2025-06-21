<template>
  <div class="min-h-screen bg-black text-white py-12 px-4 flex items-start justify-center">
    <div class="w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-2xl p-8 md:p-12 space-y-10">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-yellow-400">Profil Pengguna</h1>
        <p class="text-gray-400 mt-2">Kelola informasi akun Anda dengan mudah dan aman.</p>
      </div>

      <!-- Avatar + Info -->
      <div class="flex flex-col md:flex-row items-center gap-6 border-b border-gray-700 pb-6">
        <img
          :src="avatarUrl"
          alt="Avatar"
          class="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
        <div class="text-center md:text-left">
          <p class="text-xl font-semibold">{{ user?.name }}</p>
          <p class="text-gray-400 text-sm">{{ user?.email }}</p>
        </div>
      </div>

      <!-- Detail -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
        <div>
          <p class="font-semibold text-white mb-1">Nomor Telepon</p>
          <p>{{ user?.phone || '-' }}</p>
        </div>
        <div>
          <p class="font-semibold text-white mb-1">Tanggal Bergabung</p>
          <p>{{ joinDate }}</p>
        </div>
      </div>

      <!-- Edit Profile Form -->
      <div v-if="editMode" class="mt-8 bg-zinc-800 rounded-xl p-6 space-y-6 border border-zinc-700">
        <h2 class="text-xl font-bold text-yellow-400 mb-4 text-center">Edit Profil</h2>
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-gray-300 mb-1">Nama</label>
            <input v-model="editForm.name" type="text" required class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Email</label>
            <input v-model="editForm.email" type="email" required class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Nomor Telepon</label>
            <input v-model="editForm.phone" type="tel" class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Avatar (URL)</label>
            <input v-model="editForm.avatar" type="url" class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
          </div>
          <div class="flex gap-4 justify-end">
            <button type="button" @click="editMode = false" class="px-6 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold">Batal</button>
            <button type="submit" class="px-6 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">Simpan</button>
          </div>
        </form>
      </div>

      <!-- Aksi -->
      <div v-else class="flex flex-col md:flex-row justify-between gap-4 mt-10">
        <button
          class="w-full md:w-auto px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg shadow-md transition"
          @click="startEdit"
        >
          Edit Profil
        </button>
        <button
          @click="logout"
          class="w-full md:w-auto px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg shadow-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const user = ref(null);
const auth = useAuthStore();
const router = useRouter();

const editMode = ref(false)
const editForm = ref({
  name: '',
  email: '',
  phone: '',
  avatar: ''
})

const avatarUrl = computed(() =>
  editMode.value
    ? (editForm.value.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(editForm.value.name || 'User')}&background=facc15&color=000`)
    : (user.value?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.value?.name || 'User')}&background=facc15&color=000`)
)

const joinDate = computed(() => {
  if (!user.value?.createdAt) return '-'
  const date = new Date(user.value.createdAt)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
})

onMounted(async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('http://localhost:3000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = res.data;
  } catch (error) {
    console.error(error);
  }
});

function startEdit() {
  editForm.value = {
    name: user.value?.name || '',
    email: user.value?.email || '',
    phone: user.value?.phone || '',
    avatar: user.value?.avatar || '',
  }
  editMode.value = true
}

async function saveProfile() {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.put('http://localhost:3000/api/auth/profile', editForm.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = res.data;
    editMode.value = false;
  } catch (error) {
    alert('Gagal menyimpan perubahan profil.');
    console.error(error);
  }
}

function logout() {
  auth.logout();
  router.push('/login');
}
</script>
