<template>
  <section>
    <div class="md:flex" v-if="!mutationStore.isLoading">
      <div
        class="flex-col md:w-1/4 w-full mr-10 self-start card bg-neutral shadow-xl"
      >
        <div class="card-body">
          <h2 class="card-title">Data</h2>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Tanggal Data</span>
            </label>
            <div class="flex items-center">
              <input
                required
                :value="
                  $moment(mutationStore.dataDetailMutation.data_date).format(
                    'L'
                  )
                "
                type="input"
                class="input input-bordered w-full"
                disabled
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Notes</span>
            </label>
            <div class="items-center">
              <textarea
                disabled
                v-model="mutationStore.dataDetailMutation.notes"
                placeholder="Type here"
                rows="5"
                class="textarea input-bordered w-full resize-y"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="md:w-3/4 mt-10 md:mt-0 justify-self-end">
        <div class="bg-neutral text-neutral-content rounded-lg">
          <div class="card-body">
            <h2
              v-if="mutationStore.dataDetailMutation.type == 'MASUK'"
              class="card-title"
            >
              Detail Item Masuk
            </h2>
            <h2 v-else class="card-title">Detail Item Keluar</h2>
            <div class="md:flex py-2">
              <div class="w-1/5">
                <label
                  for="my-modal"
                  class="btn w-32 btn-secondary modal-button shadow-md"
                  ><span class="text-xs">New Item</span></label
                >
              </div>
              <div class="w-full mx-1 md:self-center my-4 md:my-0 md:ml-4">
                <label class="mr-4">Jumlah Data </label>
                <select
                  v-model="itemStore.currentLimit"
                  class="select select-bordered max-w-xs"
                >
                  <option
                    :selected="itemStore.currentLimit == length ? true : false"
                    v-for="length in lengths"
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
                      v-model="itemStore.searchName"
                      @keyup.enter="searchData"
                      type="text"
                      placeholder="Search…"
                      class="input input-bordered w-full"
                    />
                    <button
                      class="btn btn-square btn-outline"
                      @click="searchData"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
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
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="mutationStore.dataDetailMutation.detail.length < 1">
                    <td colspan="4" class="text-center">
                      <span>Tidak ada data.</span>
                    </td>
                  </tr>
                  <tr
                    v-else
                    v-for="item in mutationStore.dataDetailMutation.detail"
                    :key="item"
                  >
                    <td class="text-center"></td>
                    <td>{{ item.item.name.toUpperCase() }}</td>
                    <td>{{ item.item.unit.name.toUpperCase() }}</td>
                    <td>{{ item.qty }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useMutationStore } from '../../../stores/store'
import { useToast } from 'vue-toastification'
import { inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const toast = useToast()
    const mutationStore = useMutationStore()
    const swal = inject('$swal')
    const router = useRoute()

    const { id } = router.params
    console.info(id)
    mutationStore.getDetailMutation(id)

    return {
      mutationStore,
    }
  },
}
</script>
