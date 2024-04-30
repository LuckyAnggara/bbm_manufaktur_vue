<template>
  <section>
    <template v-if="productionOrderStore.isLoading">
      <div
        wire:loading
        class="top-0 left-0 right-0 bottom-0 overflow-hidden opacity-75 flex flex-col items-center justify-center"
      >
        <div
          class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
        ></div>
        <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
        <p class="w-1/3 text-center text-white">
          Sedang mencari data, tolong jangan tutup halaman ini.
        </p>
      </div>
    </template>
    <template v-else>
      <div class="card flex bg-neutral flex-col">
        <div class="card-body shadow-xl rounded-xl">
          <h2 class="card-title mb-2 text-2xl">
            Data Production Oder Nomor : #{{
              productionOrderStore.currentData.sequence
            }}
          </h2>

          <div class="mt-2 md:overflow-visible overflow-y-auto mb-5">
            <div class="badge badge-lg badge-primary badge-outline mb-2">
              Hasil Produksi
            </div>
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Satuan</th>
                  <th>Tipe Item</th>
                  <th>Target Quantity</th>
                  <th>Real Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="productionOrderStore.currentData.output.length < 1">
                  <td colspan="5" class="text-center">
                    <span>Tidak ada data.</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="item in productionOrderStore.currentData.output"
                  :key="item.id"
                >
                  <td class="text-center"></td>
                  <td>{{ item.item.name.toUpperCase() }}</td>
                  <td>{{ item.item.unit.name.toUpperCase() }}</td>
                  <td>{{ item.item.type.name.toUpperCase() }}</td>

                  <td>
                    <input
                      :disabled="productionOrderStore.isUpdateLoading"
                      v-model="item.target_quantity"
                      type="number"
                      placeholder="0"
                      class="input input-bordered input-sm w-1/2 max-w-xs"
                    />
                  </td>

                  <td>
                    <input
                      :disabled="productionOrderStore.isUpdateLoading"
                      v-model="item.real_quantity"
                      type="number"
                      placeholder="0"
                      class="input input-bordered input-sm w-1/2 max-w-xs"
                    />
                  </td>

                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />
          <div class="badge badge-lg badge-secondary badge-outline mt-4">
            Hasil Lainnya
          </div>

          <div class="flex flex-row-reverse">
            <div>
              <label
                for="my-modal-barang-jadi"
                class="btn w-32 btn-secondary modal-button shadow-md hover:scale-110"
                ><span class="text-xs">New Item</span></label
              >
            </div>
          </div>

          <div class="mt-2 md:overflow-visible overflow-y-auto mb-5">
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Satuan</th>
                  <th>Tipe Item</th>
                  <th>Output Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="productionOrderStore.outputDataUpdate.length < 1">
                  <td colspan="6" class="text-center">
                    <span>Tidak ada data.</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in productionOrderStore.outputDataUpdate"
                  :key="item"
                >
                  <td class="text-center"></td>
                  <td>{{ item.name.toUpperCase() }}</td>
                  <td>{{ item.unit.name.toUpperCase() }}</td>
                  <td>{{ item.type.name.toUpperCase() }}</td>

                  <td>
                    <input
                      :disabled="productionOrderStore.isUpdateLoading"
                      v-model="item.real_quantity"
                      type="number"
                      placeholder="0"
                      class="input input-bordered input-sm w-1/2 max-w-xs"
                    />
                  </td>

                  <td>
                    <button
                      :disabled="productionOrderStore.isUpdateLoading"
                      class="btn btn-sm btn-square btn-outline hover:scale-125"
                      @click="deleteOutputData(index)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        width="24"
                        height="24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />
          <div class="badge badge-lg badge-primary badge-outline mt-4">
            Sisa Bahan Baku
          </div>

          <div class="mt-2 md:overflow-visible overflow-y-auto mb-5">
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Satuan</th>
                  <th>Output Quantity</th>
                  <th>Real Quantity</th>
                  <th>Sisa Quantity</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="productionOrderStore.currentData.input.length < 1">
                  <td colspan="5" class="text-center">
                    <span>Tidak ada data.</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="item in productionOrderStore.currentData.input"
                  :key="item"
                >
                  <td class="text-center"></td>
                  <td>{{ item.item.name.toUpperCase() }}</td>
                  <td>{{ item.item.unit.name.toUpperCase() }}</td>
                  <td>{{ item.estimate_quantity }}</td>
                  <td>
                    <input
                      :disabled="productionOrderStore.isUpdateLoading"
                      v-model="item.real_quantity"
                      type="number"
                      placeholder="0"
                      class="input input-bordered input-sm w-1/2 max-w-xs"
                    />
                  </td>

                  <td>{{ item.estimate_quantity - item.real_quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />

          <div class="flex flex-row-reverse py-2">
            <button
              v-if="!productionOrderStore.isUpdateLoading"
              class="btn gap-2 btn-primary hover:btn-secondary w-32 mb-4 hover:scale-110"
              @click="onSubmit"
            >
              Submit
            </button>

            <button v-else class="btn btn-accent text-white loading">
              Prosesing
            </button>
          </div>
        </div>
      </div>
    </template>
    <ModalItemBarangJadi />
  </section>
</template>

<script>
import { inject, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useItemStore, useProductionOrderStore } from '@/stores/store'
import { useRouter } from 'vue-router'
import ModalItemBarangJadi from './component/ModalItemBarangJadi.vue'

export default {
  setup() {
    const router = useRouter()
    const swal = inject('$swal')
    const toast = useToast()
    const searchActive = ref(false)
    const itemStore = useItemStore()
    const productionOrderStore = useProductionOrderStore()

    const tabIndex = ref(0)
    const tabList = [
      { index: 0, name: 'Data Order' },
      { index: 1, name: 'Bahan Baku' },
      { index: 2, name: 'Hasil Produksi' },
    ]
    itemStore.getItemData()
    itemStore.getItemTypeData()
    function nextTab() {
      this.tabIndex++
    }

    function prevTab() {
      this.tabIndex--
    }

    async function onSubmit() {
      await swal
        .fire({
          title: 'Proses Produksi Selesai?',
          text: 'Status produksi akan menjadi SELESAI!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proses!',
          showLoaderOnConfirm: true,
          preConfirm: (value) => {
            return productionOrderStore
              .storeUpdateProductionOrder()
              .then((resp) => {
                if (resp.status == 200) {
                  return resp
                }
                throw new Error(resp)
              })
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            router.push({
              name: 'produksi-order-finish',
              params: { id: productionOrderStore.currentData.id },
            })
          }
        })
    }

    function deleteInputData(index) {
      productionOrderStore.deleteInputEditData(index)
      toast.warning('Bahan baku di hapus', {
        timeout: 1000,
      })
    }

    function deleteOutputData(index) {
      productionOrderStore.deleteOutputUpdateData(index)
      toast.warning('Data produksi lainnya di hapus', {
        timeout: 1000,
      })
    }
    return {
      onSubmit,
      deleteOutputData,
      deleteInputData,
      productionOrderStore,
      searchActive,
      itemStore,
      nextTab,
      prevTab,
      tabIndex,
      tabList,
    }
  },
  components: { ModalItemBarangJadi },
  created() {
    if (this.productionOrderStore.currentId == null) {
      if (this.$route.params) {
        this.productionOrderStore.$patch({
          currentId: this.$route.params.id,
        })
        this.productionOrderStore.getProductionOrderData()
      }
    }
  },
}
</script>
