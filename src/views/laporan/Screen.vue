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

    <!-- <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'produksi-order-list',
        })
      "
    >
      Laporan Produksi
    </button> -->

    <a class="btn btn-lg btn-wide hover:scale-110" :href="linkProduction" target="_blank"> Laporan Persediaan </a>

    <a class="btn btn-lg btn-wide hover:scale-110" :href="linkPersediaan" target="_blank"> Laporan Persediaan </a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { baseUrlLink } from '@/services/axios'

const linkPersediaan = baseUrlLink + 'report/persediaan/produksi'
const linkProduction = baseUrlLink + 'report/produksi'
const router = useRouter()
</script>
