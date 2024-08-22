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

    <!-- <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="itemStore.showLaporanProduksi()"
    >
      Laporan Persediaan
    </button> -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { useItemStore } from '@/stores/store'

const router = useRouter()

const itemStore = useItemStore()
</script>
