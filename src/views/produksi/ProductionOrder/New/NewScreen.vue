<template>
  <section>
    <div class="mx-auto justify-center w-full md:w-full lg:w-3/4 sm:w-full">
      <div class="tabs tabs-boxed bg-base rounded-t-l">
        <a
          class="tab tab-lg"
          :class="{ 'tab-active': tabIndex == item.index }"
          v-for="item in tabList"
          :key="item.index"
        >
          {{ item.name }}
        </a>
      </div>
      <div
        class="bg-neutral text-neutral-content rounded-b-lg"
        :class="{ hidden: tabIndex != 0 }"
      >
        <div class="card-body">
          <h2 class="card-title">Data Production Order</h2>
          <p>Lengkapi data dibawah</p>
          <form @submit.prevent="nextTab">
            <div class="grid gap-y-5">
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Tanggal Order</span>
                  <input
                    v-model="productionOrderStore.dataOrder.order_date"
                    id="date"
                    type="date"
                    placeholder="Type here"
                    class="input input-bordered w-3/4"
                    required
                  />
                </label>
              </div>
              <hr />
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Nama Pelanggan</span>
                  <input
                    v-model="productionOrderStore.dataOrder.customer_name"
                    type="text"
                    class="input input-bordered w-3/4"
                    required
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Penanggung Jawab</span>
                  <input
                    v-model="productionOrderStore.dataOrder.pic_name"
                    type="text"
                    required
                    class="input input-bordered w-3/4"
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Catatan</span>
                  <textarea
                    v-model="productionOrderStore.dataOrder.notes"
                    class="textarea textarea-bordered w-3/4"
                    placeholder="Catatan"
                  ></textarea>
                </label>
              </div>
              <hr />
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Tanggal Penyelesaian</span>
                  <input
                    v-model="productionOrderStore.dataOrder.target_date"
                    id="date"
                    type="date"
                    placeholder="Type here"
                    class="input input-bordered w-3/4"
                    required
                  />
                </label>
              </div>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Next</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        class="bg-neutral text-neutral-content rounded-b-lg"
        :class="{ hidden: tabIndex != 1 }"
      >
        <div class="card-body">
          <h2 class="card-title">Detail Bahan Baku</h2>
          <p>Isi dengan bahan baku yang di gunakan</p>

          <div class="card-actions justify-end">
            <label
              for="my-modal"
              class="btn w-32 btn-secondary modal-button shadow-md"
              ><span class="text-xs">Tambah</span></label
            >
          </div>

          <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Quantity</th>
                  <th>Satuan</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="productionOrderStore.inputData.length < 1">
                  <td colspan="5" class="text-center">
                    <span>Tidak ada data.</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in productionOrderStore.inputData"
                  :key="item"
                >
                  <td class="text-center"></td>
                  <td>{{ item.name.toUpperCase() }}</td>
                  <td>
                    <input
                      v-model="item.estimate_quantity"
                      type="number"
                      placeholder="0"
                      min="0"
                      class="input input-bordered input-sm w-1/2 max-w-xs"
                    />
                  </td>
                  <td>{{ item.unit.name.toUpperCase() }}</td>

                  <td>
                    <button
                      class="btn btn-sm btn-square btn-outline"
                      @click="deleteInputData(index)"
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

          <div class="card-actions justify-between">
            <button type="button" class="btn btn-primary" @click="prevTab">
              Back
            </button>
            <button type="button" class="btn btn-primary" @click="nextTab">
              Next
            </button>
          </div>
        </div>
      </div>
      <div
        class="bg-neutral text-neutral-content rounded-b-lg"
        :class="{ hidden: tabIndex != 2 }"
      >
        <div class="card-body">
          <h2 class="card-title">Detail Mesin</h2>
          <p>Isi dengan mesin yang dipergunakan</p>

          <div class="card-actions justify-end">
            <label
              for="my-modal-machine"
              class="btn w-32 btn-secondary modal-button shadow-md"
              @click="etcStore.getMachineData()"
              ><span class="text-xs">Tambah</span></label
            >
          </div>

          <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Penggunaan</th>
                  <th>Unit</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="productionOrderStore.machineData.length < 1">
                  <td colspan="5" class="text-center">
                    <span>Tidak ada data.</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in productionOrderStore.machineData"
                  :key="item"
                >
                  <td class="text-center"></td>
                  <td>{{ item.name.toUpperCase() }}</td>
                  <td>
                    <input
                      v-model="item.usage_meter"
                      type="number"
                      placeholder="0"
                      min="0"
                      class="input input-bordered input-sm w-1/2 max-w-xs"
                    />
                  </td>
                  <td>
                    {{ item.unit == null ? '-' : item.unit.toUpperCase() }}
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-square btn-outline"
                      @click="deleteMachineData(index)"
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

          <div class="card-actions justify-between">
            <button type="button" class="btn btn-primary" @click="prevTab">
              Back
            </button>
            <button type="button" class="btn btn-primary" @click="nextTab">
              Next
            </button>
          </div>
        </div>
      </div>
      <div
        class="bg-neutral text-neutral-content rounded-b-lg"
        :class="{ hidden: tabIndex != 3 }"
      >
        <div class="card-body">
          <h2 class="card-title">Detail Overhead</h2>
          <p>Isi dengan bahan baku yang di gunakan</p>

          <div class="card-actions justify-end">
            <label
              for="my-modal-overhead"
              class="btn w-32 btn-secondary modal-button shadow-md"
              @click="etcStore.getOverheadData()"
              ><span class="text-xs">Tambah</span></label
            >
          </div>

          <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Pengunaan</th>
                  <th>Satuan</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="productionOrderStore.overheadData.length < 1">
                  <td colspan="5" class="text-center">
                    <span>Tidak ada data.</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in productionOrderStore.overheadData"
                  :key="item"
                >
                  <td class="text-center"></td>
                  <td>{{ item.name.toUpperCase() }}</td>
                  <td>
                    <input
                      v-model="item.usage_meter"
                      type="number"
                      placeholder="0"
                      min="0"
                      class="input input-bordered input-sm w-1/2 max-w-xs"
                    />
                  </td>
                  <td>{{ item.unit.toUpperCase() }}</td>

                  <td>
                    <button
                      class="btn btn-sm btn-square btn-outline"
                      @click="deleteOverheadData(index)"
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

          <div class="card-actions justify-between">
            <button type="button" class="btn btn-primary" @click="prevTab">
              Back
            </button>
            <button type="button" class="btn btn-primary" @click="nextTab">
              Next
            </button>
          </div>
        </div>
      </div>

      <div
        class="bg-neutral text-neutral-content rounded-b-lg"
        :class="{ hidden: tabIndex != 4 }"
      >
        <div class="card-body">
          <h2 class="card-title">Detail Hasil Produksi</h2>
          <p>Isi dengan Item hasil produksi</p>

          <div class="card-actions justify-end">
            <label
              for="my-modal-barang-jadi"
              class="btn w-32 btn-secondary modal-button shadow-md"
              :class="{ 'btn-disabled': productionOrderStore.storeLoading }"
              ><span class="text-xs">Tambah</span></label
            >
          </div>

          <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Target Quantity</th>
                  <th>Satuan</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="productionOrderStore.outputData.length < 1">
                  <td colspan="5" class="text-center">
                    <span>Tidak ada data.</span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in productionOrderStore.outputData"
                  :key="item"
                >
                  <td class="text-center"></td>
                  <td>{{ item.name.toUpperCase() }}</td>
                  <td>
                    <input
                      :disabled="productionOrderStore.storeLoading"
                      v-model="item.target_quantity"
                      type="number"
                      placeholder="0"
                      class="input input-bordered input-sm w-1/2 max-w-xs"
                    />
                  </td>
                  <td>{{ item.unit.name.toUpperCase() }}</td>

                  <td>
                    <button
                      :disabled="productionOrderStore.storeLoading"
                      class="btn btn-sm btn-square btn-outline"
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

          <div class="card-actions justify-between">
            <button
              :disabled="productionOrderStore.storeLoading"
              type="button"
              class="btn btn-primary"
              @click="prevTab"
            >
              Back
            </button>
            <button
              v-if="!productionOrderStore.storeLoading"
              type="button"
              class="btn btn-accent text-white"
              @click="onSubmit()"
            >
              Submit
            </button>
            <button v-else class="btn btn-accent text-white loading">
              Prosesing
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalItemBahanBaku />
    <ModalItemBarangJadi />
    <ModalMachine />
    <ModalOverhead />
  </section>
</template>

<script>
import { inject, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import {
  useEtcStore,
  useItemStore,
  useProductionOrderStore,
} from '../../../../stores/store'
import { useRouter } from 'vue-router'
import ModalItemBahanBaku from './Component/ModalItemBahanBaku.vue'
import ModalItemBarangJadi from './Component/ModalItemBarangJadi.vue'
import ModalMachine from './Component/ModalMachine.vue'
import ModalOverhead from './Component/ModalOverhead.vue'

export default {
  setup() {
    const dataForm = ref({
      name: null,
      unit_id: 1,
      type_id: 1,
      warehouse_id: 1,
    })

    const router = useRouter()
    const swal = inject('$swal')
    const toast = useToast()
    const searchActive = ref(false)
    const itemStore = useItemStore()
    const productionOrderStore = useProductionOrderStore()
    const etcStore = useEtcStore()

    const tabIndex = ref(0)
    const tabList = [
      { index: 0, name: 'Data Order' },
      { index: 1, name: 'Bahan Baku' },
      { index: 2, name: 'Mesin' },
      { index: 3, name: 'Overhead / Lainnya' },
      { index: 4, name: 'Hasil Produksi' },
    ]
    itemStore.getItemData()
    function nextTab() {
      if (this.tabIndex == 1 && productionOrderStore.inputData.length < 1) {
        swal
          .fire({
            title: 'Peringatan',
            text: 'Data bahan baku belum tidak tersedia!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Lanjutkan',
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.tabIndex++
            }
          })
      } else {
        this.tabIndex++
      }
    }

    function prevTab() {
      this.tabIndex--
    }

    async function onSubmit() {
      await swal
        .fire({
          title: 'Proses?',
          text: 'Produksi order akan di proses!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proses!',
          showLoaderOnConfirm: true,
          preConfirm: (val) => {
            productionOrderStore
              .storeProductionOrder(dataForm.value)
              .then((resp) => {
                console.info(resp)
                if (resp.status != 200) {
                  return false
                }
                return true
              })

            // throw new Error(resp)
          },
          allowOutsideClick: () => swal.isLoading(),
        })
        .then((result) => {
          console.info(result.value)
          if (result.isConfirmed) {
            if (result.value == false) {
              swal.fire('Oopss, ada permasalahan', 'error')
            } else {
              swal.fire('Berhasil!', 'success')
              router.push({
                name: 'produksi-order-finish',
                params: { id: productionOrderStore.currentId },
              })
              productionOrderStore.$reset()
            }
          }
        })
    }

    function deleteInputData(index) {
      productionOrderStore.deleteInputData(index)
      toast.warning('Bahan baku di hapus', {
        timeout: 1000,
      })
    }

    function deleteOutputData(index) {
      productionOrderStore.deleteOutputData(index)
      toast.warning('Barang jadi di hapus', {
        timeout: 1000,
      })
    }

    function deleteMachineData(index) {
      productionOrderStore.deleteMachineData(index)
      toast.warning('Mesin di hapus', {
        timeout: 1000,
      })
    }

    function deleteOverheadData(index) {
      productionOrderStore.deleteOutputData(index)
      toast.warning('Overhead di hapus', {
        timeout: 1000,
      })
    }

    onMounted(() => {
      productionOrderStore.$reset()
    })

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
      etcStore,
      deleteOverheadData,
      deleteMachineData,
    }
  },
  components: {
    ModalItemBahanBaku,
    ModalItemBarangJadi,
    ModalMachine,
    ModalOverhead,
  },
}
</script>
