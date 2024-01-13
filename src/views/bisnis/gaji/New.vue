<template>
  <section>
    <div class="md:flex">
      <div class="w-full mt-10 md:mt-0 justify-self-end">
        <div class="card flex bg-neutral flex-col">
          <div class="card-body shadow-xl rounded-xl">
            <h2 class="card-title mb-2 text-2xl">Data Penggajian</h2>
            <div class="flex flex-col py-2">
              <div class="w-1/5">
                <button
                  v-if="gajiStore.pegawaiList.length == 0"
                  class="btn w-32 btn-primary modal-button shadow-md"
                  @click="getPegawai()"
                >
                  <ArrowPathIcon
                    v-if="gajiStore.isLoading"
                    class="animate-spin h-5 w-5 text-black dark:text-gray-400"
                    aria-hidden="true"
                  />
                  <span v-else>Fetch Pegawai</span>
                </button>

                <template v-else>
                  <div class="flex space-x-4">
                    <button
                      class="text-white w-32 btn bg-red-500 modal-button shadow-md"
                      @click="onCancel()"
                    >
                      Cancel
                    </button>
                    <button
                      class="btn w-32 btn-primary modal-button shadow-md"
                      @click="onSubmit()"
                    >
                      <ArrowPathIcon
                        v-if="gajiStore.isStoreLoading"
                        class="animate-spin h-5 w-5 text-black dark:text-gray-400"
                        aria-hidden="true"
                      />
                      <span v-else>Proses</span>
                    </button>
                  </div>
                </template>
              </div>

              <div>
                <label for="tanggal" class="label">
                  <span class="label-text">Tanggal Data</span>
                </label>
                <input
                  name="tanggal"
                  type="date"
                  :disabled="gajiStore.pegawaiList.length > 0"
                  v-model="gajiStore.form.created_at"
                  class="input input-bordered w-auto"
                />
              </div>
            </div>

            <div class="flex mt-2 md:overflow-visible overflow-y-auto">
              <table class="table table-compact w-full">
                <!-- head -->
                <thead>
                  <tr>
                    <th></th>
                    <th>Bayarkan</th>
                    <th>Nama Pegawai</th>
                    <th>Gaji Pokok</th>
                    <th>Uang Makan</th>
                    <th>Bonus</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="gajiStore.isLoading">
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
                    <tr v-if="gajiStore.pegawaiList.length == 0">
                      <td colspan="6" class="text-center">Tidak ada data</td>
                    </tr>
                    <tr
                      v-else
                      v-for="(item, index) in gajiStore.pegawaiList"
                      :key="item.id"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td>
                        <input
                          v-model="item.bayarkan"
                          type="checkbox"
                          checked="checked"
                          class="checkbox"
                        />
                      </td>
                      <td>
                        <span
                          :class="
                            item.bayarkan ? '' : 'line-through text-gray-500'
                          "
                          >{{ item.name }}</span
                        >
                      </td>
                      <td>
                        <input
                          :disabled="!item.bayarkan"
                          required
                          v-model="item.gaji"
                          type="text"
                          placeholder="Nama Biaya"
                          class="input input-bordered w-full"
                        />
                      </td>
                      <td>
                        <input
                          :disabled="!item.bayarkan"
                          required
                          v-model="item.uang_makan"
                          type="text"
                          placeholder="Nama Biaya"
                          class="input input-bordered w-full"
                        />
                      </td>
                      <td>
                        <input
                          :disabled="!item.bayarkan"
                          required
                          v-model="item.bonus"
                          type="text"
                          placeholder="Nama Biaya"
                          class="input input-bordered w-full"
                        />
                      </td>
                      <td>
                        <input
                          disabled
                          :value="
                            parseFloat(item.gaji) +
                            parseFloat(item.uang_makan) +
                            parseFloat(item.bonus)
                          "
                          type="text"
                          placeholder="Nama Biaya"
                          class="input input-bordered w-full"
                        />
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-square btn-ghost hover:scale-110"
                          @click="onDelete(item, index)"
                        >
                          <span>
                            <ArrowPathIcon
                              v-if="
                                gajiStore.isDestroyLoading &&
                                indexDestroy == item.id
                              "
                              class="animate-spin h-5 w-5 text-black dark:text-gray-400"
                              aria-hidden="true"
                            />
                            <svg
                              v-else
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              width="36"
                              height="36"
                              class="inline-block w-5 h-5 stroke-current"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </span>
                        </button>
                      </td>
                    </tr>
                  </template>
                </tbody>
                <tfoot>
                  <td colspan="5" class="text-end text-lg text-white">
                    Total Bayar
                  </td>
                  <td class="text-lg text-white">
                    {{ numeralFormat(gajiStore.gajiTotal) }}
                  </td>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGajiStore } from '@/stores/gajiStore'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const gajiStore = useGajiStore()
const router = useRouter()

const indexDestroy = ref(0)

const showModal = ref(false)

async function getPegawai() {
  await gajiStore.getPegawai()
  showModal.value = false
}

function onCancel() {
  gajiStore.$patch((state) => {
    state.pegawai = []
  })
}
async function onSubmit() {
  const result = await gajiStore.store()
  console.info(result)
  if (result == true) {
    router.push({
      name: 'gaji-list',
    })
  }
}

function onDelete(item, index) {
  gajiStore.$patch((state) => {
    state.pegawai.splice(index, 1)
  })

  indexDestroy.value = item.id
}

// onMounted(() => {
//   gajiStore.getData()
// })
</script>
