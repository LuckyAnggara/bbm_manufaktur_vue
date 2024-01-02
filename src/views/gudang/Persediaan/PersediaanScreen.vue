<template>
  <section>
    <div class="md:flex">
      <div class="flex-col md:w-1/4 w-full mr-10 self-start card bg-neutral shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Filter Data</h2>
          <div class="justify-center my-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Gudang</span>
              </label>
              <select v-model="itemStore.currentWarehouse" class="select select-bordered">
                <option :value="item.id" v-for="item in itemStore.listWarehouse" :key="item">
                  {{ item.name.toUpperCase() }}
                </option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tanggal Data</span>
              </label>
              <div class="flex justify-between items-center">
                <input v-model="itemStore.fromDate" id="date" type="date" placeholder="Type here" class="input input-bordered w-auto" />
                <label class="">s.d</label>
                <input v-model="itemStore.toDate" id="date" type="date" placeholder="Type here" class="input input-bordered w-auto" />
              </div>
            </div>
          </div>

          <div class="card-actions justify-end">
            <button class="btn btn-primary w-32 hover:btn-primary" @click="filterData">Filter</button>
          </div>

          <div class="divider"></div>
          <h2 class="card-title">Laporan Persediaan</h2>
          <div class="card-actions justify-end">
            <button class="btn btn-primary w-32 hover:btn-primary" @click="downloadData">
              <template v-if="itemStore.isLoadingDownload">
                <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </template>
              <template v-else> Download </template>
            </button>
          </div>
        </div>
      </div>
      <div class="md:w-3/4 mt-10 md:mt-0 justify-self-end">
        <ItemTable />
      </div>
    </div>
    <ModalNewItem />
  </section>
</template>

<script>
import ItemTable from './ItemTable.vue'
import ModalNewItem from './ModalNewItem.vue'
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

    function filterData() {
      itemStore.getItemData()
    }

    function downloadData() {
      itemStore.getDownloadData()
    }

    return {
      downloadData,
      filterData,
      itemStore,
    }
  },
  components: { ItemTable, ModalNewItem },
}
</script>
