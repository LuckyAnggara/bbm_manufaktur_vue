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
        <div class="md:flex md:gap-x-4 grid grid-cols-2 gap-2">
          <button class="btn gap-2 btn-primary w-32 hover:btn-secondary mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>
            Edit
          </button>

          <button class="btn gap-2 btn-secondary w-32 hover:btn-primary mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Update
          </button>

          <button
            class="btn gap-2 btn-error w-32 hover:btn-primary mb-4"
            @click="onDelete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Delete
          </button>
        </div>

        <div class="md:flex justify-between">
          <div class="md:mb-0 mb-4" style="max-width: 800px" id="printArea">
            <div class="card card-compact w-full bg-neutral shadow-xl p-8">
              <h2 class="card-title">Kertas Kerja Produksi</h2>
              <div class="card-body">
                <div class="flex items-center justify-between mb-8 px-3">
                  <div>
                    <span class="text-2xl">Production Order #</span
                    >{{ dataOrder.sequence }}<br />
                    <span>Tanggal</span>:
                    {{ $moment(dataOrder.order_date).format('DD MMMM YYYY')
                    }}<br />
                  </div>
                  <div class="text-right">
                    <span class="text-gray-600 text-4xl">BBM. </span>
                  </div>
                </div>

                <div class="flex justify-between px-3">
                  <div>Nama Pelanggan : {{ dataOrder.customer_name }}</div>
                </div>
                <div class="flex justify-between mb-4 px-3">
                  <div>Penanggung Jawab : {{ dataOrder.pic_name }}</div>
                </div>

                <div class="border border-t-2 border-gray-200 mb-2 px-3"></div>

                <div class="mb-2 px-3">
                  <p>Bahan baku yang di pergunakan</p>
                </div>

                <div
                  class="flex justify-between mb-4 bg-gray-600 px-3 py-2"
                  v-for="input in dataOrder.input"
                  :key="input.id"
                >
                  <div>{{ input.item.name }}</div>
                  <div class="text-right font-medium">
                    {{ input.estimate_quantity }}
                    {{ input.item.unit.name }}
                  </div>
                </div>

                <div class="mb-2 px-3">
                  <p>Output pekerjaan</p>
                </div>

                <div
                  class="flex justify-between mb-1 bg-gray-600 px-3 py-2"
                  v-for="output in dataOrder.output"
                  :key="output.id"
                >
                  <div>{{ output.item.name }}</div>
                  <div class="text-right font-medium">
                    {{ output.target_quantity }}
                    {{ output.item.unit.name }}
                  </div>
                </div>

                <div class="flex justify-between items-center mb-3 px-3">
                  <div class="text-1xl leading-none">
                    <span class="">Target Penyelesaian</span>:
                  </div>
                  <div class="text-2xl text-right font-medium">
                    {{ $moment(dataOrder.target_date).format('DD MMMM YYYY') }}
                  </div>
                </div>

                <div class="flex justify-between mb-8 px-3">
                  <div class="text-1xl leading-none w-1/4 text-start">
                    <span class="">Catatan</span> :
                  </div>
                  <div class="text-1xl leading-none w-3/4 text-end">
                    <div class="text-justify px-0 leading-tight">
                      <small class="text-xs"
                        >Nullam auctor, tellus sit amet eleifend interdum, quam
                        nisl luctus quam, a tincidunt nisi eros ac dui.
                        Curabitur leo ipsum, bibendum sit amet suscipit sed,
                        gravida non lectus. Nunc porttitor lacus sapien, nec
                        congue quam cursus nec. Quisque vel vehicula ipsum.
                        Donec condimentum dolor est, ut interdum augue blandit
                        luctus.
                      </small>
                    </div>
                  </div>
                </div>

                <div class="border border-t-2 border-gray-200 mb-5 px-3"></div>

                <div class="mb-8 px-3">
                  <span
                    >Kertas kerja ini agar dilaksanakan sesuai dengan Prosedur
                    yang berlaku.</span
                  >
                </div>

                <div class="flex justify-between items-center mt-4 px-3">
                  <div class="text-1xl leading-none w-1/2 text-center">
                    <span class="">Administrator</span>
                  </div>
                  <div class="text-1xl leading-none w-1/2 text-center">
                    <span class="">Bagian Produksi</span>
                  </div>
                </div>

                <div class="flex justify-between items-center mt-12 px-3">
                  <div class="text-1xl leading-none w-1/2 text-center">
                    <span class="">Lucky</span>
                  </div>
                  <div class="text-1xl leading-none w-1/2 text-center">
                    <span class="">Kalula</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card md:w-1/3 w-full">
            <body class="bg-neutral rounded-xl pb-5">
              <div class="p-4 mt-4">
                <h1 class="text-4xl text-center font-semibold mb-6">
                  Status pekerjaan
                </h1>
                <div class="container">
                  <div
                    class="flex flex-col md:grid grid-cols-12 text-gray-50"
                    v-for="timeline in dataOrder.timeline"
                    :key="timeline.id"
                  >
                    <div class="flex md:contents">
                      <div
                        class="col-start-2 col-end-4 mr-10 md:mx-auto relative"
                      >
                        <div
                          class="h-full w-6 flex items-center justify-center"
                        >
                          <div
                            class="h-full w-1 bg-green-500 pointer-events-none"
                          ></div>
                        </div>
                        <div
                          class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center"
                        >
                          <i class="fas fa-check-circle text-white"></i>
                        </div>
                      </div>
                      <div
                        class="col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full"
                        :class="randomBg"
                      >
                        <h3 class="font-semibold text-lg mb-1">
                          {{ timeline.status }}
                        </h3>
                        <p class="leading-tight text-justify w-full">
                          {{
                            $moment(timeline.created_at).format('DD MMMM YYYY')
                          }}
                          ( {{ timeline.user.name.toUpperCase() }} )
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </div>
        </div>

        <button class="btn gap-2 btn-secondary w-32 hover:btn-primary mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
            />
          </svg>
          Print
        </button>
      </template>
    </template>
  </section>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useProductionOrderStore } from '../../../stores/store'
export default {
  setup() {
    const productionOrderStore = useProductionOrderStore()

    const randomBg = computed(() => {
      const array = [
        'bg-green-500',
        'bg-red-500',
        'bg-blue-500',
        'bg-yellow-500',
      ]
      return array.at(Math.floor(Math.random() * 3))
    })

    return {
      randomBg,
      productionOrderStore,
    }
  },
  computed: {
    dataOrder() {
      return this.productionOrderStore.currentData
    },
  },
  methods: {
    async aw() {
      await this.$print('printArea')
    },
    onDelete() {
      this.$swal
        .fire({
          title: 'Anda yakin?',
          text: 'Data ini akan di hapus!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Hapus!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.productionOrderStore.deleteProductionOrderData(
              this.dataOrder.id
            )
            this.$router.push({
              name: 'produksi-order-list',
            })
          }
        })
    },
  },
  created() {
    if (this.$route.params) {
      this.productionOrderStore.$patch({
        currentId: this.$route.params.id,
      })
      this.productionOrderStore.getProductionOrderData()
    }
  },
}
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
