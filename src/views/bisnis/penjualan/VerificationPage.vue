<template>
  <body>
    <div class="h-screen bg-gray-100 pt-20 text-black">
      <template v-if="!penjualanStore.singleResponses">
        <div class="w-full flex flex-col text-black space-y-5">
          <ArrowPathIcon class="h-12 w-12 animate-spin mx-auto" />
          <span class="mx-auto text-2xl"> Fetching Data ...</span>
        </div>
      </template>
      <template v-else>
        <h1 class="mb-2 text-center text-2xl font-bold">
          {{
            penjualanStore.singleResponses.status == 'TERVERIFIKASI'
              ? 'Faktur'
              : 'Verifikasi'
          }}
          Penjualan
        </h1>
        <h1 class="mb-5 text-center text-lg">
          {{ penjualanStore.singleResponses.nomor_faktur }}
        </h1>

        <div class="mx-auto justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div class="rounded-lg">
            <ul
              role="list"
              class="p-6 divide-y divide-gray-200 mb-6 rounded-lg bg-white shadow-md sm:flex sm:justify-start"
            >
              <li
                v-for="(item, index) in penjualanStore.singleResponses.detail"
                :key="index"
                class="flex py-6 space-x-6 w-full"
              >
                <img
                  src="https://placehold.co/200x200"
                  alt="product-image"
                  class="w-1/5 rounded-lg"
                />

                <div class="flex flex-row py-6 px-4 w-4/5">
                  <div class="flex flex-1 flex-col">
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <h2 class="text-2xl font-bold text-gray-900">
                        {{ item.item.name }}
                      </h2>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                      <p class="text-gray-500 text-lg">
                        Qty :
                        <span
                          >{{ item.jumlah }} {{ item.item?.unit?.name }}</span
                        >
                      </p>
                    </div>
                  </div>
                  <p class="ml-4 text-lg my-auto font-semibold">
                    {{ IDRCurrency.format(item.jumlah * item.harga) }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!-- Sub total -->
          <div
            class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
          >
            <div class="mb-2 flex justify-between">
              <p class="text-gray-700">Tanggal Transaksi</p>
              <p class="text-gray-700">
                {{ penjualanStore.singleResponses.created_at }}
              </p>
            </div>
            <div class="mb-2 flex justify-between">
              <p class="text-gray-700">Nama Pelanggan</p>
              <p class="text-gray-700">
                {{
                  penjualanStore.singleResponses.pelanggan_id == null
                    ? penjualanStore.singleResponses.nama_pelanggan
                    : penjualanStore.singleResponses.pelanggan.name
                }}
              </p>
            </div>
            <div class="flex justify-between">
              <p class="text-gray-700">Alamat / Telp</p>
              <p class="text-gray-700">
                {{
                  penjualanStore.singleResponses.pelanggan_id == null
                    ? penjualanStore.singleResponses.alamat
                    : penjualanStore.singleResponses.pelanggan.alamat
                }}
                -
                {{
                  penjualanStore.singleResponses.pelanggan_id == null
                    ? penjualanStore.singleResponses.nomor_telepon
                    : penjualanStore.singleResponses.pelanggan.nomor_telepon
                }}
              </p>
            </div>
            <hr class="my-4" />

            <div class="mb-2 flex justify-between">
              <p class="text-gray-700">Subtotal</p>
              <p class="text-gray-700">
                {{
                  IDRCurrency.format(penjualanStore.singleResponses.sub_total)
                }}
              </p>
            </div>
            <div class="mb-2 flex justify-between">
              <p class="text-red-700">Diskon</p>
              <p class="text-red-700">
                {{ IDRCurrency.format(penjualanStore.singleResponses.diskon) }}
              </p>
            </div>
            <div class="mb-2 flex justify-between">
              <p class="text-gray-700">Pajak</p>
              <p class="text-gray-700">
                {{ IDRCurrency.format(penjualanStore.singleResponses.pajak) }}
              </p>
            </div>
            <div class="flex justify-between">
              <p class="text-gray-700">Ongkir</p>
              <p class="text-gray-700">
                {{ IDRCurrency.format(penjualanStore.singleResponses.ongkir) }}
              </p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
              <p class="text-lg font-bold">Total</p>
              <div class="">
                <p class="mb-1 text-lg font-bold">
                  {{ IDRCurrency.format(penjualanStore.singleResponses.total) }}
                </p>
              </div>
            </div>
            <button
              v-if="penjualanStore.singleResponses.status != 'TERVERIFIKASI'"
              @click="open()"
              type="button"
              class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Verifikasi
            </button>
          </div>
        </div>
      </template>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Verifikasi
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Masukan Pin untuk menyetujui Transaksi Penjualan ini
                  </p>
                </div>

                <div class="mt-4">
                  <input
                    v-model="penjualanStore.pin"
                    type="password"
                    class="inline-flex justify-center rounded-md border-blue-200 border-2 bg-white px-4 py-2 text-sm font-medium text-grey-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    placeholder="Pin"
                  />
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="w-32 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="verifikasi()"
                  >
                    <span v-if="!penjualanStore.isVerifikasiLoading">
                      Verifikasi
                    </span>
                    <span v-else>
                      <ArrowPathIcon class="h-4 w-4 animate-spin mx-auto" />
                    </span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </body>
</template>

<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import { usePenjualanStore } from '@/stores/penjualanStore'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { IDRCurrency } from '@/utilities/formatter'
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

const penjualanStore = usePenjualanStore()
const route = useRoute()

async function verifikasi() {
  if (!penjualanStore.pin) {
    alert('isi pin dengan benar')
  } else {
    const result = await penjualanStore.verifikasi()
    if (result) {
      isOpen.value = false
      penjualanStore.singleResponses.status = 'TERVERIFIKASI'
      penjualanStore.pin = null
    }
  }
}

function open() {
  isOpen.value = true
}
const id = computed(() => {
  return route.params.id
})

onMounted(() => {
  penjualanStore.showVerifikasi(id.value)
})
</script>
