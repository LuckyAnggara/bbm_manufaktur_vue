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
                  v-model="mutationStore.fromDate"
                  id="date"
                  type="date"
                  placeholder="Type here"
                  class="input input-bordered w-auto"
                />
                <label class="">s.d</label>
                <input
                  v-model="mutationStore.toDate"
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
              @click="filterData()"
              class="btn btn-secondary w-32 hover:btn-primary"
            >
              Filter
            </button>
          </div>

          <div class="divider"></div>
          <h2 class="card-title">Laporan Persediaan</h2>
          <div class="card-actions justify-end">
            <button
              class="btn btn-secondary w-32 hover:btn-primary"
              @click="downloadData"
            >
              Download
            </button>
          </div>
        </div>
      </div>
      <div class="md:w-3/4 mt-10 md:mt-0 justify-self-end">
        <MutationTable />
      </div>
    </div>
  </section>
</template>

<script>
import MutationTable from '../mutation/MutationTable.vue'
import { useMutationStore, useItemStore } from '@/stores/store'
import { ref } from 'vue'

export default {
  setup() {
    const mutationStore = useMutationStore()
    const itemStore = useItemStore()

    mutationStore.$reset()
    function filterData() {
      itemStore.getItemDetailData(mutationStore.currentId)
      mutationStore.getMutationData()
    }
    function downloadData() {
      mutationStore.getDownloadDetailMutation(mutationStore.currentId)
    }
    return {
      downloadData,
      filterData,
      itemStore,
      mutationStore,
    }
  },
  created() {
    if (this.$route.params) {
      this.mutationStore.$patch({
        currentId: this.$route.params.id,
      })
      this.itemStore.getItemDetailData(this.$route.params.id)
      this.mutationStore.getMutationData()
    }
  },
  components: { MutationTable },
}
</script>
