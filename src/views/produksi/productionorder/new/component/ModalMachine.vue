<template>
  <section>
    <input type="checkbox" id="my-modal-machine" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label
          for="my-modal-machine"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h3 class="text-lg font-bold">Tambah Data</h3>
        <small>Data yang tersedia adalah Data Mesin</small>

        <div class="md:flex py-2">
          <div class="justify-end mx-1 md:w-1/2 w-full">
            <div class="form-control">
              <div class="input-group input-group-sm">
                <input
                  v-model="etcStore.searchName"
                  @keyup="searchData"
                  type="text"
                  placeholder="Search…"
                  class="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex mt-2 md:overflow-visible overflow-y-auto">
          <table class="table table-compact w-full">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th class="text-center">Capacity</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <template v-if="etcStore.isLoading">
                <tr>
                  <td colspan="4" class="text-center">
                    <div role="status">
                      <svg
                        class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(item, index) in etcStore.data" :key="item">
                  <td class="text-center">{{ etcStore.from + index }}</td>
                  <td>{{ item.name.toUpperCase() }}</td>
                  <td class="text-center">{{ item.capacity }}</td>
                  <td class="text-center">
                    <label class="swap">
                      <!-- this hidden checkbox controls the state -->
                      <input
                        type="checkbox"
                        v-model.lazy="productionOrderStore.dataOrder.machine"
                        :value="item"
                      />

                      <!-- volume on icon -->
                      <svg
                        class="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="green"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>

                      <!-- volume off icon -->

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="swap-on current"
                        width="36"
                        height="36"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="red"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 19.5l15-15m-15 0l15 15"
                        />
                      </svg>
                    </label>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div
          class="btn-group mx-auto mt-4 mb-1 justify-center"
          v-if="!etcStore.isLoading"
        >
          <button
            class="btn btn-outline"
            @click="getData(previousPage)"
            :disabled="etcStore.currentPage == 1 ? true : false"
          >
            «
          </button>
          <button class="btn btn-outline">
            Page {{ etcStore.currentPage }}
          </button>
          <button
            class="btn btn-outline"
            @click="getData(nextPage)"
            :disabled="etcStore.lastPage == etcStore.currentPage ? true : false"
          >
            »
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useToast } from 'vue-toastification'
import {
  useEtcStore,
  useProductionOrderStore,
} from '../../../../../stores/store'
import { useDebounceFn } from '@vueuse/core'

export default {
  setup() {
    const toast = useToast()
    const etcStore = useEtcStore()
    const productionOrderStore = useProductionOrderStore()

    const previousPage = computed(() => {
      return '&page=' + (this.etcStore.currentPage - 1)
    })

    const nextPage = computed(() => {
      return '&page=' + (this.etcStore.currentPage + 1)
    })

    productionOrderStore.$subscribe((mutation, state) => {
      if (
        mutation.events.key == 'machine' &&
        mutation.events.newValue.length > mutation.events.oldValue.length
      ) {
        toast.success('Data mesin baru ditambahkan', {
          timeout: 1000,
        })
      }

      if (
        mutation.events.key == 'machine' &&
        mutation.events.newValue.length < mutation.events.oldValue.length
      ) {
        toast.warning('Data mesin di hapus', {
          timeout: 1000,
        })
      }
    })

    function getData(page = '') {
      etcStore.getMachineData(page)
    }

    const searchData = useDebounceFn(() => {
      getData()
    }, 800)

    return {
      // pushData,
      productionOrderStore,
      previousPage,
      nextPage,
      getData,
      searchData,
      etcStore,
    }
  },
  computed: {},
}
</script>
