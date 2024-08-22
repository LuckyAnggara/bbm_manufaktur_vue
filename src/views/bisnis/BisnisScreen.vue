<template>
  <div class="lg:flex grid gap-4 grid-cols-1 sm:grid-cols-2">
    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'pembelian-list',
        })
      "
    >
      Pembelian
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'penjualan-list',
        })
      "
    >
      Penjualan
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'biaya-list',
        })
      "
    >
      Biaya
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'gaji-list',
        })
      "
    >
      Gaji
    </button>

    <!-- <a
      class="btn btn-lg btn-wide hover:scale-110"
      :href="linkBisnis"
      target="_blank"
    >
      Laporan Laba Rugi
    </a> -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { baseUrlLink } from '@/services/axios'
import { useItemStore } from '@/stores/store'

const router = useRouter()

const itemStore = useItemStore()
</script>
