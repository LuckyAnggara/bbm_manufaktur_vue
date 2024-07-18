<template>
  <div
    v-if="showModal"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
  >
    <!-- Modal content -->
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->

      <div class="modal-box relative overflow-hidden">
        <label
          @click="emit('close')"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <div>
          <h3 class="text-lg font-bold">
            Cetak Struk Gaji {{ pegawaiStore.singleResponses.name }}
          </h3>
          <span class="text-gray-600 text-xs"
            >Struk gaji yang bisa di print hanya 10 gaji terakhir</span
          >
          <div class="form-control w-full flex flex-row space-x-4 mt-4">
            <div class="label w-1/5">
              <span class="">Tanggal </span>
            </div>
            <select
              class="select select-bordered w-4/5"
              v-model="gajiStore.tanggalPrintGaji"
            >
              <option
                v-for="(tanggal, index) in gajiStore.tanggalGaji"
                :key="index"
                :value="tanggal.tanggal"
              >
                {{ $moment(tanggal.tanggal).format('DD MMMM YYYY') }}
              </option>
            </select>
          </div>

          <button
            @click="downloadGaji()"
            type="submit"
            :disabled="gajiStore.isLoading"
            class="mt-6 btn btn-accent w-32 hover:btn-primary my-2"
          >
            <span
              v-if="gajiStore.isLoading"
              class="loading loading-infinity loading-lg"
            ></span>
            <span v-else>Submit</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { usePegawaiStore } from '@/stores/pegawaiStore'
import { useGajiStore } from '@/stores/gajiStore'
import { useMainStore } from '@/stores/mainStore'
import { tryOnUnmounted } from '@vueuse/core'
import { onActivated, onMounted, onUpdated, ref } from 'vue'

const emit = defineEmits(['close', 'submitStore', 'submitUpdate'])
const gajiStore = useGajiStore()
const mainStore = useMainStore()

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
})

const toast = useToast()
const pegawaiStore = usePegawaiStore()

function downloadGaji() {
  gajiStore.downloadStruckGaji(pegawaiStore.singleResponses.id)
}

tryOnUnmounted(() => {
  pegawaiStore.$reset()
})
</script>
