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
