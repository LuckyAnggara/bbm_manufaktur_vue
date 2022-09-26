<template>
  <section>
    <div class="md:flex">
      <div
        class="flex-col md:w-1/4 w-full mr-10 self-start card bg-neutral shadow-xl"
      >
        <div class="card-body">
          <h2 class="card-title">Data</h2>
          <form class="justify-center" @submit.prevent="submit">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Tanggal Data</span>
              </label>
              <div class="flex items-center">
                <input
                  required
                  v-model="mutationStore.incomingItem.data.tanggal"
                  id="date"
                  type="date"
                  placeholder="Type here"
                  class="input input-bordered w-full"
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Notes</span>
              </label>
              <div class="flex items-center">
                <textarea
                  v-model="mutationStore.incomingItem.data.notes"
                  placeholder="Type here"
                  class="input input-bordered w-full"
                />
              </div>
            </div>
            <div class="card-actions justify-end my-4">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div class="md:w-3/4 mt-10 md:mt-0 justify-self-end">
        <div class="bg-neutral text-neutral-content rounded-lg">
          <div class="card-body">
            <h2 class="card-title">Detail Item Masuk</h2>
            <p>Isi dengan data Item yang masuk ke persediaan</p>

            <div class="card-actions justify-end">
              <label
                for="my-modal-item"
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
                    <th>Satuan</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="mutationStore.incomingItem.detail.length < 1">
                    <td colspan="5" class="text-center">
                      <span>Tidak ada data.</span>
                    </td>
                  </tr>
                  <tr
                    v-else
                    v-for="(item, index) in mutationStore.incomingItem.detail"
                    :key="item"
                  >
                    <td class="text-center"></td>
                    <td>{{ item.name.toUpperCase() }}</td>
                    <td>{{ item.unit.name.toUpperCase() }}</td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        class="input input-bordered input-sm w-1/2 max-w-xs"
                      />
                    </td>
                    <td>
                      <button
                        class="btn btn-sm btn-square btn-outline"
                        @click="deleteData(index)"
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
      </div>
    </div>

    <ModalItem />
  </section>
</template>

<script>
import { useMutationStore } from '../../../../stores/store'
import ModalItem from './Component/ModalItem.vue'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const toast = useToast()
    const mutationStore = useMutationStore()

    function deleteData(index) {
      mutationStore.deleteListDebit(index)
      toast.warning('Item dihapus', {
        timeout: 1000,
      })
    }

    function submit() {
      mutationStore.storeIncomingItem
    }
    return {
      submit,
      deleteData,
      mutationStore,
    }
  },
  components: {
    ModalItem,
  },
}
</script>
