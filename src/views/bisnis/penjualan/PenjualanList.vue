<template>
  <div class="flex">
    <div class="card flex flex-col h-5/6 w-full">
      <div class="card-body shadow-xl rounded-xl">
        <button
          class="btn btn-accent w-32 hover:btn-primary my-2"
          @click="toNew()"
        >
          Tambah
        </button>
        <h2 class="card-title mb-2 text-2xl">Daftar Penjualan</h2>
        <div class="md:flex py-2">
          <div class="w-full mx-1 md:self-center my-4 md:my-0 md:ml-4">
            <label class="mr-4">Jumlah Data </label>
            <select
              v-model="penjualanStore.filter.currentLimit"
              class="select select-bordered max-w-xs"
            >
              <option
                v-for="option in mainStore.limitDataOptions"
                :key="option"
                :value="option"
              >
                {{ option == 100000 ? 'SEMUA' : option }}
              </option>
            </select>
          </div>

          <div class="justify-end mx-1 md:w-1/2 w-full">
            <div class="form-control">
              <input
                v-model="penjualanStore.filter.searchQuery"
                @keyup="searchData"
                type="text"
                placeholder="Cari Data"
                class="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        <div class="flex mt-2 lg:overflow-visible overflow-x-auto">
          <table class="table table-compact lg:w-full">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Nomor Faktur</th>
                <th>Tanggal Transaksi</th>
                <th>Nama Pelanggan</th>
                <th>Sales</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="penjualanStore.isLoading">
                <td colspan="6" class="text-center">
                  <div role="status">
                    <svg
                      class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
              <template v-else>
                <tr v-if="penjualanStore.items.length == 0">
                  <td colspan="6" class="text-center">Tidak ada data</td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in penjualanStore.items"
                  :key="index"
                >
                  <td class="text-center">
                    {{ penjualanStore.from + index }}
                  </td>
                  <td>{{ item.nomor_faktur }}</td>
                  <td>{{ item.created_at }}</td>

                  <td>
                    {{
                      item.pelanggan ? item.pelanggan.name : item.nama_pelanggan
                    }}
                  </td>
                  <td>
                    {{ item.sales?.name }}
                  </td>
                  <td>{{ numeral(item.total).format('0,0') }}</td>
                  <!-- <td>Lunas</td> -->
                  <td class="before:hidden lg:w-1 whitespace-nowrap">
                    <div>
                      <Menu as="div" class="relative inline-block text-left">
                        <div>
                          <MenuButton
                            :disabled="
                              penjualanStore.isDestroyLoading &&
                              indexDestroy == item.id
                            "
                            :class="
                              penjualanStore.isDestroyLoading &&
                              indexDestroy == item.id
                                ? ''
                                : 'hover:scale-125 ease-in-out duration-300'
                            "
                            class="flex w-full rounded-md font-medium text-black dark:text-gray-400"
                          >
                            <ArrowPathIcon
                              v-if="
                                penjualanStore.isDestroyLoading &&
                                indexDestroy == item.id
                              "
                              class="animate-spin h-5 w-5 text-black dark:text-gray-400"
                              aria-hidden="true"
                            />
                            <EllipsisVerticalIcon
                              v-else
                              class="h-5 w-5 text-black dark:text-gray-400"
                              aria-hidden="true"
                            />
                          </MenuButton>
                        </div>

                        <transition
                          enter-active-class="transition duration-100 ease-out"
                          enter-from-class="transform scale-95 opacity-0"
                          enter-to-class="transform scale-100 opacity-100"
                          leave-active-class="transition duration-75 ease-in"
                          leave-from-class="transform scale-100 opacity-100"
                          leave-to-class="transform scale-95 opacity-0"
                        >
                          <MenuItems
                            class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                          >
                            <div class="px-2 py-1">
                              <MenuItem
                                v-for="menu in itemMenu"
                                v-slot="{ active }"
                              >
                                <button
                                  @click="menu.function(item)"
                                  :class="[
                                    active
                                      ? 'bg-blue-500 text-white'
                                      : 'text-gray-900 dark:text-gray-400',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  ]"
                                >
                                  <component
                                    :is="menu.icon"
                                    class="w-5 h-5 mr-3"
                                  />
                                  {{ menu.label }}
                                </button>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                      </Menu>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div
          class="btn-group mx-auto mt-4 mb-20 justify-center"
          v-if="!penjualanStore.isLoading"
        >
          <button
            class="btn btn-outline"
            @click="previousPage"
            :disabled="penjualanStore.currentPage == 1 ? true : false"
          >
            «
          </button>
          <button class="btn btn-outline">
            Page {{ penjualanStore.currentPage }}
          </button>
          <button
            class="btn btn-outline"
            @click="nextPage"
            :disabled="
              penjualanStore.lastPage == penjualanStore.currentPage
                ? true
                : false
            "
          >
            »
          </button>
        </div>
      </div>
    </div>

    <div class="flex-col md:w-1/4 w-full ml-10 self-start card shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Filter Data</h2>
        <div class="justify-center my-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Tanggal Data</span>
            </label>
            <input
              v-model="penjualanStore.filter.date.fromDate"
              id="date"
              type="date"
              placeholder="Type here"
              class="input input-bordered w-auto"
            />
            <label class="my-4">s.d</label>
            <input
              v-model="penjualanStore.filter.date.toDate"
              id="date"
              type="date"
              placeholder="Type here"
              class="input input-bordered w-auto"
            />
          </div>
        </div>

        <div class="card-actions justify-end">
          <button
            class="btn btn-accent w-32 hover:btn-primary"
            @click="penjualanStore.getData()"
          >
            Filter
          </button>
        </div>
      </div>
    </div>

    <TransitionRoot appear :show="qrDialogShow" as="template">
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
                class="w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  QR Code
                </DialogTitle>
                <div class="mt-2">
                  <vue-qrcode
                    :value="link"
                    :options="{ width: 400 }"
                  ></vue-qrcode>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { usePenjualanStore } from '@/stores/penjualanStore'
import { useMainStore } from '@/stores/mainStore'
import { useDebounceFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  PrinterIcon,
  QrCodeIcon,
  TrashIcon,
} from '@heroicons/vue/24/solid'
import numeral from 'numeral'

const router = useRouter()
const penjualanStore = usePenjualanStore()
const mainStore = useMainStore()
const indexDestroy = ref(null)

const qrDialogShow = ref(false)
const link = ref(null)
function closeModal() {
  qrDialogShow.value = false
}

const itemMenu = [
  {
    function: toFaktur,
    label: 'Faktur',
    icon: PrinterIcon,
  },
  {
    function: toQr,
    label: 'QR Code',
    icon: QrCodeIcon,
  },
  {
    function: destroy,
    label: 'Hapus',
    icon: TrashIcon,
  },
]

const swal = inject('$swal')

const searchData = useDebounceFn(() => {
  penjualanStore.getData()
}, 500)

const previousPage = useDebounceFn(() => {
  penjualanStore.$patch((state) => {
    state.filter.page--
  })
  penjualanStore.getData()
}, 50)

const nextPage = useDebounceFn(() => {
  penjualanStore.$patch((state) => {
    state.filter.page++
  })
  penjualanStore.getData()
}, 50)

function toNew() {
  router.push({
    name: 'penjualan-new',
  })
}

function toFaktur(item) {
  penjualanStore.showFaktur(item.id)
}

function toQr(item) {
  const firstSegment = new URL(window.location.href)
  link.value = `${firstSegment}/${item.id}/verification`

  qrDialogShow.value = true
}

function destroy(item) {
  // swal("Hello Vue world!!!");
  penjualanStore.destroy(item.id)
  indexDestroy.value = item.id
}

watch(
  () => penjualanStore.filter.currentLimit,
  () => {
    penjualanStore.getData()
  }
)

onMounted(() => {
  penjualanStore.getData()
})
onUnmounted(() => {
  penjualanStore.$reset()
})
</script>
