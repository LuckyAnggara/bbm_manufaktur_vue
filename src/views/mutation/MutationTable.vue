<template>
  <div class="card flex bg-neutral flex-col">
    <div class="card-body shadow-xl rounded-xl">
      <h2 class="card-title mb-2 text-2xl" v-if="!itemStore.isLoading">
        {{ title }}
      </h2>

      <div class="md:flex py-2">
        <div class="w-full mx-1 md:self-center my-4 md:my-0 md:ml-4">
          <label class="mr-4">Jumlah Data </label>
          <select
            v-model="mutationStore.currentLimit"
            class="select select-bordered max-w-xs"
          >
            <option
              :selected="mutationStore.currentLimit == length ? true : false"
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
      </div>

      <div class="flex mt-2 overflow-y-auto">
        <table class="table table-compact w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Debit / Masuk</th>
              <th>Kredit / Keluar</th>
              <th>Saldo</th>
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
              <tr v-if="mutationStore.dataMutation.length == 0">
                <td colspan="6" class="text-center">Tidak ada data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in mutationStore.dataMutation"
                :key="item"
              >
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ $moment(item.created_at).format('DD MMMM YYYY') }}</td>
                <td>
                  {{ item.notes == null ? '-' : item.notes.toUpperCase() }}
                </td>
                <td>{{ numeralFormat(item.debit) }}</td>
                <td>{{ numeralFormat(item.kredit) }}</td>
                <td>{{ numeralFormat(item.balance) }}</td>
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
            mutationStore.lastPage == mutationStore.currentPage ? true : false
          "
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useItemStore, useMutationStore } from '@/stores/store'
import { useDebounceFn } from '@vueuse/core'

export default {
  setup() {
    const lengths = ref([5, 10, 20, 30, 40, 50])
    const mutationStore = useMutationStore()
    const itemStore = useItemStore()

    mutationStore.$subscribe((mutation, state) => {
      if (mutation.events.key == 'currentLimit') {
        getData()
      }
    })

    function getData(page = '') {
      mutationStore.getMutationData(page)
    }

    const searchData = useDebounceFn(() => {
      getData()
    }, 800)

    const title = computed(() => {
      if (mutationStore.fromDate == '' && mutationStore.toDate == '') {
        return `Data Persediaan ${itemStore.itemDetailData.name.toUpperCase()}`
      } else {
        return `Data Persediaan ${itemStore.itemDetailData.name.toUpperCase()} Dari tanggal ${
          mutationStore.fromDate
        } s.d ${mutationStore.toDate}`
      }
    })

    return {
      searchData,
      lengths,
      itemStore,
      mutationStore,
      title,
    }
  },
}
</script>
