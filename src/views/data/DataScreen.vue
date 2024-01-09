<template>
  <div class="lg:flex grid gap-4 grid-cols-1 sm:grid-cols-2">
    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'data-unit',
        })
      "
    >
      Data Unit
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'data-tipe',
        })
      "
    >
      Data Tipe
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'data-machine',
        })
      "
    >
      Data Mesin
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'data-overhead',
        })
      "
    >
      Data Overhead
    </button>

    <button
      class="btn btn-lg btn-wide hover:scale-110"
      @click="
        router.push({
          name: 'data-pegawai',
        })
      "
    >
      Data Pegawai
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
