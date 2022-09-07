<template>
  <section>
    <input
      type="checkbox"
      id="my-modal"
      v-model="itemStore.modalToggle"
      class="modal-toggle"
    />
    <div class="modal">
      <div class="modal-box bg-neutral text-white">
        <label
          for="my-modal"
          class="btn btn-sm btn-circle btn-secondary absolute right-2 top-2"
          >✕</label
        >
        <h3 class="text-2xl font-bold">Item Baru</h3>
        <section class="py-2">
          <form @submit.prevent="onSubmit">
            <div class="form-control my-2">
              <label class="label">
                <span class="label-text">Nama Item</span>
              </label>
              <input
                :disabled="itemStore.modalSubmitLoading"
                v-model="dataForm.name"
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
              />
            </div>
            <div class="form-control my-2">
              <label class="label">
                <span class="label-text">Unit Item</span>
              </label>
              <select
                :disabled="itemStore.modalSubmitLoading"
                v-model="dataForm.unit_id"
                class="select select-bordered"
              >
                <option :value="unit.id" v-for="unit in itemUnits" :key="unit">
                  {{ unit.name.toUpperCase() }}
                </option>
              </select>
            </div>
            <div class="form-control my-2">
              <label class="label">
                <span class="label-text">Tipe Item</span>
              </label>
              <select
                :disabled="itemStore.modalSubmitLoading"
                v-model="dataForm.type_id"
                class="select select-bordered"
              >
                <option :value="type.id" v-for="type in itemTypes" :key="type">
                  {{ type.name.toUpperCase() }}
                </option>
              </select>
            </div>
            <div class="form-control my-2">
              <label class="label">
                <span class="label-text">Gudang</span>
              </label>
              <select
                :disabled="itemStore.modalSubmitLoading"
                v-model="dataForm.warehouse_id"
                class="select select-bordered"
              >
                <option
                  :value="warehouse.id"
                  v-for="warehouse in itemStore.warehouses"
                  :key="warehouse"
                >
                  {{ warehouse.name.toUpperCase() }}
                </option>
              </select>
            </div>
            <div class="card-actions justify-end mt-10">
              <button
                :disabled="itemStore.modalSubmitLoading"
                type="submit"
                class="btn btn-secondary modal-button"
              >
                <template v-if="itemStore.modalSubmitLoading">
                  <svg
                    role="status"
                    class="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </template>
                <template v-else><span>Submit</span></template>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'pinia'
import { ref } from 'vue'
import { useItemStore } from '../../../stores/store'

export default {
  setup() {
    const itemStore = useItemStore()
    const dataForm = ref({
      name: null,
      unit_id: 1,
      type_id: 1,
      warehouse_id: 1,
    })

    function onSubmit() {
      itemStore.storeItemData(dataForm.value)
      reset()
    }

    function reset() {
      dataForm.value.name = null
      dataForm.value.unit_id = 1
      dataForm.value.type_id = 1
      dataForm.value.warehouse_id = 1
    }

    // expose to template and other options API hooks
    return {
      itemStore,
      onSubmit,
      dataForm,
    }
  },
  computed: {
    ...mapState(useItemStore, ['itemTypes', 'itemUnits', 'warehouses']),
  },
}
</script>
