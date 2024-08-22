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

    <a class="btn btn-lg btn-wide hover:scale-110" :href="linkBisnis" target="_blank"> Laporan Bisnis </a>
    <a class="btn btn-lg btn-wide hover:scale-110" :href="linkProduction" target="_blank"> Laporan Produksi </a>
    <a class="btn btn-lg btn-wide hover:scale-110" :href="linkPersediaan" target="_blank"> Laporan Persediaan </a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { baseUrlLink } from '@/services/axios'

const linkPersediaan = baseUrlLink + 'report/persediaan'
const linkProduction = baseUrlLink + 'report/produksi'
const linkBisnis = baseUrlLink + 'report/bisnis'
const router = useRouter()
</script>
