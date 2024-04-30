<template>
  <section>
    <template v-if="productionOrderStore.isLoading">
      <div
        wire:loading
        class="top-0 left-0 right-0 bottom-0 overflow-hidden opacity-75 flex flex-col items-center justify-center"
      >
        <div
          class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
        ></div>
        <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
        <p class="w-1/3 text-center text-white">
          Sedang mencari data, tolong jangan tutup halaman ini.
        </p>
      </div>
    </template>
    <template v-else>
      <template v-if="productionOrderStore.isDataEmpty">
        <div
          class="min-w-screen flex items-center p-5 lg:p-20 overflow-hidden relative"
        >
          <div
            class="flex-1 min-h-full min-w-full rounded-3xl bg-neutral shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left"
          >
            <div class="w-full md:w-1/2">
              <div class="mb-10 md:mb-20 text-gray-600 font-light">
                <h1
                  class="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10"
                >
                  Opss, ada masalah!
                </h1>
                <p class="text-white">Data yang kamu cari tidak tersedia.</p>
                <p class="text-white">
                  Silahkan klik tombol di bawah ini untuk kembali.
                </p>
              </div>
              <div class="mb-20 md:mb-0">
                <button
                  class="btn btn-warning hover:scale-110 text-black-500 hover:text-black-600"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
          <div
            class="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"
          ></div>
          <div
            class="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"
          ></div>
        </div>
      </template>
      <template v-else>
        <div class="mx-auto justify-center w-full md:w-full lg:w-3/4 sm:w-full">
          <div class="tabs tabs-boxed bg-base rounded-t-l">
            <a
              class="tab tab-lg"
              :class="{ 'tab-active': tabIndex == item.index }"
              v-for="item in tabList"
              :key="item.index"
            >
              {{ item.name }}
            </a>
          </div>
          <div
            class="bg-neutral text-neutral-content rounded-b-lg"
            :class="{ hidden: tabIndex != 0 }"
          >
            <div class="card-body">
              <h2 class="card-title">Data Production Order</h2>
              <p>Lengkapi data dibawah</p>
              <div class="grid gap-y-5">
                <div class="form-control">
                  <label class="join">
                    <span class="w-1/4">Tanggal Order</span>
                    <input
                      v-model="productionOrderStore.editOrder.order_date"
                      type="date"
                      placeholder="Type here"
                      class="input input-bordered w-3/4"
                    />
                  </label>
                </div>
                <hr />
                <div class="form-control">
                  <label class="join">
                    <span class="w-1/4">Shift</span>
                    <input
                      v-model="productionOrderStore.editOrder.shift"
                      type="number"
                      required
                      class="input input-bordered w-3/4"
                    />
                  </label>
                </div>
                <div class="form-control">
                  <label class="join">
                    <span class="w-1/4">Penanggung Jawab</span>
                    <div class="dropdown w-3/4">
                      <input
                        v-model="productionOrderStore.editOrder.pic_name"
                        tabindex="0"
                        type="text"
                        @keyup="searchData"
                        placeholder="Isi dengan Pengawai Penanggu Jawab Shift"
                        class="input input-bordered w-full"
                      />
                      <ul
                        v-if="pegawaiStore.isLoading"
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-full"
                      >
                        <li class="mx-auto">
                          <span class="loading loading-dots loading-lg"></span>
                        </li>
                      </ul>
                      <ul
                        v-else-if="pegawaiStore.items.length > 0"
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-full"
                      >
                        <li v-for="item in pegawaiStore.items">
                          <a
                            @click="
                              productionOrderStore.dataOrder.pic_name =
                                item.name
                            "
                            >{{ item.name }}</a
                          >
                        </li>
                      </ul>
                      <ul
                        v-else
                        tabindex="0"
                        class="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-full"
                      >
                        <li><a>Tidak ada data, silahkan cari Item lain</a></li>
                      </ul>
                    </div>
                  </label>
                </div>
                <div class="form-control">
                  <label class="join">
                    <span class="w-1/4">Catatan</span>
                    <textarea
                      v-model="productionOrderStore.editOrder.notes"
                      class="textarea textarea-bordered w-3/4"
                      placeholder="Bio"
                    ></textarea>
                  </label>
                </div>
                <hr />
                <div class="form-control">
                  <label class="join">
                    <span class="w-1/4">Tanggal Penyelesaian</span>
                    <input
                      v-model="productionOrderStore.editOrder.target_date"
                      id="date"
                      type="date"
                      placeholder="Type here"
                      class="input input-bordered w-3/4"
                    />
                  </label>
                </div>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary" @click="nextTab">Next</button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-neutral text-neutral-content rounded-b-lg"
            :class="{ hidden: tabIndex != 1 }"
          >
            <div class="card-body">
              <h2 class="card-title">Detail Bahan Baku</h2>
              <p>Isi dengan bahan baku yang di gunakan</p>

              <div class="card-actions justify-end">
                <label
                  for="my-modal"
                  class="btn w-32 btn-secondary modal-button shadow-md"
                  ><span class="text-xs">Tambah</span></label
                >
              </div>

              <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
                <table class="table table-compact w-full">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nama</th>
                      <th>Quantity</th>
                      <th>Satuan</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-if="productionOrderStore.inputDataEdit.length < 1">
                      <td colspan="4" class="text-center">
                        <span>Tidak ada data.</span>
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(
                        item, index
                      ) in productionOrderStore.inputDataEdit"
                      :key="item"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td>{{ item.name.toUpperCase() }}</td>
                      <td>
                        <input
                          v-model="item.estimate_quantity"
                          type="number"
                          placeholder="0"
                          min="0"
                          class="input input-bordered input-sm w-1/2 max-w-xs"
                        />
                      </td>
                      <td>{{ item.unit.name.toUpperCase() }}</td>

                      <td>
                        <button
                          class="btn btn-sm btn-square btn-outline"
                          @click="deleteInputData(index, item.name)"
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
                  </tbody>
                </table>
              </div>

              <div class="card-actions justify-between">
                <button type="button" class="btn btn-primary" @click="prevTab">
                  Back
                </button>
                <button type="button" class="btn btn-primary" @click="nextTab">
                  Next
                </button>
              </div>
            </div>
          </div>

          <div
            class="bg-neutral text-neutral-content rounded-b-lg"
            :class="{ hidden: tabIndex != 2 }"
          >
            <div class="card-body">
              <h2 class="card-title">Detail Mesin</h2>
              <p>Isi dengan mesin yang dipergunakan</p>

              <div class="card-actions justify-end">
                <label
                  for="my-modal-machine"
                  class="btn w-32 btn-secondary modal-button shadow-md"
                  @click="etcStore.getMachineData()"
                  ><span class="text-xs">Tambah</span></label
                >
              </div>

              <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
                <table class="table table-compact w-full">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nama</th>
                      <th>Penggunaan</th>
                      <th>Unit</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-if="productionOrderStore.machineDataEdit.length < 1">
                      <td colspan="5" class="text-center">
                        <span>Tidak ada data.</span>
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(
                        item, index
                      ) in productionOrderStore.machineDataEdit"
                      :key="item"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td>{{ item.name.toUpperCase() }}</td>
                      <td>
                        <input
                          v-model="item.usage_meter"
                          type="number"
                          placeholder="0"
                          min="0"
                          class="input input-bordered input-sm w-1/2 max-w-xs"
                        />
                      </td>
                      <td>
                        {{ item.unit == null ? '-' : item.unit.toUpperCase() }}
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-square btn-outline"
                          @click="deleteMachineData(index, item.name)"
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
                  </tbody>
                </table>
              </div>

              <div class="card-actions justify-between">
                <button type="button" class="btn btn-primary" @click="prevTab">
                  Back
                </button>
                <button type="button" class="btn btn-primary" @click="nextTab">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div
            class="bg-neutral text-neutral-content rounded-b-lg"
            :class="{ hidden: tabIndex != 3 }"
          >
            <div class="card-body">
              <h2 class="card-title">Detail Overhead</h2>
              <p>Isi dengan bahan baku yang di gunakan</p>

              <div class="card-actions justify-end">
                <label
                  for="my-modal-overhead"
                  class="btn w-32 btn-secondary modal-button shadow-md"
                  @click="etcStore.getOverheadData()"
                  ><span class="text-xs">Tambah</span></label
                >
              </div>

              <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
                <table class="table table-compact w-full">
                  <!-- head -->
                  <thead>
                    <tr>
                      <td class="text-center">{{ index + 1 }}</td>
                      <th>Nama</th>
                      <th>Pengunaan</th>
                      <th>Satuan</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-if="productionOrderStore.overheadDataEdit.length < 1">
                      <td colspan="5" class="text-center">
                        <span>Tidak ada data.</span>
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(
                        item, index
                      ) in productionOrderStore.overheadDataEdit"
                      :key="item"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td>{{ item.name.toUpperCase() }}</td>
                      <td>
                        <input
                          v-model="item.usage_meter"
                          type="number"
                          placeholder="0"
                          min="0"
                          class="input input-bordered input-sm w-1/2 max-w-xs"
                        />
                      </td>
                      <td>{{ item.unit.toUpperCase() }}</td>

                      <td>
                        <button
                          class="btn btn-sm btn-square btn-outline"
                          @click="deleteOverheadData(index, item.name)"
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
                  </tbody>
                </table>
              </div>

              <div class="card-actions justify-between">
                <button type="button" class="btn btn-primary" @click="prevTab">
                  Back
                </button>
                <button type="button" class="btn btn-primary" @click="nextTab">
                  Next
                </button>
              </div>

              <h2 class="card-title mt-4">Detail Pegawai</h2>
              <p>Isi dengan Operator yang bertugas</p>

              <div class="card-actions justify-end">
                <label
                  for="my-modal-pegawai"
                  class="btn w-32 btn-secondary modal-button shadow-md"
                  @click="getDataPegawai()"
                  ><span class="text-xs">Tambah</span></label
                >
              </div>

              <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
                <table class="table table-compact w-full">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nama</th>
                      <th>Jabatan</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-if="productionOrderStore.editOrder.pegawai.length < 1"
                    >
                      <td colspan="4" class="text-center">
                        <span>Tidak ada data.</span>
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(item, index) in productionOrderStore.editOrder
                        .pegawai"
                      :key="item"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td>{{ item.pegawai.name.toUpperCase() }}</td>
                      <td>{{ item.pegawai.jabatan }}</td>

                      <td>
                        <button
                          class="btn btn-sm btn-square btn-outline"
                          @click="deletePegawaiData(index, item.name)"
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
                  </tbody>
                </table>
              </div>
              <div class="card-actions justify-between">
                <button type="button" class="btn btn-primary" @click="prevTab">
                  Back
                </button>
                <button type="button" class="btn btn-primary" @click="nextTab">
                  Next
                </button>
              </div>
            </div>
          </div>

          <div
            class="bg-neutral text-neutral-content rounded-b-lg"
            :class="{ hidden: tabIndex != 4 }"
          >
            <div class="card-body">
              <h2 class="card-title">Detail Hasil Produksi</h2>
              <p>Isi dengan Item hasil produksi</p>

              <div class="card-actions justify-end">
                <label
                  for="my-modal-barang-jadi"
                  class="btn w-32 btn-secondary modal-button shadow-md"
                  :class="{ 'btn-disabled': productionOrderStore.storeLoading }"
                  ><span class="text-xs">Tambah</span></label
                >
              </div>

              <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
                <table class="table table-compact w-full">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nama</th>
                      <th>Target Quantity</th>
                      <th>Satuan</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-if="productionOrderStore.outputDataEdit.length < 1">
                      <td colspan="5" class="text-center">
                        <span>Tidak ada data.</span>
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(
                        item, index
                      ) in productionOrderStore.outputDataEdit"
                      :key="item"
                    >
                      <td class="text-center"></td>
                      <td>{{ item.name.toUpperCase() }}</td>
                      <td>
                        <input
                          :disabled="productionOrderStore.storeLoading"
                          v-model="item.target_quantity"
                          type="number"
                          placeholder="0"
                          class="input input-bordered input-sm w-1/2 max-w-xs"
                        />
                      </td>
                      <td>{{ item.unit.name.toUpperCase() }}</td>

                      <td>
                        <button
                          :disabled="productionOrderStore.storeLoading"
                          class="btn btn-sm btn-square btn-outline"
                          @click="deleteOutputData(index, item.name)"
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
                  </tbody>
                </table>
              </div>

              <div class="card-actions justify-between">
                <button
                  :disabled="productionOrderStore.storeLoading"
                  type="button"
                  class="btn btn-primary"
                  @click="prevTab"
                >
                  Back
                </button>
                <button
                  v-if="!productionOrderStore.storeLoading"
                  type="button"
                  class="btn btn-accent text-white"
                  @click="onSubmit()"
                >
                  Submit
                </button>
                <button v-else class="btn btn-accent text-white loading">
                  Prosesing
                </button>
              </div>
            </div>
          </div>

          <small
            >Created at
            {{ productionOrderStore.editOrder.created_at }}
            - oleh
            {{ productionOrderStore.editOrder.user.name.toUpperCase() }}</small
          >
        </div>
      </template>
    </template>

    <ModalItemBahanBaku />
    <ModalItemBarangJadi />
    <ModalMachine />
    <ModalOverhead />
    <ModalPegawai />
  </section>
</template>

<script setup>
import { inject, onBeforeMount, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import {
  useEtcStore,
  useItemStore,
  useProductionOrderStore,
} from '@/stores/store'
import { usePegawaiStore } from '@/stores/pegawaiStore'
import { useRouter, useRoute } from 'vue-router'
import ModalItemBahanBaku from './component/ModalItemBahanBaku.vue'
import ModalItemBarangJadi from './component/ModalItemBarangJadi.vue'
import ModalMachine from './component/ModalMachine.vue'
import ModalOverhead from './component/ModalOverhead.vue'
import ModalPegawai from './component/ModalPegawai.vue'

const pegawaiStore = usePegawaiStore()
const router = useRouter()
const route = useRoute()
const swal = inject('$swal')
const toast = useToast()
const searchActive = ref(false)
const itemStore = useItemStore()
const productionOrderStore = useProductionOrderStore()
const etcStore = useEtcStore()

const tabIndex = ref(0)
const tabList = [
  { index: 0, name: 'Data Order' },
  { index: 1, name: 'Bahan Baku' },
  { index: 2, name: 'Mesin' },
  { index: 3, name: 'Overhead / Lainnya' },
  { index: 4, name: 'Hasil Produksi' },
]

itemStore.getItemData()
function nextTab() {
  tabIndex.value++
}

function prevTab() {
  tabIndex.value--
}

async function onSubmit() {
  if (productionOrderStore.outputDataEdit.length <= 0) {
    return swal.fire({
      title: 'Opps',
      text: 'Data hasil produksi belum di isi',
      icon: 'warning',
    })
  }
  await swal
    .fire({
      title: 'Proses?',
      text: 'Update produksi akan di proses!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proses!',
      showLoaderOnConfirm: true,
      backdrop: true,
      allowOutsideClick: () => productionOrderStore.storeLoading,
      preConfirm: (val) => {
        return productionOrderStore.updateProductionOrder().then((resp) => {
          if (resp.status == 200) {
            return resp
          }
        })
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        if (result.value.status == 200) {
          swal
            .fire({
              icon: 'success',
              title: 'Berhasil',
              text: 'Produksi baru berhasil di perbaharui',
              backdrop: true,
              allowOutsideClick: () => false,
            })
            .then(() => {
              router.push({
                name: 'produksi-order-finish',
                params: { id: result.value.data.data.id },
              })
            })
          productionOrderStore.$reset()
        } else {
          swal.fire('Oopss, ada permasalahan', 'error')
        }
      } else {
      }
    })
}

function deleteInputData(index, name) {
  productionOrderStore.deleteInputEditData(index)
  toast.warning(`Bahan baku ${name} di hapus`, {
    timeout: 1000,
  })
}

function deleteOutputData(index, name) {
  productionOrderStore.deleteOutputEditData(index)
  toast.warning(`Output ${name} di hapus`, {
    timeout: 1000,
  })
}

function deleteMachineData(index, name) {
  productionOrderStore.deleteMachineEditData(index)
  toast.warning(`Mesin ${name} di hapus`, {
    timeout: 1000,
  })
}

function deleteOverheadData(index, name) {
  productionOrderStore.deleteOverheadEditData(index)
  toast.warning(`Overhead ${name} di hapus`, {
    timeout: 1000,
  })
}

function deletePegawaiData(index, name) {
  productionOrderStore.deletePegawaiEditData(index)
  toast.warning(`Pegawai ${name} di hapus`, {
    timeout: 1000,
  })
}

onMounted(() => {
  pegawaiStore.getData()
})

onBeforeMount(() => {
  if (route.params) {
    productionOrderStore.$patch({
      currentId: route.params.id,
    })
    productionOrderStore.getProductionOrderData(true)
  }
})
</script>
