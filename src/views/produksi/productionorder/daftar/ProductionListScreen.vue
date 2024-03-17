<template>
  <div class="card flex bg-neutral flex-col h-5/6">
    <div class="card-body shadow-xl rounded-xl">
      <h2 class="card-title mb-2 text-2xl">Daftar Produksi Order</h2>
      <div class="md:flex py-2">
        <div class="w-full mx-1 md:self-center my-4 md:my-0 md:ml-4">
          <label class="mr-4">Jumlah Data </label>
          <select
            v-model="productionOrderStore.currentLimit"
            class="select select-bordered max-w-xs"
          >
            <option
              :selected="
                productionOrderStore.currentLimit == length ? true : false
              "
              v-for="length in length"
              :key="length"
            >
              {{ length }}
            </option>
          </select>
        </div>

        <div class="justify-end mx-1 md:w-1/2 w-full">
          <div class="form-control">
            <div class="input-group">
              <input
                v-model="productionOrderStore.searchName"
                @keyup="searchData"
                type="text"
                placeholder="Search…"
                class="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex mt-2 lg:overflow-visible overflow-x-auto">
        <table class="table table-compact lg:w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Nomor Produksi</th>
              <th>Nama Pelanggan</th>
              <th>Penanggung Jawab</th>
              <th>Tanggal Order</th>
              <th>Tanggal Selesai</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="productionOrderStore.isLoading">
              <td colspan="8" class="text-center">
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
              <tr v-if="productionOrderStore.listData.length == 0">
                <td colspan="8" class="text-center">Tidak ada data</td>
              </tr>
              <tr
                v-else
                v-for="(data, index) in productionOrderStore.listData"
                :key="data"
              >
                <td class="text-center">
                  {{ productionOrderStore.from + index }}
                </td>
                <td>{{ data.sequence }}</td>
                <td>{{ data.customer_name }}</td>
                <td>{{ data.pic_name }}</td>
                <td>
                  {{ $moment(data.order_date).format('DD MMMM YYYY') }}
                </td>
                <td>
                  {{ $moment(data.target_date).format('DD MMMM YYYY') }}
                </td>
                <td>
                  <div class="badge badge-primary badge-outline">
                    {{ data.status }}
                  </div>
                </td>
                <td class="lg:flex hidden">
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
                      class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 z-50"
                    >
                      <li>
                        <a @click="onDetail(data.id)"> Detail </a>
                      </li>
                      <li v-show="!doneProduction(data.status) ? false : true">
                        <a @click="onEdit(data.id)"> Edit </a>
                      </li>
                      <!-- <li>
                        <a @click="onUpdate(data)"> Update </a>
                      </li> -->
                      <li v-show="!doneProduction(data.status) ? false : true">
                        <a @click="onDelete(data.id, index)">Hapus</a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td class="lg:hidden">
                  <button
                    class="btn btn-sm btn-square btn-ghost"
                    @click="onDetail(data.id)"
                  >
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div
        class="btn-group mx-auto mt-4 mb-20 justify-center"
        v-if="!productionOrderStore.isLoading"
      >
        <button
          class="btn btn-outline"
          @click="getData(previousPage)"
          :disabled="productionOrderStore.currentPage == 1 ? true : false"
        >
          «
        </button>
        <button class="btn btn-outline">
          Page {{ productionOrderStore.currentPage }}
        </button>
        <button
          class="btn btn-outline"
          @click="getData(nextPage)"
          :disabled="
            productionOrderStore.lastPage == productionOrderStore.currentPage
              ? true
              : false
          "
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useProductionOrderStore } from '@/stores/store'
import { useDebounceFn } from '@vueuse/core'

export default {
  setup() {
    const productionOrderStore = useProductionOrderStore()
    const length = ref([5, 10, 20, 30, 40, 50])
    // productionOrderStore.$subscribe((mutation, state) => {
    //   if (mutation.events.key == 'currentLimit') {
    //     getData()
    //   }
    // })
    const dataOrder = ref({})
    function getData(page = '') {
      productionOrderStore.getAllData(page)
    }

    watch(
      () => productionOrderStore.currentLimit,
      () => {
        getData()
      }
    )

    const searchData = useDebounceFn(() => {
      getData()
    }, 800)

    // expose to template and other options API hooks
    return {
      searchData,
      dataOrder,
      getData,
      length,
      productionOrderStore,
    }
  },
  computed: {
    currentLimit() {
      this.getData()
    },
    previousPage() {
      return '&page=' + (this.productionOrderStore.currentPage - 1)
    },
    nextPage() {
      return '&page=' + (this.productionOrderStore.currentPage + 1)
    },
    statusUpdate() {
      if (this.dataOrder.status == 'NEW ORDER')
        return {
          'WORK IN PROGRESS': 'WORK IN PROGRESS',
        }
      if (this.dataOrder.status == 'WORK IN PROGRESS')
        return {
          'NEW ORDER': 'NEW ORDER',
        }
      if (
        this.dataOrder.status == 'DONE' ||
        this.dataOrder.status == 'WAREHOUSE' ||
        this.dataOrder.status == 'SHIPPING'
      )
        return {
          DONE: 'DONE',
          WAREHOUSE: 'WAREHOUSE',
          SHIPPING: 'SHIPPING',
        }
    },
  },
  methods: {
    doneProduction(data) {
      // if (data == 'DONE PRODUCTION') return true
      // if (data == 'WAREHOUSE') return true
      // if (data == 'SHIPPING') return true
      // if (data == 'RETUR') return true
      // if (data == 'RECEIVE') return true
      if (data == 'NEW ORDER') return true
      return false
    },
    onDetail(id) {
      this.$router.push({
        name: 'produksi-order-finish',
        // name: 'produksi-order-detail',
        params: { id: id },
      })
    },
    onEdit(id) {
      this.$router.push({
        name: 'produksi-order-edit',
        params: { id: id },
      })
    },

    async onUpdate(data) {
      this.dataOrder = data
      const { value: status } = await this.$swal.fire({
        title: 'Ubah status pengerjaan',
        input: 'select',
        inputOptions: this.statusUpdate,
        inputPlaceholder: 'Pilih status Produksi',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== data.status) {
              resolve()
            } else {
              resolve(`Status sekarang adalah ${data.status}`)
            }
          })
        },
      })

      if (status) {
        await this.productionOrderStore.updateStatus(status, data.id)
        this.$swal.fire(`Status diubah menjadi ${status}`)
        this.getData(this.productionOrderStore.searchName)
      }
    },
    async onDelete(id, index) {
      await this.$swal.fire({
        title: 'Anda yakin?',
        text: 'Data ini akan di hapus!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
          return this.productionOrderStore
            .deleteProductionOrderData(id, index)
            .then((resp) => {
              if (resp.status == 200) {
                return resp
              }
              throw new Error(resp)
            })
        },
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
    this.getData(this.productionOrderStore.searchName)
  },
}
</script>
