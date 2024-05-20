<template>
  <div class="flex">
    <div class="flex-col md:w-2/6 w-full mr-10 space-y-5">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Cari Data Item</h2>
          <div class="justify-center my-4">
            <div class="dropdown dropdown-hover w-full">
              <input
                v-model="itemStore.searchName"
                tabindex="0"
                type="text"
                @keyup="searchData"
                placeholder="Cari Data Barang"
                class="input input-bordered w-full"
              />

              <ul v-if="itemStore.items.length > 0" tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                <li v-for="(item, index) in itemStore.items" :key="index">
                  <a @click="penjualanStore.addCart(item)">{{ item.name }}</a>
                </li>
              </ul>
              <ul v-else tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                <li><a>Tidak ada data, silahkan cari Item lain</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Detail Transaksi</h2>
          <form class="justify-center my-4" @submit.prevent="proses">
            <div class="form-control">
              <div class="label">
                <span class="">Tanggal Transaksi</span>
              </div>
              <input required v-model="penjualanStore.form.tanggal_transaksi" id="date" type="date" class="input input-bordered w-full" />
            </div>

            <div class="form-control w-full">
              <div class="label">
                <span class="">Nomor Faktur</span>
              </div>
              <input required v-model="penjualanStore.form.nomor_faktur" type="text" class="input input-bordered w-full" />
            </div>
            <hr class="my-4" />

            <div class="form-control w-52">
              <label class="cursor-pointer label">
                <input type="checkbox" class="toggle toggle-primary" v-model="penjualanStore.form.pelanggan_tetap" />
                <span class="label-text">Pelanggan Tetap</span>
              </label>
            </div>
            <template v-if="!penjualanStore.form.pelanggan_tetap">
              <div class="form-control w-full">
                <div class="label">
                  <span class="">Nama Pelanggan</span>
                </div>
                <input required v-model="penjualanStore.form.nama_pelanggan" type="text" class="input input-bordered w-full" />
              </div>
              <div class="form-control w-full">
                <div class="label">
                  <span class="">Alamat</span>
                </div>
                <textarea required v-model="penjualanStore.form.alamat" type="text" class="textarea textarea-bordered w-full"></textarea>
              </div>
              <div class="form-control w-full">
                <div class="label">
                  <span class="">Nomor Telepon</span>
                </div>
                <input required v-model="penjualanStore.form.nomor_telepon" type="text" class="input input-bordered w-full" />
              </div>
            </template>
            <template v-else>
              <div class="form-control w-full">
                <div class="label">
                  <span class="">Cari Pelanggan</span>
                </div>
                <div class="dropdown dropdown-hover w-full">
                  <input
                    v-model="pelangganStore.searchName"
                    tabindex="0"
                    type="text"
                    @keyup="searchDataPelanggan"
                    placeholder="Cari Pelanggan"
                    class="input input-bordered w-full"
                  />

                  <ul v-if="pelangganStore.items.length > 0" tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                    <li v-for="item in pelangganStore.items">
                      <a @click="setPelanggan(item)">{{ item.name }}</a>
                    </li>
                  </ul>
                  <ul v-else tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                    <li><a>Tidak ada data, silahkan cari Item lain</a></li>
                  </ul>
                </div>
              </div>
              <div class="form-control w-full">
                <div class="label">
                  <span class="">Alamat</span>
                </div>
                <textarea required v-model="penjualanStore.form.pelanggan.alamat" type="text" class="textarea textarea-bordered w-full"></textarea>
              </div>
              <div class="form-control w-full">
                <div class="label">
                  <span class="">Nomor Telepon</span>
                </div>
                <input required v-model="penjualanStore.form.pelanggan.nomor_telepon" type="text" class="input input-bordered w-full" />
              </div>
            </template>

            <hr class="my-4" />
            <div class="form-control w-full">
              <div class="label">
                <span class="">Total (IDR) </span>
              </div>
              <input required readonly type="text" :value="numeral(penjualanStore.cartTotal).format('0,0')" class="input input-bordered w-full" />
            </div>

            <div class="form-control w-full">
              <div class="label">
                <span class="">Pajak (IDR) </span>
              </div>
              <select v-model="penjualanStore.tipePajak" class="select select-bordered w-full">
                <option value="0" selected>Tanpa Pajak</option>
                <option value="11">PPN 11%</option>
              </select>
              <input required readonly type="text" :value="numeral(penjualanStore.pajakTotal).format('0,0')" class="input input-bordered w-full" />
            </div>
            <div class="form-control w-full">
              <div class="label">
                <span class="">Ongkos Kirim</span>
              </div>
              <InputCurrency v-model="penjualanStore.form.ongkir" :options="{ currency: 'IDR' }" />
            </div>
            <div class="form-control w-full">
              <div class="label">
                <span class="">Grand Total (IDR)</span>
              </div>
              <input required readonly :value="numeral(penjualanStore.grandTotal).format('0,0')" type="text" class="input input-bordered w-full" />
            </div>
            <button type="submit" :disabled="penjualanStore.isStoreLoading" class="mt-6 btn btn-accent w-32 hover:btn-primary my-2">
              <span v-if="penjualanStore.isStoreLoading" class="loading loading-infinity loading-lg"></span>
              <span v-else>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="card flex flex-col h-fit w-full">
      <div class="card-body shadow-xl rounded-xl">
        <h2 class="card-title mb-2 text-2xl">Daftar Penjualan</h2>

        <div class="flex mt-2 lg:overflow-visible overflow-x-auto">
          <table class="table table-compact lg:w-full">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Nama Item</th>
                <th>Kuantitas</th>
                <th>Satuan</th>
                <th>Harga Jual</th>
                <th>Discount</th>
                <th>Total (IDR)</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="penjualanStore.form.cart.length == 0">
                <td colspan="8" class="text-center">Tidak ada data</td>
              </tr>
              <tr v-else v-for="(item, index) in penjualanStore.form.cart" :key="index">
                <td class="text-center">
                  {{ 1 + index }}
                </td>
                <td>{{ item.name }}</td>
                <td>
                  <input v-model="item.jumlah" type="text" placeholder="Jumlah Pembelian" class="input input-bordered w-full max-w-xs" />
                </td>
                <td>
                  {{ item.unit?.name }}
                </td>
                <td>
                  <InputCurrency v-model="item.harga" :options="{ currency: 'IDR' }" />
                </td>
                <td>
                  <InputCurrency v-model="item.discount" :options="{ currency: 'IDR' }" />
                </td>
                <td>
                  <input
                    readonly
                    :value="numeral(item.harga * item.jumlah - item.discount).format('0,0')"
                    type="text"
                    placeholder="Jumlah Pembelian"
                    class="input input-bordered w-full max-w-xs"
                  />
                </td>
                <td>
                  <TrashIcon @click="removeItem(index)" class="w-6 h-6 cursor-pointer transition duration-150 ease-in-out hover:scale-120" />
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <th colspan="6" class="text-right text-xl">Total</th>
                <th class="text-xl">
                  {{ numeral(penjualanStore.cartTotal).format('0,0') }}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputCurrency from '@/components/InputCurrency.vue'

import { computed, onMounted, ref, watch, inject, onUnmounted } from 'vue'
import { usePenjualanStore } from '@/stores/penjualanStore'
import { usePelangganStore } from '@/stores/pelangganStore'
import { useMainStore } from '@/stores/mainStore'
import { useDebounceFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useItemStore } from '@/stores/store'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { useToast } from 'vue-toastification'
import numeral from 'numeral'
const swal = inject('$swal')

const router = useRouter()
const penjualanStore = usePenjualanStore()
const pelangganStore = usePelangganStore()
const itemStore = useItemStore()
const toast = useToast()

const searchData = useDebounceFn(() => {
  itemStore.$patch((state) => {
    state.currentLimit = 5
  })
  itemStore.getItemData()
}, 500)

const searchDataPelanggan = useDebounceFn(() => {
  pelangganStore.$patch((state) => {
    state.currentLimit = 5
  })
  pelangganStore.getItemData()
}, 500)

function setPelanggan(item) {
  pelangganStore.searchName = item.name
  penjualanStore.form.pelanggan = item
}

function removeItem(index) {
  penjualanStore.form.cart.splice(index, 1)
  toast.info('Item dihapus', {
    timeout: 1000,
    position: 'bottom-right',
  })
}

function proses() {
  if (penjualanStore.checkCartExisting()) {
    swal
      .fire({
        title: 'Proses',
        text: 'Transaksi Penjualan akan di Proses!',
        showCancelButton: true,
        confirmButtonText: 'Proses',
        showLoaderOnConfirm: true,
        preConfirm: penjualanStore.store,
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
      .then((result) => {
        if (result.value == true) {
          swal
            .fire({
              title: 'Transaksi berhasil',
              icon: 'success',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Print Faktur',
              denyButtonText: `Daftar Penjualan`,
              allowOutsideClick: false,
              allowEscapeKey: false,
            })
            .then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                penjualanStore.showFaktur(penjualanStore.resultId)
                // router.push({
                //   name: 'pembelian-faktur',
                //   params: {
                //     id: penjualanStore.resultId,
                //   },
                // })
              } else if (result.isDenied) {
                router.push({
                  name: 'penjualan-list',
                })
              }
            })
        }
      })
  } else {
    swal.fire({
      title: 'Cek kembali data!!',
      icon: 'error',
    })
  }
}

onMounted(() => {
  penjualanStore.getFakturNumber()
  pelangganStore.getData()
})
onUnmounted(() => {
  pelangganStore.$reset()
  penjualanStore.$reset()
  itemStore.$reset()
})
</script>
