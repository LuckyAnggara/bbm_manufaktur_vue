<template>
  <section>
    <div class="card flex bg-neutral flex-col lg:w-fit w-full">
      <div class="card-body shadow-xl rounded-xl">
        <h2 class="card-title mb-2 text-2xl">Data Pegawai</h2>
        <div class="md:flex py-2">
          <div class="w-full">
            <button
              class="btn w-32 btn-secondary modal-button shadow-md"
              @click="onNew()"
            >
              Tambah
            </button>
          </div>
        </div>

        <div class="flex mt-2 md:overflow-visible overflow-y-auto">
          <table class="table table-compact w-full">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Gaji (IDR)</th>
                <th>Uang Makan (IDR)</th>
                <th>Bonus (IDR)</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="pegawaiStore.isLoading">
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
                <tr v-if="pegawaiStore.items.length == 0">
                  <td colspan="7" class="text-center">Tidak ada data</td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in pegawaiStore.items"
                  :key="item.id"
                >
                  <td class="text-center">{{ from + index }}</td>
                  <td>
                    {{ item.name.toUpperCase() }}
                  </td>
                  <td>
                    {{ item.jabatan }}
                  </td>
                  <td>
                    {{ numeral(item.gaji).format('0,0') }}
                  </td>
                  <td>
                    {{ numeral(item.uang_makan).format('0,0') }}
                  </td>
                  <td>
                    {{ numeral(item.bonus).format('0,0') }}
                  </td>
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
  </section>
  <!-- Modal -->
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <ModalNewPegawai
      :show-modal="showModal"
      :is-edit="isEdit"
      @updateStore="onEdit()"
      @submitStore="onSubmit()"
      @close="showModal = !showModal"
    />
  </Teleport>
</template>

<script setup>
import { onMounted, inject, ref } from 'vue'
import { usePegawaiStore } from '@/stores/pegawaiStore'
import ModalNewPegawai from './component/ModalNewPegawai.vue'
import numeral from 'numeral'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/solid'

const pegawaiStore = usePegawaiStore()
const from = 1
const showModal = ref(false)
const isEdit = ref(false)
const indexDestroy = ref(null)
const indexId = ref(null)

const itemMenu = [
  {
    function: edit,
    label: 'Edit',
    icon: PencilSquareIcon,
  },
  {
    function: onDelete,
    label: 'Hapus',
    icon: TrashIcon,
  },
]

const swal = inject('$swal')

function onDelete(item) {
  const { id } = item
  swal
    .fire({
      title: 'Anda yakin?',
      text: 'Data ini akan di hapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      backdrop: true,
      preConfirm: (value) => {
        return this.pegawaiStore.destroy(id).then((resp) => {
          if (resp.status == 200) {
            return resp
          }
        })
      },
      allowOutsideClick: () => this.pegawaiStore.isDeleteLoading,
    })
    .then((result) => {
      if (result.isConfirmed) {
        if (result.value.status == 200) {
          swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'Data berhasil di hapus',
            backdrop: true,
            allowOutsideClick: () => false,
          })
        } else {
          swal.fire({
            icon: 'error',
            title: 'Opss',
            text: 'Ada permasalahan segera hubungi admin',
            backdrop: true,
            allowOutsideClick: () => false,
          })
        }
      }
    })
}

async function onSubmit() {
  const result = await pegawaiStore.store()
  if (result) {
    showModal.value = false
    pegawaiStore.clearForm()
  }
}

async function edit(item) {
  indexDestroy.value = item.id
  const result = await pegawaiStore.showData(item.id)
  if (result) {
    indexDestroy.value = null
    isEdit.value = true
    showModal.value = true
  }
}

async function onEdit() {
  const result = await pegawaiStore.update()
  if (result) {
    showModal.value = false
  }
}

function onNew() {
  pegawaiStore.clearForm()
  isEdit.value = false
  showModal.value = !showModal.value
}

onMounted(() => {
  pegawaiStore.getData()
})
</script>
