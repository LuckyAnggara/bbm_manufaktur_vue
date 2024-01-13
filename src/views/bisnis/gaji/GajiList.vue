<template>
  <section>
    <div class="md:flex">
      <div
        class="flex-col md:w-1/4 w-full mr-10 self-start card bg-neutral shadow-xl"
      >
        <div class="card-body">
          <h2 class="card-title">Filter Data</h2>
          <div class="justify-center my-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Tanggal Data</span>
              </label>
              <div class="flex justify-between items-center">
                <input
                  v-model="gajiStore.filter.date.fromDate"
                  id="date"
                  type="date"
                  placeholder="Type here"
                  class="input input-bordered w-auto"
                />
                <label class="">s.d</label>
                <input
                  v-model="gajiStore.filter.date.toDate"
                  id="date"
                  type="date"
                  placeholder="Type here"
                  class="input input-bordered w-auto"
                />
              </div>
            </div>
          </div>

          <div class="card-actions justify-end">
            <button
              class="btn btn-primary w-32 hover:btn-primary"
              @click="gajiStore.getData()"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <div class="md:w-3/4 mt-10 md:mt-0 justify-self-end">
        <div class="card flex bg-neutral flex-col">
          <div class="card-body shadow-xl rounded-xl">
            <h2 class="card-title mb-2 text-2xl">Data Biaya</h2>
            <div class="md:flex py-2">
              <div class="w-1/5">
                <button
                  class="btn w-32 btn-primary modal-button shadow-md"
                  @click="onNew()"
                >
                  Tambah
                </button>
              </div>
              <div class="w-full mx-1 md:self-center my-4 md:my-0 md:ml-4">
                <label class="mr-4">Jumlah Data </label>
                <select
                  v-model="gajiStore.filter.currentLimit"
                  class="select select-bordered max-w-xs"
                >
                  <option
                    :selected="
                      gajiStore.filter.currentLimit == length ? true : false
                    "
                    v-for="length in mainStore.limitDataOptions"
                    :key="length"
                  >
                    {{ length }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex mt-2 md:overflow-visible overflow-y-auto">
              <table class="table table-compact w-full">
                <!-- head -->
                <thead>
                  <tr>
                    <th></th>
                    <th>Tanggal</th>
                    <th>Jumlah Dibayarkan</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="gajiStore.isLoading">
                    <td colspan="4" class="text-center">
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
                    <tr v-if="gajiStore.items.length == 0">
                      <td colspan="4" class="text-center">Tidak ada data</td>
                    </tr>
                    <tr
                      v-else
                      v-for="(item, index) in gajiStore.items"
                      :key="item.id"
                    >
                      <td class="text-center">{{ gajiStore.from + index }}</td>
                      <td>{{ item.created_at }}</td>
                      <td>
                        {{
                          numeralFormat(
                            item.total_bonus +
                              item.total_gaji +
                              item.total_uang_makan
                          )
                        }}
                      </td>

                      <td class="before:hidden lg:w-1 whitespace-nowrap">
                        <div>
                          <Menu
                            as="div"
                            class="relative inline-block text-left"
                          >
                            <div>
                              <MenuButton
                                :disabled="
                                  gajiStore.isDestroyLoading &&
                                  indexDestroy == item.id
                                "
                                :class="
                                  gajiStore.isDestroyLoading &&
                                  indexDestroy == item.id
                                    ? ''
                                    : 'hover:scale-125 ease-in-out duration-300'
                                "
                                class="flex w-full rounded-md font-medium text-black dark:text-gray-400"
                              >
                                <ArrowPathIcon
                                  v-if="
                                    gajiStore.isDestroyLoading &&
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
                <tfoot>
                  <td colspan="2" class="text-end text-lg text-white">Total</td>
                  <td class="text-lg text-white">
                    {{ numeralFormat(gajiStore.totalBayar) }}
                  </td>
                </tfoot>
              </table>
            </div>
            <div
              class="btn-group mx-auto mt-4 mb-1 justify-center"
              v-if="!gajiStore.isLoading"
            >
              <button
                class="btn btn-outline"
                @click="getData(previousPage)"
                :disabled="gajiStore.currentPage == 1 ? true : false"
              >
                «
              </button>
              <button class="btn btn-outline">
                Page {{ gajiStore.currentPage }}
              </button>
              <button
                class="btn btn-outline"
                @click="getData(nextPage)"
                :disabled="
                  gajiStore.lastPage == gajiStore.currentPage ? true : false
                "
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGajiStore } from '@/stores/gajiStore'
import { useMainStore } from '@/stores/mainStore'
import { inject, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  PrinterIcon,
  TrashIcon,
} from '@heroicons/vue/24/solid'

import moment from 'moment'

const gajiStore = useGajiStore()
const mainStore = useMainStore()
const router = useRouter()
const indexDestroy = ref(0)

const itemMenu = [
  {
    function: toReport,
    label: 'Print',
    icon: PrinterIcon,
  },
  {
    function: onDelete,
    label: 'Hapus',
    icon: TrashIcon,
  },
]

function onNew(item) {
  router.push({
    name: 'gaji-new',
  })
}
const swal = inject('$swal')

function toReport(item) {
  gajiStore.showGaji(item.created_at)
}
async function onDelete(item, index) {
  swal
    .fire({
      title: 'Proses',
      text: `Data gaji tanggal ${item.created_at} akan di hapus!`,
      showCancelButton: true,
      confirmButtonText: 'Proses',
      showLoaderOnConfirm: true,
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: (value) => {
        indexDestroy.value = item.id
        return gajiStore
          .destroy(moment(item.created_at).format('yyyy-MM-DD'), index)
          .then((resp) => {
            if (resp.status == 200) {
              return resp
            }
            throw new Error(resp)
          })
      },
    })
    .then((result) => {
      console.info(result)
      if (result.value == true) {
      }
    })
}

watch(
  () => gajiStore.filter.currentLimit,
  () => {
    gajiStore.getData()
  },
  { deep: true }
)

onMounted(() => {
  gajiStore.getData()
})
</script>
