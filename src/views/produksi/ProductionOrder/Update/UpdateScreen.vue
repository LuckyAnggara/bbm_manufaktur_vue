<template>
  <section>
    <div class="card flex bg-neutral flex-col">
      <div class="card-body shadow-xl rounded-xl">
        <h2 class="card-title mb-2 text-2xl">
          Data Production Oder Nomor : #{{
            productionOrderStore.currentData.sequence
          }}
        </h2>

        <h2>Hasil Produksi</h2>
        <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
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
                v-for="(item, index) in productionOrderStore.currentData.output"
                :key="item"
              >
                <td class="text-center"></td>
                <td>{{ item.item.name.toUpperCase() }}</td>
                <td>{{ item.item.unit.name.toUpperCase() }}</td>
                <td>{{ item.item.type.name.toUpperCase() }}</td>

                <td>
                  <input
                    :disabled="productionOrderStore.storeLoading"
                    v-model="item.target_quantity"
                    type="number"
                    placeholder="0"
                    class="input input-bordered input-sm w-1/2 max-w-xs"
                  />
                </td>

                <td>
                  <input
                    :disabled="productionOrderStore.storeLoading"
                    v-model="item.real_quantity"
                    type="number"
                    placeholder="0"
                    class="input input-bordered input-sm w-1/2 max-w-xs"
                  />
                </td>

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
      </div>
    </div>
  </section>
</template>

<script>
import { inject, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useItemStore, useProductionOrderStore } from '../../../../stores/store'
import { useRouter } from 'vue-router'
import ModalItemBahanBaku from './Component/ModalItemBahanBaku.vue'
import ModalItemBarangJadi from './Component/ModalItemBarangJadi.vue'

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
    function nextTab() {
      this.tabIndex++
    }

    function prevTab() {
      this.tabIndex--
    }

    function onSubmit() {
      swal
        .fire({
          title: 'Proses?',
          text: 'Produksi akan di proses!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proses!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            productionOrderStore.updateProductionOrder()
            router.push({
              name: 'produksi-order-finish',
              params: { id: productionOrderStore.currentId },
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
      productionOrderStore.deleteOutputEditData(index)
      toast.warning('Barang jadi di hapus', {
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
  components: { ModalItemBahanBaku, ModalItemBarangJadi },
}
</script>
