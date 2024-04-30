<template>
  <section>
    <div class="w-full lg:w-2/3 mt-10 md:mt-0 mx-auto">
      <div role="tablist" class="tabs tabs-boxed tab-lg w-fit">
        <a
          v-for="(tab, index) in tabs"
          :key="tab.index"
          role="tab"
          @click="mutationStore.currentTab = index"
          class="tab"
          :class="{ 'tab-active': mutationStore.currentTab == index }"
          ><span class="text-xl mb-4">{{ tab.name }}</span></a
        >
      </div>
      <!-- Masuk Tab -->
      <div class="bg-neutral text-neutral-content rounded-b-lg">
        <div class="card-body">
          <h2 class="card-title">
            Daftar Mutasi {{ tabs[mutationStore.currentTab].name }}
          </h2>
          <div class="md:flex py-2">
            <div class="w-full mx-1 md:self-center my-4 md:my-0 md:ml-4">
              <label class="mr-4">Jumlah Data </label>
              <select
                v-model="mutationStore.currentLimit"
                class="select select-bordered max-w-xs"
              >
                <option
                  :selected="
                    mutationStore.currentLimit == length ? true : false
                  "
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
                    v-model="mutationStore.searchName"
                    @keyup="searchData"
                    type="text"
                    placeholder="Search…"
                    class="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>

            <button
              class="btn btn-accent w-32 hover:btn-primary ml-4"
              @click="toNew()"
            >
              Tambah
            </button>
          </div>

          <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
            <table class="table table-compact w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th></th>
                  <th>Tanggal</th>
                  <th>Kode Mutasi</th>
                  <th>Keterangan</th>
                  <th>Tipe</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="mutationStore.isLoading">
                  <td colspan="6" class="text-center">
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
                <template v-else>
                  <tr v-if="mutationStore.dataMasterMutation.length < 1">
                    <td colspan="6" class="text-center">
                      <span>Tidak ada data.</span>
                    </td>
                  </tr>
                  <tr
                    v-else
                    v-for="(item, index) in mutationStore.dataMasterMutation"
                    :key="item"
                  >
                    <td class="text-center">
                      {{ mutationStore.from + index }}
                    </td>
                    <td>
                      {{ $moment(item.created_at).format('DD MMMM YYYY') }}
                    </td>
                    <td>{{ item.mutation_code }}</td>
                    <td>{{ item.notes }}</td>
                    <td>{{ item.type }}</td>
                    <td class="space-x-2">
                      <button
                        class="btn btn-sm btn-square btn-outline hover:scale-110"
                        @click="detailData(item.id)"
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
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          />
                        </svg>
                      </button>
                      <button
                        class="btn btn-sm btn-square btn-outline hover:scale-110"
                        @click="onDelete(item.id, index)"
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
                </template>
              </tbody>
            </table>
          </div>
          <div
            class="btn-group mx-auto mt-4 mb-1 justify-center"
            v-if="!mutationStore.isLoading"
          >
            <button
              class="btn btn-outline"
              @click="getData(previousPage)"
              :disabled="mutationStore.currentPage == 1 ? true : false"
            >
              «
            </button>
            <button class="btn btn-outline">
              Page {{ mutationStore.currentPage }}
            </button>
            <button
              class="btn btn-outline"
              @click="getData(nextPage)"
              :disabled="
                mutationStore.lastPage == mutationStore.currentPage
                  ? true
                  : false
              "
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useMutationStore } from '@/stores/store'
import { inject, ref, watch } from 'vue'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'

export default {
  setup() {
    const tabs = [
      { index: 0, name: 'Masuk' },
      { index: 1, name: 'Keluar' },
    ]
    const mutationStore = useMutationStore()
    const swal = inject('$swal')
    const lengths = ref([5, 10, 20, 30, 40, 50])
    const router = useRouter()
    const toggle = false
    mutationStore.getMasterMutationData()

    watch(
      () => mutationStore.currentLimit,
      () => {
        getData()
      }
    )

    watch(
      () => mutationStore.currentTab,
      () => {
        getData()
      }
    )

    function onDelete(id, index) {
      swal
        .fire({
          title: 'Anda yakin?',
          text: 'Transaksi mutasi akan dihapus',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            const b = mutationStore.deleteMasterMutation(id, index)
            if (b) return swal.fire('Deleted!', 'success')
            return swal.fire('error')
          }
        })
    }
    function detailData(id) {
      router.push({
        name: 'gudang-barang-opname-detail',
        params: { id: id },
      })
    }

    function toNew() {
      if (mutationStore.typeData == 'debit') {
        router.push({
          name: 'gudang-barang-stock-opname-masuk',
        })
      } else {
        router.push({
          name: 'gudang-barang-stock-opname-keluar',
        })
      }
    }
    const searchData = useDebounceFn(() => {
      getData()
    }, 800)

    function getData(page = '', type = mutationStore.currentTab) {
      if (type == 0) {
        mutationStore.typeData = 'debit'
      } else {
        mutationStore.typeData = 'kredit'
      }
      mutationStore.getMasterMutationData(page)
    }

    const previousPage = computed(() => {
      return '&page=' + (mutationStore.currentPage - 1)
    })

    const nextPage = computed(() => {
      return '&page=' + (mutationStore.currentPage + 1)
    })

    return {
      toNew,
      searchData,
      tabs,
      toggle,
      mutationStore,
      onDelete,
      detailData,
      lengths,
      previousPage,
      nextPage,
    }
  },
  computed: {
    previousPage() {
      return '&page=' + (this.mutationStore.currentPage - 1)
    },
    nextPage() {
      return '&page=' + (this.mutationStore.currentPage + 1)
    },
  },
}
</script>
