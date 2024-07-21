<template>
  <div
    v-if="showModal"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
  >
    <!-- Modal content -->
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->

      <div class="modal-box relative overflow-visible">
        <label
          @click="emit('close')"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >

        >
        <form
          v-if="absensiStore.singleResponses"
          @submit.prevent="emit('update')"
        >
          <h3 class="text-lg font-bold">Edit Absen</h3>
          <div class="form-control w-full flex flex-row space-x-4 mt-4">
            <div class="label w-1/5">
              <span class="">Jam Datang </span>
            </div>
            <VueDatePicker
              locale="id"
              time-picker-inline
              v-model="absensiStore.singleResponses.start_time"
              :is-24="true"
            ></VueDatePicker>
            <!-- <input
              v-model="absensiStore.singleResponses.start_time"
              id="date"
              type="time"
              placeholder="Type here"
              class="input input-bordered w-full"
            /> -->
          </div>

          <div class="form-control w-full flex flex-row space-x-4 mt-4">
            <div class="label w-1/5">
              <span class="">Jam Pulang </span>
            </div>
            <VueDatePicker
              locale="id"
              time-picker-inline
              v-model="absensiStore.singleResponses.end_time"
              :is-24="true"
            ></VueDatePicker>
          </div>

          <button
            type="submit"
            :disabled="absensiStore.isUpdateLoading"
            class="mt-6 btn btn-accent w-32 hover:btn-primary my-2"
          >
            <span
              v-if="absensiStore.isUpdateLoading"
              class="loading loading-infinity loading-lg"
            ></span>
            <span v-else>Update</span>
          </button>
        </form>
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
import VueDatePicker from '@vuepic/vue-datepicker'

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
