<template>
  <div class="lg:flex grid gap-4 grid-cols-1 sm:grid-cols-2">
    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'daftar-pegawai',
        })
      "
    >
      Laporan Bisnis
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'data-absensi',
        })
      "
    >
      Laporan Persediaan
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'produksi-order-list',
        })
      "
    >
      Laporan Produksi
    </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    return {
      router,
    }
  },
}
</script>
