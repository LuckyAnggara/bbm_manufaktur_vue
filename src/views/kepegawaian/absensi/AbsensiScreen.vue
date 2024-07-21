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
        {{ moment(absensiStore.filter.date.fromDate).format('DD MMMM Y') }} s.d
        {{ moment(absensiStore.filter.date.toDate).format('DD MMMM Y') }}
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
              <th>Shift</th>
              <th>Keterangan</th>
              <th>Jam Kerja</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="absensiStore.isLoading">
              <td colspan="7" class="text-center">
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
                <td colspan="7" class="text-center">Tidak ada data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in absensiStore.items"
                :key="index"
              >
                <td>{{ absensiStore.from + index }}</td>
                <td>{{ item.pegawai?.name ?? '-' }}</td>
                <td>{{ item.pin }}</td>
                <td>{{ item.start_time ?? '-' }}</td>
                <td>{{ item.end_time ?? '-' }}</td>
                <td>
                  <div
                    v-if="item.shift_type == 'PAGI'"
                    class="badge badge-primary badge-outline"
                  >
                    {{ item.shift_type ?? '-' }}
                  </div>
                  <div
                    v-else-if="item.shift_type == 'MALAM'"
                    class="badge badge-secondary badge-outline"
                  >
                    {{ item.shift_type ?? '-' }}
                  </div>
                  <div v-else class="badge badge-danger badge-outline">
                    {{ item.shift_type ?? '-' }}
                  </div>
                </td>
                <td>{{ item.missing ?? '-' }}</td>
                <td>{{ item.jamKerja }} JAM</td>
                <td class="before:hidden lg:w-1 whitespace-nowrap">
                  <div>
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          :disabled="indexDestroy == item.id"
                          :class="
                            indexDestroy == item.id
                              ? ''
                              : 'hover:scale-125 ease-in-out duration-300'
                          "
                          class="flex w-full rounded-md font-medium text-black dark:text-gray-400"
                        >
                          <ArrowPathIcon
                            v-if="indexDestroy == item.id"
                            class="animate-spin h-5 w-5 text-black dark:text-gray-400"
                            aria-hidden="true"
                          />
                          <EllipsisVerticalIcon
                            v-else
                            class="h-5 w-5 text-black dark:text-gray-400"
                            aria-hidden="true"
                          />
                        </MenuButton>
                      </div>

                      <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                      >
                        <MenuItems
                          class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                        >
                          <div class="px-2 py-1">
                            <MenuItem
                              v-for="menu in itemMenu"
                              v-slot="{ active }"
                            >
                              <button
                                @click="menu.function(item)"
                                :class="[
                                  active
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-900 dark:text-gray-400',
                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                              >
                                <component
                                  :is="menu.icon"
                                  class="w-5 h-5 mr-3"
                                />
                                {{ menu.label }}
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <ModalGantiAbsen
      :show-modal="showModalGantiAbsen"
      @close="showModalGantiAbsen = !showModalGantiAbsen"
      @update="updateData"
    />
  </Teleport>
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import { useAbsensiStore } from '@/stores/absensiStore'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import ModalGantiAbsen from './ModalGantiAbsen.vue'
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon,
} from '@heroicons/vue/24/solid'
import moment from 'moment'

const showModalGantiAbsen = ref(false)
const swal = inject('$swal')
const absensiStore = useAbsensiStore()
const indexDestroy = ref(0)

const itemMenu = [
  {
    function: onEdit,
    label: 'Edit Absen',
    icon: PencilSquareIcon,
  },
  {
    function: onDelete,
    label: 'Hapus Absen',
    icon: TrashIcon,
  },
]

async function onEdit(item) {
  indexDestroy.value = item.id
  const result = await absensiStore.getDataSingle(item.id)
  if (result) {
    indexDestroy.value = 0
    showModalGantiAbsen.value = true
  }
}
function onDelete() {}

function getData() {
  absensiStore.$patch((state) => {
    state.absenToDisplay = []
  })
  absensiStore.getData()
}

async function updateData() {
  const result = await absensiStore.update()
  if (result) {
    indexDestroy.value = 0

    showModalGantiAbsen.value = false
  }
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
  absensiStore.$patch((state) => {
    state.filter.date.fromDate = moment()
      .subtract(2, 'days')
      .format('yyyy-MM-DD')
    state.filter.date.toDate = moment().subtract(1, 'days').format('yyyy-MM-DD')
  })
  absensiStore.getData()
})
</script>
