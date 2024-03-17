<template>
  <section>
    <template v-if="!mutationStore.isLoading">
      <template v-if="mutationStore.dataDetailMasterMutation != null">
        <div class="md:flex">
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
                      $moment(
                        mutationStore.dataDetailMasterMutation.data_date
                      ).format('L')
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
                    :value="mutationStore.dataDetailMasterMutation.notes"
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
                  v-if="mutationStore.dataDetailMasterMutation.type == 'MASUK'"
                  class="card-title"
                >
                  Detail Item Masuk
                </h2>
                <h2 v-else class="card-title">Detail Item Keluar</h2>

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
                      <tr
                        v-if="
                          mutationStore.dataDetailMasterMutation.detail.length <
                          1
                        "
                      >
                        <td colspan="4" class="text-center">
                          <span>Tidak ada data.</span>
                        </td>
                      </tr>
                      <tr
                        v-else
                        v-for="item in mutationStore.dataDetailMasterMutation
                          .detail"
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
      </template>
      <template v-else>
        <div
          wire:loading
          class="top-0 left-0 right-0 bottom-0 overflow-hidden opacity-75 flex flex-col items-center justify-center"
        >
          <h2 class="text-center text-white text-xl font-semibold">
            {{ mutationStore.responseDetailData.message }}
          </h2>
          <p class="w-1/3 text-center text-white">
            Data yang di cari tidak tersedia
          </p>
        </div>
      </template>
    </template>

    <template v-else>
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
  </section>
</template>

<script>
import { useMutationStore } from '@/stores/store'

export default {
  setup() {
    const mutationStore = useMutationStore()

    return {
      mutationStore,
    }
  },
  created() {
    if (this.$route.params) {
      this.mutationStore.getDetailMasterMutation(
        this.$route.params.id,
        this.$route.params.type
      )
    }
  },
}
</script>
