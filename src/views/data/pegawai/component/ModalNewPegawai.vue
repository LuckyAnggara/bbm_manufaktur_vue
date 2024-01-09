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
        <template v-if="isEdit">
          <h3 class="text-lg font-bold">Edit Data</h3>

          <form
            class="justify-center my-4"
            @submit.prevent="emit('updateStore')"
          >
            <div class="form-control w-full">
              <div class="label">
                <span class="">Nama Pegawai</span>
              </div>
              <input
                required
                v-model="pegawaiStore.singleResponses.name"
                type="text"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <div class="label">
                <span class="">Jabatan</span>
              </div>
              <input
                required
                v-model="pegawaiStore.singleResponses.jabatan"
                type="text"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full">
              <div class="label">
                <span class="">Gaji Pokok </span>
              </div>
              <input
                type="number"
                required
                v-model="pegawaiStore.singleResponses.gaji"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <div class="label">
                <span class="">Uang Makan </span>
              </div>
              <input
                type="number"
                required
                v-model="pegawaiStore.singleResponses.uang_makan"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <div class="label">
                <span class="">Bonus </span>
              </div>
              <input
                type="number"
                required
                v-model="pegawaiStore.singleResponses.bonus"
                class="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              :disabled="pegawaiStore.isUpdateLoading"
              class="mt-6 btn btn-accent w-32 hover:btn-primary my-2"
            >
              <span
                v-if="pegawaiStore.isUpdateLoading"
                class="loading loading-infinity loading-lg"
              ></span>
              <span v-else>Update</span>
            </button>
          </form>
        </template>
        <template v-else>
          <h3 class="text-lg font-bold">Tambah Data</h3>

          <form
            class="justify-center my-4"
            @submit.prevent="emit('submitStore')"
          >
            <div class="form-control w-full">
              <div class="label">
                <span class="">Nama Pegawai</span>
              </div>
              <input
                required
                v-model="pegawaiStore.form.name"
                type="text"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <div class="label">
                <span class="">Jabatan</span>
              </div>
              <input
                required
                v-model="pegawaiStore.form.jabatan"
                type="text"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control w-full">
              <div class="label">
                <span class="">Gaji Pokok </span>
              </div>
              <input
                type="number"
                required
                v-model="pegawaiStore.form.gaji"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <div class="label">
                <span class="">Uang Makan </span>
              </div>
              <input
                type="number"
                required
                v-model="pegawaiStore.form.uang_makan"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <div class="label">
                <span class="">Bonus </span>
              </div>
              <input
                type="number"
                required
                v-model="pegawaiStore.form.bonus"
                class="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              :disabled="pegawaiStore.isStoreLoading"
              class="mt-6 btn btn-accent w-32 hover:btn-primary my-2"
            >
              <span
                v-if="pegawaiStore.isStoreLoading"
                class="loading loading-infinity loading-lg"
              ></span>
              <span v-else>Submit</span>
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { usePegawaiStore } from '@/stores/pegawaiStore'
import { tryOnUnmounted } from '@vueuse/core'
import { ref } from 'vue'

const emit = defineEmits(['close', 'submitStore', 'submitUpdate'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const toast = useToast()
const pegawaiStore = usePegawaiStore()

tryOnUnmounted(() => {
  pegawaiStore.$reset()
})
</script>
