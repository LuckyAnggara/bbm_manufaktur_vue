<template>
  <div class="lg:flex grid gap-4 grid-cols-1 sm:grid-cols-2">
    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-persediaan',
        })
      "
    >
      Data Unit
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-persediaan',
        })
      "
    >
      Data Tipe
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-barang-mutasi',
        })
      "
    >
      Data Mesin
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-barang-masuk',
        })
      "
    >
      Data Overhead
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
