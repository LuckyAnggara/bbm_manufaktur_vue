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
      Data Persediaan
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gudang-barang-stock-opname',
        })
      "
    >
      Stock Opname
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
