<template>
  <div class="flex flex-col space-y-4">
    <div class="flex-col w-full card shadow-xl rounded-xl p-6">
      <div class="card flex flex-row space-x-6">
        <div class="w-1/3">
          <h2 class="card-title mb-2">Data Pelanggan</h2>

          <div class="form-control w-52">
            <label class="cursor-pointer label">
              <input type="checkbox" checked="checked" class="checkbox checkbox-primary" v-model="penjualanStore.form.pelanggan_tetap" />

              <!-- <input
                  type="checkbox"
                  class="toggle border-blue-500 bg-blue-500 [--tglbg:yellow] hover:bg-blue-700"
                  
                /> -->
              <span class="label-text">Pelanggan Tetap</span>
            </label>
          </div>
          <template v-if="!penjualanStore.form.pelanggan_tetap">
            <div class="flex flex-col space-y-2">
              <label class="input input-bordered flex items-center gap-2">
                <UserIcon class="h-4 w-4 opacity-70" />
                <input required v-model="penjualanStore.form.nama_pelanggan" type="text" class="grow input-sm" placeholder="Nama Pelanggan" />
              </label>

              <label class="input input-bordered flex items-center gap-2">
                <UserIcon class="h-4 w-4 opacity-70" />
                <input required v-model="penjualanStore.form.alamat" type="text" class="grow input-sm" placeholder="Alamat Pelanggan" />
              </label>

              <label class="input input-bordered flex items-center gap-2">
                <PhoneIcon class="h-4 w-4 opacity-70" />
                <input required v-model="penjualanStore.form.nomor_telepon" type="text" class="grow input-sm" placeholder="Nomor Telepon" />
              </label>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col space-y-2">
              <label class="input input-bordered flex items-center gap-2">
                <div class="dropdown dropdown-hover w-full">
                  <input
                    v-model="pelangganStore.searchName"
                    tabindex="0"
                    type="text"
                    @keyup="searchDataPelanggan"
                    placeholder="Cari Pelanggan"
                    class="grow input-sm"
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
                <MagnifyingGlassIcon class="h-4 w-4 opacity-70" />
              </label>

              <label class="input input-bordered flex items-center gap-2">
                <UserIcon class="h-4 w-4 opacity-70" />
                <input required v-model="penjualanStore.form.pelanggan.alamat" type="text" class="grow input-sm" placeholder="Alamat Pelanggan" />
              </label>

              <label class="input input-bordered flex items-center gap-2">
                <PhoneIcon class="h-4 w-4 opacity-70" />
                <input required v-model="penjualanStore.form.pelanggan.nomor_telepon" type="text" class="grow input-sm" placeholder="Nomor Telepon" />
              </label>
            </div>
          </template>
        </div>

        <div class="w-1/3">
          <h2 class="card-title mb-2">Detail Transaksi</h2>
          <div class="flex flex-col space-y-2">
            <label class="input input-bordered flex items-center gap-2">
              <CalendarDaysIcon class="h-4 w-4 opacity-70" />
              <input required v-model="penjualanStore.form.tanggal_transaksi" type="text" class="grow input-sm" placeholder="Tanggal Transaksi" />
            </label>

            <label class="input input-bordered flex items-center gap-2">
              <KeyIcon class="h-4 w-4 opacity-70" />
              <input required v-model="penjualanStore.form.nomor_faktur" type="text" class="grow input-sm" placeholder="Nomor Faktur" />
            </label>

            <div class="form-control w-full flex flex-row space-x-4">
              <div class="label w-1/5">
                <span class="">Sales </span>
              </div>
              <select class="select select-bordered w-4/5" v-model="penjualanStore.form.sales_id">
                <option :value="0">Tidak ada</option>
                <option v-for="(sales, index) in penjualanStore.dataSales" :key="index" :value="sales.id">
                  {{ sales.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="w-1/3">
          <h2 class="card-title mb-2">Cari Data Barang</h2>

          <label class="input input-bordered flex items-center gap-2">
            <div class="dropdown dropdown-hover w-full">
              <input v-model="itemStore.searchName" tabindex="0" type="text" @keyup="searchData" placeholder="Cari Data Barang" class="grow input-sm" />

              <ul v-if="itemStore.items.length > 0" tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                <li v-for="(item, index) in itemStore.items" :key="index">
                  <a @click="penjualanStore.addCart(item)">{{ item.name }}</a>
                </li>
              </ul>
              <ul v-else tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                <li><a>Tidak ada data, silahkan cari Item lain</a></li>
              </ul>
            </div>
            <MagnifyingGlassIcon class="h-4 w-4 opacity-70" />
          </label>
        </div>
      </div>
    </div>

    <div class="card flex flex-col h-fit w-full">
      <div class="card-body shadow-xl rounded-xl">
        <h2 class="card-title mb-2">Daftar Penjualan</h2>

        <div class="flex mt-2 lg:overflow-visible overflow-x-auto">
          <table class="table table-compact lg:w-full">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Nama Item</th>
                <th>Kuantitas</th>
                <th>Satuan</th>
                <!-- <th>Harga Pokok</th> -->
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
                <!-- <td>
                  <InputCurrency
                    v-model="item.cogs"
                    :options="{ currency: 'IDR' }"
                  />
                </td> -->
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
                <th colspan="7" class="text-right text-xl">Total</th>
                <th class="text-xl">
                  {{ numeral(penjualanStore.cartTotal).format('0,0') }}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <div class="card w-2/5">
      <div class="card-body shadow-xl rounded-xl">
        <h2 class="card-title">Detail Transaksi</h2>
        <form class="justify-center my-4 space-y-2" @submit.prevent="proses">
          <div class="form-control w-full flex-row">
            <div class="label w-2/5">
              <span class="">Total (IDR) </span>
            </div>
            <input required readonly type="text" :value="numeral(penjualanStore.cartTotal).format('0,0')" class="input input-bordered input-sm w-3/5" />
          </div>

          <div class="form-control w-full flex flex-row space-x-4">
            <div class="label w-2/5">
              <span class="">Pajak (IDR) </span>
            </div>
            <select v-model="penjualanStore.tipePajak" class="select select-bordered w-2/5 select-sm">
              <option value="0" selected>Tanpa Pajak</option>
              <option value="11">PPN 11%</option>
            </select>
            <input required readonly type="text" :value="numeral(penjualanStore.pajakTotal).format('0,0')" class="input input-bordered w-full input-sm" />
          </div>
          <div class="form-control w-full flex-row">
            <div class="label w-2/5">
              <span class="">Ongkos Kirim (IDR)</span>
            </div>
            <input required type="text" v-model="penjualanStore.form.ongkir" class="input input-bordered input-sm w-3/5" />
          </div>
          <div class="form-control w-full flex-row">
            <div class="label w-2/5">
              <span class="">Grand Total (IDR)</span>
            </div>
            <input required readonly :value="numeral(penjualanStore.grandTotal).format('0,0')" type="text" class="input input-bordered input-sm w-3/5" />
          </div>
          <button type="submit" :disabled="penjualanStore.isStoreLoading" class="mt-6 btn btn-accent w-32 hover:btn-primary my-2">
            <span v-if="penjualanStore.isStoreLoading" class="loading loading-infinity loading-lg"></span>
            <span v-else>Submit</span>
          </button>
        </form>
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
import { TrashIcon, MagnifyingGlassIcon, UserIcon, PhoneIcon, CalendarDaysIcon, KeyIcon } from '@heroicons/vue/24/solid'
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
  penjualanStore.getDataSales()
})
onUnmounted(() => {
  pelangganStore.$reset()
  penjualanStore.$reset()
  itemStore.$reset()
})
</script>
