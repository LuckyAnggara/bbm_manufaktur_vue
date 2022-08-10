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
            <button class="btn btn-secondary w-32 hover:btn-primary">
              Filter
            </button>
          </div>

          <div class="divider"></div>
          <h2 class="card-title">Laporan Persediaan</h2>
          <div class="card-actions justify-end">
            <button class="btn btn-secondary w-32 hover:btn-primary">
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
import { useItemStore } from '@/stores/store'

export default {
  setup() {
    const itemStore = useItemStore()

    //CALL ITEM DATA
    itemStore.getItemTypeData()
    itemStore.getItemUnitData()
    itemStore.getWarehousesData()

    itemStore.$subscribe((mutation, state) => {
      if (mutation.events.key == 'currentWarehouse') {
        itemStore.getItemData()
      }
    })
    return {
      itemStore,
    }
  },
  components: { MutationTable },
}
</script>
