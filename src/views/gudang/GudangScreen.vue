<template>
  <div class="md:flex md:space-x-10 md:space-y-0 space-y-4">
    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-persediaan',
        })
      "
    >
      Data Persediaan
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-barang-mutasi',
        })
      "
    >
      Daftar Mutasi Persediaan
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-barang-masuk',
        })
      "
    >
      Persediaan Masuk
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-barang-keluar',
        })
      "
    >
      Persediaan Keluar
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
