<template>
  <section>
    <div class="md:flex">
      <div class="card md:w-1/3 w-full bg-neutral shadow-xl mr-10 self-start">
        <div class="card-body">
          <h2 class="card-title">Filter Data</h2>
          <div class="justify-center my-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Gudang</span>
              </label>
              <select class="select select-bordered">
                <option
                  :value="item.id"
                  v-for="item in warehouseStore.listData"
                  :key="item"
                >
                  {{ item.name.toUpperCase() }}
                </option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tanggal Data</span>
              </label>
              <div class="flex justify-between items-center">
                <input
                  id="date"
                  type="date"
                  placeholder="Type here"
                  class="input input-bordered w-auto"
                />
                <label class="">s.d</label>
                <input
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
        </div>
      </div>
      <div class="md:w-2/3 mt-10 md:mt-0 justify-self-end">
        <ItemTable />
      </div>
    </div>
    <ModalNewItem />
  </section>
</template>

<script>
import ItemTable from './ItemTable.vue'
import ModalNewItem from './ModalNewItem.vue'
import { useItemStore, useWarehouse } from '@/stores/store'

export default {
  setup() {
    const warehouseStore = useWarehouse()
    const itemStore = useItemStore()

    //CALL ITEM DATA
    itemStore.getItemTypeData()
    itemStore.getItemUnitData()

    //CALL WAREHOUSE DATA
    warehouseStore.getData()

    return {
      warehouseStore,
    }
  },
  components: { ItemTable, ModalNewItem },
}
</script>
