<template>
  <div class="card flex flex-col h-5/6">
    <div class="card-body shadow-xl rounded-xl">
      <div
        class="w-full mx-1 md:self-center my-4 md:my-0 md:ml-4 flex flex-row space-x-4 items-end"
      >
        <div class="form-control">
          <label class="label">
            <span class="label-text">Tanggal Data</span>
          </label>
          <div class="flex justify-between items-center space-x-6">
            <input
              v-model="absensiStore.filter.date.fromDate"
              id="date"
              type="date"
              placeholder="Type here"
              class="input input-bordered w-auto"
            />
            <label class="">s.d</label>
            <input
              v-model="absensiStore.filter.date.toDate"
              id="date"
              type="date"
              placeholder="Type here"
              class="input input-bordered w-auto"
            />
          </div>
        </div>
        <div class="w-1/5">
          <button
            @click="getData()"
            class="btn w-32 btn-primary modal-button shadow-md"
          >
            <span class="text-md">Submit</span>
          </button>
        </div>

        <div class="w-1/5">
          <button
            @click="isiAbsenKosong()"
            class="btn w-32 btn-secondary modal-button shadow-md"
          >
            <span class="text-md">Isi Absen Kosong</span>
          </button>
        </div>
      </div>
      <h2 class="card-title mb-2 text-2xl mt-5">
        Tanggal Data
        {{ $moment(absensiStore.filter.date.fromDate).format('DD MMMM Y') }} s.d
        {{ $moment(absensiStore.filter.date.toDate).format('DD MMMM Y') }}
      </h2>
      <div class="flex mt-2 lg:overflow-visible overflow-x-auto">
        <table class="table table-compact lg:w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Nama Pegawai</th>
              <th>Pin Absensi</th>
              <th>Jam Masuk</th>
              <th>Jam Keluar</th>
              <th>Keterangan</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="absensiStore.isLoading">
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
              <tr v-if="absensiStore.items.length == 0">
                <td colspan="6" class="text-center">Tidak ada data</td>
              </tr>
              <tr
                v-else
                v-for="(data, index) in absensiStore.items"
                :key="data"
              >
                <td>{{ absensiStore.from + index }}</td>
                <td>{{ data.pegawai?.name ?? '-' }}</td>
                <td>{{ data.pin }}</td>
                <td>{{ data.start_time ?? '-' }}</td>
                <td>{{ data.end_time ?? '-' }}</td>
                <td>
                  <div
                    v-if="data.shift_type == 'PAGI'"
                    class="badge badge-primary badge-outline"
                  >
                    {{ data.shift_type ?? '-' }}
                  </div>
                  <div
                    v-else-if="data.shift_type == 'MALAM'"
                    class="badge badge-secondary badge-outline"
                  >
                    {{ data.shift_type ?? '-' }}
                  </div>
                  <div v-else class="badge badge-danger badge-outline">
                    {{ data.shift_type ?? '-' }}
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import { useAbsensiStore } from '@/stores/absensiStore'

const swal = inject('$swal')
const showIndex = ref(0)
const showNested = ref(false)
const absensiStore = useAbsensiStore()

function show(index, absen) {
  showNested.value = true
  showIndex.value = index
  absensiStore.$patch((state) => {
    state.absenToDisplay = absen
  })
}

function getData() {
  showNested.value = false
  showIndex.value = 0
  absensiStore.$patch((state) => {
    state.absenToDisplay = []
  })
  absensiStore.getData()
}

function isiAbsenKosong() {
  swal
    .fire({
      title: 'Absen',
      text: 'Absen Kosong akan di Isi Default!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Lanjutkan',
    })
    .then((result) => {
      if (result.isConfirmed) {
        absensiStore.absenKosong()
      }
    })
}

onMounted(() => {
  absensiStore.getData()
})
</script>
