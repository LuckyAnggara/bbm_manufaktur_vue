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
            Data Absen {{ pegawaiStore.singleResponses.name }}
          </h3>
          <div class="form-control w-full flex flex-row space-x-4 mt-4">
            <div class="label w-1/5">
              <span class="">Bulan </span>
            </div>
            <select
              class="select select-bordered w-4/5"
              v-model="absensiStore.filter.month"
            >
              <option
                v-for="(bulan, index) in mainStore.bulanOptions"
                :key="index"
                :value="bulan.id"
              >
                {{ bulan.label }}
              </option>
            </select>
          </div>

          <div class="form-control w-full flex flex-row space-x-4 mt-4">
            <div class="label w-1/5">
              <span class="">Tahun </span>
            </div>
            <select
              class="select select-bordered w-4/5"
              v-model="absensiStore.filter.year"
            >
              <option
                v-for="(tahun, index) in mainStore.tahunOptions"
                :key="index"
                :value="tahun"
              >
                {{ tahun }}
              </option>
            </select>
          </div>

          <button
            @click="downloadAbsen()"
            type="submit"
            :disabled="absensiStore.isLoading"
            class="mt-6 btn btn-accent w-32 hover:btn-primary my-2"
          >
            <span
              v-if="absensiStore.isLoading"
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
import { useAbsensiStore } from '@/stores/absensiStore'
import { useMainStore } from '@/stores/mainStore'
import { tryOnUnmounted } from '@vueuse/core'
import { onActivated, onMounted, onUpdated, ref } from 'vue'

const emit = defineEmits(['close', 'submitStore', 'submitUpdate'])
const absensiStore = useAbsensiStore()
const mainStore = useMainStore()

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
})

const toast = useToast()
const pegawaiStore = usePegawaiStore()

function getAbsen() {
  absensiStore.getDataSingle(pegawaiStore.singleResponses.pin)
}

function downloadAbsen() {
  absensiStore.downloadAbsen(pegawaiStore.singleResponses.pin)
}

tryOnUnmounted(() => {
  pegawaiStore.$reset()
})
</script>
