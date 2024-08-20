<template>
  <section>
    <div class="md:flex">
      <div class="flex-col md:w-1/4 w-full mr-10 self-start card shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Filter Data</h2>
          <div class="justify-center my-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Gudang</span>
              </label>
              <select
                v-model="itemStore.currentWarehouse"
                class="select select-bordered"
              >
                <option
                  :value="item.id"
                  v-for="item in itemStore.listWarehouse"
                  :key="item"
                >
                  {{ item.name.toUpperCase() }}
                </option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tanggal Data</span>
              </label>
              <div class="flex justify-between items-center">
                <input
                  v-model="itemStore.fromDate"
                  id="date"
                  type="date"
                  placeholder="Type here"
                  class="input input-bordered w-auto"
                />
                <label class="">s.d</label>
                <input
                  v-model="itemStore.toDate"
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
              @click="filterData"
            >
              Filter
            </button>
          </div>

          <div class="divider"></div>
          <h2 class="card-title">Laporan Persediaan Gudang</h2>
          <div class="card-actions justify-end">
            <button
              class="btn btn-primary w-32 hover:btn-primary"
              @click="downloadData"
            >
              <template v-if="itemStore.isLoadingDownload">
                <svg
                  role="status"
                  class="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </template>
              <template v-else> Download </template>
            </button>
          </div>
        </div>
      </div>
      <div class="md:w-3/4 mt-10 md:mt-0 justify-self-end">
        <div class="card flex flex-col">
          <div class="card-body shadow-xl rounded-xl">
            <h2 class="card-title mb-2 text-2xl">Data Persediaan</h2>
            <div class="md:flex py-2">
              <div class="w-1/5">
                <label
                  for="my-modal"
                  class="btn w-32 btn-primary modal-button shadow-md"
                  ><span class="text-xs">New Item</span></label
                >
              </div>
              <div
                class="w-full mx-1 md:self-center my-4 md:my-0 md:ml-4 flex flex-row space-x-4"
              >
                <div>
                  <label class="mr-4">Jumlah Data </label>
                  <select
                    v-model="itemStore.currentLimit"
                    class="select select-bordered max-w-xs"
                  >
                    <option
                      :selected="
                        itemStore.currentLimit == length ? true : false
                      "
                      v-for="length in lengths"
                      :key="length"
                    >
                      {{ length }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="mr-4">Tipe </label>
                  <select
                    v-model="itemStore.filter.tipe"
                    class="select select-bordered max-w-xs"
                    @change="itemStore.getItemData()"
                  >
                    <option value="0">Semua</option>
                    <option
                      :value="tipe.id"
                      v-for="(tipe, index) in itemStore.itemTypes"
                      :key="index"
                    >
                      {{ tipe.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="justify-end mx-1 md:w-1/2 w-full">
                <div class="form-control">
                  <div class="input-group">
                    <input
                      v-model="itemStore.searchName"
                      @keyup="searchData"
                      type="text"
                      placeholder="Search…"
                      class="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex mt-2 md:overflow-visible overflow-y-auto">
              <table class="table table-compact w-full table-zebra table-xs">
                <!-- head -->
                <thead>
                  <tr>
                    <th></th>
                    <th>Nama</th>
                    <th>Tipe</th>
                    <th>Unit</th>
                    <th>Harga Pokok (Rp. )</th>
                    <th>Saldo</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="itemStore.isLoading">
                    <td colspan="7" class="text-center">
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
                    <tr v-if="itemStore.items.length == 0">
                      <td colspan="7" class="text-center">Tidak ada data</td>
                    </tr>
                    <tr
                      v-else
                      v-for="(item, index) in itemStore.items"
                      :key="item.id"
                    >
                      <td class="text-center">{{ itemStore.from + index }}</td>
                      <td>{{ item.name.toUpperCase() }}</td>
                      <td>{{ item.type?.name?.toUpperCase() }}</td>
                      <!-- <td>{{ item.warehouse.name.toUpperCase() }}</td> -->
                      <td>{{ item.unit.name.toUpperCase() }}</td>

                      <td>{{ numeralFormat(item.cogs) }}</td>
                      <td>{{ numeralFormat(item.balance) }}</td>
                      <td>
                        <div class="mx-2 dropdown" :class="position(index)">
                          <button class="btn btn-sm btn-square btn-ghost">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              width="36"
                              height="36"
                              class="inline-block w-5 h-5 stroke-current"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              ></path>
                            </svg>
                          </button>
                          <ul
                            tabindex="0"
                            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52"
                          >
                            <li>
                              <a @click="detail(item)"> Detail </a>
                            </li>
                            <li>
                              <a @click="mutasi(item)"> Mutasi </a>
                            </li>
                            <li>
                              <a @click="onDelete(item.id, index)">Hapus</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div
              class="btn-group mx-auto mt-4 mb-1 justify-center"
              v-if="!itemStore.isLoading"
            >
              <button
                class="btn btn-outline"
                @click="getData(previousPage)"
                :disabled="itemStore.currentPage == 1 ? true : false"
              >
                «
              </button>
              <button class="btn btn-outline">
                Page {{ itemStore.currentPage }}
              </button>
              <button
                class="btn btn-outline"
                @click="getData(nextPage)"
                :disabled="
                  itemStore.lastPage == itemStore.currentPage ? true : false
                "
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <ModalNewItem />
    </Teleport>

    <Teleport to="body">
      <ModalDetailItem
        :show-modal="showDetailModal"
        @close="showDetailModal = !showDetailModal"
      />
    </Teleport>
  </section>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import ModalNewItem from './ModalNewItem.vue'
import ModalDetailItem from './ModalDetailItem.vue'
import { useItemStore } from '@/stores/store'
import { useDebounceFn } from '@vueuse/core'

export default {
  setup() {
    const itemStore = useItemStore()
    const dataApi = ref()
    const lengths = ref([5, 10, 20, 30, 40, 50])
    const showDetailModal = ref(false)
    //CALL ITEM DATA
    itemStore.getItemTypeData()
    itemStore.getItemUnitData()
    itemStore.getWarehousesData()

    watch(
      () => itemStore.currentLimit,
      () => {
        getData()
      }
    )

    const searchData = useDebounceFn(() => {
      getData()
    }, 800)

    function getData(page = '') {
      itemStore.getItemData(page)
    }

    itemStore.$subscribe((mutation, state) => {
      if (mutation.events.key == 'currentWarehouse') {
        itemStore.getItemData()
      }
    })

    function filterData() {
      itemStore.getItemData()
    }

    function downloadData() {
      itemStore.getDownloadData()
    }

    onUnmounted(() => {
      itemStore.$reset()
    })

    onMounted(() => {
      itemStore.getItemTypeData
    })

    return {
      searchData,
      getData,
      dataApi,
      lengths,
      itemStore,
      showDetailModal,
      downloadData,
      filterData,
      itemStore,
    }
  },
  watch: {
    currentLimit() {
      this.getData()
    },
  },
  computed: {
    previousPage() {
      return '&page=' + (this.itemStore.currentPage - 1)
    },
    nextPage() {
      return '&page=' + (this.itemStore.currentPage + 1)
    },
  },
  methods: {
    mutasi(data) {
      this.$router.push({ name: 'mutation', params: data })
    },
    async detail(item) {
      const result = await this.itemStore.showData(item.id)
      if (result) {
        this.showDetailModal = true
      }
    },
    onDelete(id, index) {
      this.$swal
        .fire({
          title: 'Anda yakin?',
          text: 'Menghapus Item yang masih bersaldo akan menghilangkan dilaporan!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            const b = this.itemStore.deleteItemData(id, index)
            if (b)
              return this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            return this.$swal('error')
          }
        })
    },
    position(index) {
      if (index < 2) {
        return 'dropdown-end'
      }
      return 'dropdown-top dropdown-left'
    },
  },
  created() {
    this.getData(this.itemStore.searchName)
  },
  components: { ModalNewItem, ModalDetailItem },
}
</script>
