<template>
  <section class="bg-gray-200 mx-auto text-black" v-if="pembelianStore.isLoading">
    <div class="w-screen h-screen">
      <div class="m-auto">
        <span class="loading loading-bars loading-lg"></span>
      </div>
    </div>
  </section>
  <!-- <div class="inline-block absolute 2xl:end-60 bottom-3 xl:bottom-auto">
      <a
        href="javascript:window.print()"
        class="flex items-center justify-end py-2 px-7 rounded-md bg-white print:hidden"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            class="pe-3"
          >
            <path
              d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
            />
          </svg>
        </span>
        Print
      </a>
    </div> -->
  <section class="bg-gray-200 mx-auto text-black" v-else>
    <div class="p-24">
      <div class="rounded-3xl bg-white p-12">
        <div class="flex flex-wrap items-center justify-between gap-6 mb-4">
          <h2 class="text-2xl font-bold">Faktur Pembelian</h2>
          <!-- <img src="assets/images/logo-dark.png" alt="" /> -->
        </div>
        <hr />
        <div class="flex flex-wrap items-center justify-between gap-6 py-4">
          <h5 class="text-base font-normal">
            <span class="font-bold">Tanggal:</span>
            {{ pembelianStore.singleResponses?.created_at }}
          </h5>
          <h5 class="text-base font-normal">
            <span class="font-bold">Nomor Faktur:</span>
            {{ pembelianStore.singleResponses?.nomor_faktur }}
          </h5>
        </div>
        <hr />
        <div class="flex flex-wrap items-center justify-between gap-6 mt-4">
          <div>
            <h4 class="text-base font-bold">Faktur Dari:</h4>
            <p class="font-sm font-normal">
              {{ pembelianStore.singleResponses?.nama_supplier }}
            </p>
          </div>

          <!-- <div class="text-end">
            <h4 class="text-base font-bold">Pay To:</h4>
            <p class="font-sm font-normal">
              24 Dummy Street Area,<br />
              Location, Lorem Ipsum,<br />
              570xx59x
            </p>
          </div> -->
        </div>

        <div class="overflow-x-auto">
          <table class="border-collapse table-auto w-full text-sm mt-14 mb-12 whitespace-pre">
            <thead>
              <tr class="bg-red-600 text-white text-center">
                <th class="p-4 uppercase text-base font-semibold border-white">#</th>
                <th class="p-4 uppercase text-base font-semibold border-s-2 border-white">Nama Item</th>

                <th class="p-4 uppercase text-base font-semibold border-s-2 border-white">Qty</th>
                <th class="p-4 uppercase text-base font-semibold border-s-2 border-white">Harga</th>

                <th class="p-4 uppercase text-base font-semibold border-s-2 border-white">Total</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, index) in pembelianStore.singleResponses?.detail" class="">
                <td class="p-5 text-base font-medium">{{ index + 1 }}</td>
                <td class="p-5 text-base font-medium border-s-2 border-white">
                  {{ item.item.name }}
                </td>
                <td class="p-5 text-base font-medium border-s-2 border-white">
                  {{ item.jumlah }}
                </td>
                <td class="p-5 text-base font-medium border-s-2 border-white">
                  {{ numeral(item.harga).format('0,0') }}
                </td>

                <td class="p-5 text-base font-medium border-s-2 border-white">
                  {{ numeral(parseFloat(item.harga) * parseFloat(item.jumlah)).format('0,0') }}
                </td>
              </tr>

              <tr>
                <td colspan="5" class="p-4 pb-0 border border-white text-base font-semibold text-end">
                  <span class="pe-12 font-bold">Sub Total:</span>{{ numeral(pembelianStore.singleResponses?.sub_total).format('0,0') }}
                </td>
              </tr>
              <tr>
                <td colspan="5" class="pe-5 border border-white text-base font-normal text-end">
                  <span class="pe-12 font-bold">Diskon:</span>{{ numeral(pembelianStore.singleResponses?.diskon).format('0,0') }}
                </td>
              </tr>
              <tr>
                <td colspan="5" class="pe-5 border border-white text-base font-normal text-end">
                  <span class="pe-12 font-bold">Tax:</span>{{ numeral(pembelianStore.singleResponses?.pajak).format('0,0') }}
                </td>
              </tr>
              <tr>
                <td colspan="5" class="pe-5 border border-white text-base font-semibold text-end">
                  <span class="pe-12 font-bold">Total:</span>{{ numeral(pembelianStore.singleResponses?.total).format('0,0') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex flex-wrap items-center justify-between mt-6">
          <h5 class="text-base font-normal">
            <span class="font-bold">{{ pembelianStore.singleResponses?.user.name }}</span>
          </h5>
        </div>

        <!-- <div class="flex flex-wrap justify-between gap-6 mt-28">
          <div>
            <span class="text-lg font-bold">Payment Info:</span>
            <p class="text-sm font-medium pt-2">
              Account No: <span class="font-bold">123456789102</span>
            </p>
            <p class="text-sm font-medium">
              Name: <span class="font-bold">Lorem Ipsum</span>
            </p>
            <p class="text-sm font-medium">
              Bank Account: <span class="font-bold">0123 456 7890</span>
            </p>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { usePembelianStore } from '@/stores/pembelianStore'
import numeral from 'numeral'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const pembelianStore = usePembelianStore()
const route = useRoute()

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  await pembelianStore.showData(id.value)
})
</script>
