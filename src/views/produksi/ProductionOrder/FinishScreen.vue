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
        <div class="md:flex md:gap-x-4 grid grid-cols-2 gap-2 mb-6">
          <button
            v-show="dataOrder.status == 'NEW ORDER'"
            class="btn gap-2 btn-primary hover:btn-secondary w-32"
            @click="onEdit"
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
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>
            Edit
          </button>

          <button
            v-if="doneProduction ? false : true"
            class="btn gap-2 w-32 btn-primary hover:btn-secondary"
            @click="onUpdateStatus"
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
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Status
          </button>

          <button
            v-if="
              dataOrder.status == 'NEW ORDER' ||
              !dataOrder.status == 'WORK IN PROGRESS'
            "
            class="btn gap-2 w-32 btn-primary hover:btn-secondary"
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

          <button
            class="btn gap-2 btn-primary hover:btn-secondary w-32"
            @click="printData"
          >
            <template v-if="productionOrderStore.isLoadingPrint">
              <svg
                role="status"
                class="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </template>
            <template v-else>
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
            </template>
          </button>

          <button
            v-if="dataOrder.status == 'WORK IN PROGRESS'"
            class="btn gap-2 btn-primary hover:btn-secondary w-32"
            @click="onUpdate"
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
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Update
          </button>

          <button
            v-if="dataOrder.status == 'DONE PRODUCTION'"
            class="btn gap-2 btn-primary hover:btn-secondary"
            @click="onWarehouse"
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
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
            Warehouse
          </button>

          <button
            v-if="
              dataOrder.status == 'WAREHOUSE' || dataOrder.status == 'RETUR'
            "
            class="btn gap-2 btn-primary hover:btn-secondary"
            @click="onShipping"
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
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            Shipping
          </button>

          <button
            v-if="dataOrder.status == 'SHIPPING'"
            class="btn gap-2 btn-primary hover:btn-secondary"
            @click="onRetur"
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
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>

            Retur
          </button>

          <button
            v-if="dataOrder.status == 'SHIPPING'"
            class="btn gap-2 btn-primary hover:btn-secondary"
            @click="onReceive"
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
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>

            Receive
          </button>
        </div>
        <div class="md:flex justify-between">
          <div class="md:mb-0 mb-4 md:w-3/5 w-full mr-5" id="printArea">
            <div class="card card-compact w-full bg-neutral shadow-xl p-5">
              <h2 class="text-3xl mb-5 px-2">Kertas Kerja Produksi</h2>
              <h2 class="card-title px-2">
                Status Pekerjaan : {{ dataOrder.status }}
              </h2>
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

                <div class="flex px-3">
                  <div class="w-4/12 px-3 py-2">
                    <div class="text-left font-medium">Nama Pelanggang</div>
                  </div>
                  <div class="w-1/12 px-3 py-2">
                    <div class="text-left font-medium">:</div>
                  </div>
                  <div class="w-7/12 px-3 py-2">
                    <div class="text-sm text-left font-medium">
                      {{ dataOrder.customer_name }}
                    </div>
                  </div>
                </div>

                <div class="flex px-3">
                  <div class="w-4/12 px-3 py-2">
                    <div class="text-left font-medium">Penanggung Jawab</div>
                  </div>
                  <div class="w-1/12 px-3 py-2">
                    <div class="text-left font-medium">:</div>
                  </div>
                  <div class="w-7/12 px-3 py-2">
                    <div class="text-sm text-left font-medium">
                      {{ dataOrder.pic_name }}
                    </div>
                  </div>
                </div>

                <div class="border border-t-2 border-gray-200 mb-2 px-3"></div>

                <div class="flex px-3">
                  <div class="w-1/3 px-3 py-2">
                    <div class="text-left font-medium">
                      Bahan baku yang di pergunakan
                    </div>
                  </div>
                  <div class="w-2/3 px-3 border-solid border-2 border-grey-500">
                    <div
                      class="flex justify-between my-2"
                      v-for="input in dataOrder.input"
                      :key="input.id"
                    >
                      <div class="text-left font-medium w-1/12">-</div>
                      <div class="text-left font-medium w-8/12">
                        {{ input.item.name }}
                      </div>
                      <div class="text-left font-medium w-3/12">
                        {{
                          doneProduction
                            ? input.real_quantity
                            : input.estimate_quantity
                        }}
                        {{ input.item.unit.name }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex px-3">
                  <div class="w-1/3 px-3 py-2">
                    <div class="text-left font-medium">
                      Mesin yang di pergunakan
                    </div>
                  </div>
                  <div class="w-2/3 px-3 border-solid border-2 border-grey-500">
                    <div
                      class="flex justify-between my-2"
                      v-for="machine in dataOrder.machine"
                      :key="machine.id"
                    >
                      <div class="text-left font-medium w-1/12">-</div>
                      <div class="text-left font-medium w-8/12">
                        {{ machine.machine.name }}
                      </div>
                      <div class="text-left font-medium w-3/12">
                        {{ machine.usage_meter }} {{ machine.machine.unit }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex px-3">
                  <div class="w-1/3 px-3 py-2">
                    <div class="text-left font-medium">Alat lainnya</div>
                  </div>
                  <div class="w-2/3 px-3 border-solid border-2 border-grey-500">
                    <div
                      class="flex justify-between my-2"
                      v-for="overhead in dataOrder.overhead"
                      :key="overhead.id"
                    >
                      <div class="text-left font-medium w-1/12">-</div>
                      <div class="text-left font-medium w-8/12">
                        {{ overhead.overhead.name }}
                      </div>
                      <div class="text-left font-medium w-3/12">
                        {{ overhead.usage_meter }} {{ overhead.overhead.unit }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex px-3">
                  <div class="w-1/3 px-3 py-2">
                    <div class="text-left font-medium">Output Produksi</div>
                  </div>
                  <div class="w-2/3 px-3 border-solid border-2 border-grey-500">
                    <div
                      class="flex justify-between my-2"
                      v-for="output in dataOrder.output"
                      :key="output.id"
                    >
                      <div class="text-left font-medium w-1/12">-</div>
                      <div class="text-left font-medium w-8/12">
                        {{ output.item.name }}
                      </div>
                      <div class="text-left w-3/12">
                        {{
                          doneProduction
                            ? output.real_quantity
                            : output.target_quantity
                        }}
                        {{ output.item.unit.name }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="border border-t-2 border-gray-200 mt-2 px-3"></div>

                <div class="flex px-3">
                  <div class="w-4/12 px-3 py-2">
                    <div class="text-left font-medium">Target Produksi</div>
                  </div>
                  <div class="w-1/12 px-3 py-2">
                    <div class="text-left font-medium">:</div>
                  </div>
                  <div class="w-7/12 px-3 py-2">
                    <div class="text-sm text-right font-medium">
                      {{
                        $moment(dataOrder.target_date).format('DD MMMM YYYY')
                      }}
                    </div>
                  </div>
                </div>

                <div class="flex px-3">
                  <div class="w-4/12 px-3 py-2">
                    <div class="text-left font-medium">Catatan</div>
                  </div>
                  <div class="w-1/12 px-3 py-2">
                    <div class="text-left font-medium">:</div>
                  </div>
                  <div class="w-7/12 px-3 py-2">
                    <div class="text-sm text-right font-medium">
                      <small class="text-sm" style="white-space: pre-wrap">
                        {{ dataOrder.notes }}
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
                    <span class="">Maker</span>
                  </div>
                  <div class="text-1xl leading-none w-1/2 text-center">
                    <span class="">Bagian Produksi</span>
                  </div>
                </div>

                <div class="flex justify-between items-center mt-12 px-3">
                  <div
                    v-if="!editMaker"
                    class="text-1xl leading-none w-1/2 text-center"
                    @dblclick="editMaker = true"
                  >
                    <span class="">{{
                      productionOrderStore.currentData.user.name.toUpperCase()
                    }}</span>
                  </div>
                  <div class="text-1xl leading-none w-1/2 text-center" v-else>
                    <input
                      @focusout="editMaker = false"
                      type="text"
                      v-model="productionOrderStore.currentData.user.name"
                      placeholder="Ketik disini"
                      class="input w-full max-w-xs align-middle"
                      style="text-align: center"
                    />
                    <!-- <span class="">Kalula</span> -->
                  </div>
                  <div class="text-1xl leading-none w-1/2 text-center">
                    <input
                      type="text"
                      v-model="dataOrder.pic_production"
                      placeholder="Ketik disini"
                      class="input w-full max-w-xs align-middle"
                      style="text-align: center"
                    />
                    <!-- <span class="">Kalula</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card md:w-1/3 w-full">
            <body class="bg-neutral rounded-xl pb-5">
              <div class="p-4 mt-4">
                <h1 class="text-4xl text-center font-semibold mb-6">
                  Timeline Pekerjaan
                </h1>
                <div class="container overflow-y-auto max-h-screen">
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
                        <div class="leading-tight text-justify w-full">
                          {{ timeline.notes }} <br />
                          <small>
                            {{ $moment(timeline.created_at).format('LLL') }}
                            ( {{ timeline.user.name.toUpperCase() }} )
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </div>
        </div>
      </template>
    </template>
  </section>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useItemStore, useProductionOrderStore } from '../../../stores/store'
export default {
  setup() {
    const editMaker = ref(false)
    const productionOrderStore = useProductionOrderStore()
    const itemStore = useItemStore()

    itemStore.getWarehousesData()

    function printData() {
      productionOrderStore.printData()
    }

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
      editMaker,
      itemStore,
      printData,
      randomBg,
      productionOrderStore,
    }
  },

  computed: {
    doneProduction() {
      if (this.dataOrder.status == 'DONE PRODUCTION') return true
      if (this.dataOrder.status == 'WAREHOUSE') return true
      if (this.dataOrder.status == 'SHIPPING') return true
      if (this.dataOrder.status == 'RETUR') return true
      if (this.dataOrder.status == 'RECEIVE') return true
      return false
    },
    dataOrder() {
      return this.productionOrderStore.currentData
    },
    statusUpdate() {
      if (this.dataOrder.status == 'NEW ORDER')
        return {
          'WORK IN PROGRESS': 'WORK IN PROGRESS',
        }
      if (this.dataOrder.status == 'WORK IN PROGRESS')
        return {
          'NEW ORDER': 'NEW ORDER',
        }
      if (this.dataOrder.status == 'DONE PRODUCTION')
        return {
          DONE: 'DONE PRODUCTION',
        }
    },
    warehouses() {},
  },
  methods: {
    async aw() {
      await this.$print('printArea')
    },
    onEdit() {
      this.$router.push({
        name: 'produksi-order-edit',
        params: { id: this.dataOrder.id },
      })
    },
    onUpdate() {
      this.$router.push({
        name: 'produksi-order-update',
        params: { id: this.dataOrder.id },
      })
    },
    async onUpdateStatus() {
      const { value: status } = await this.$swal.fire({
        title: 'Update status order',
        input: 'select',
        inputOptions: this.statusUpdate,
        inputPlaceholder: 'Pilih status produksi',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== this.productionOrderStore.currentData.status) {
              resolve()
            } else {
              resolve(
                `Status sekarang adalah ${this.productionOrderStore.currentData.status}`
              )
            }
          })
        },
      })

      if (status) {
        await this.productionOrderStore.updateStatus(status)
        this.$swal.fire(`Status diubah menjadi ${status}`)
        this.productionOrderStore.getProductionOrderData()
      }
    },
    async onDelete() {
      await this.$swal
        .fire({
          title: 'Anda yakin?',
          text: 'Data ini akan di hapus!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Hapus!',
          showLoaderOnConfirm: true,
          preConfirm: (value) => {
            return this.productionOrderStore
              .deleteProductionOrderData(this.dataOrder.id)
              .then((resp) => {
                if (resp.status == 200) {
                  return resp
                }
                throw new Error(resp)
              })
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push({
              name: 'produksi-order-list',
            })
          }
        })
    },
    async onWarehouse() {
      await this.$swal
        .fire({
          title: 'Kirim barang ke Gudang?',
          text: 'Sistem akan data memasukan Output Produksi ke Gudang Pabrik',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Kirim!',
          showLoaderOnConfirm: true,
          preConfirm: (value) => {
            return this.productionOrderStore
              .warehouseProductionOrder()
              .then((resp) => {
                if (resp.status == 200) {
                  return resp
                }
              })
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push({
              name: 'produksi-order-list',
            })
          }
        })
    },
    async onShipping() {
      this.$swal
        .fire({
          title: 'Kirim barang ke Pelanggan?',
          text: 'Persediaan di Gudang akan berkurang!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Kirim!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal
              .fire({
                title: 'Cetak Surat Jalan',
                html: `<div class="grid gap-y-2 justify-items-center w-full">
                <input class="input input-bordered w-3/4" id="police_number" placeholder="Nomor Polisi Kendaraan" />
                <input class="input input-bordered w-3/4" id="driver_name" placeholder="Nama Driver" />
                <input class="input input-bordered w-3/4" id="man_power_name" placeholder="Nama Kenek (Jika Ada)" />
                <label>Tanggal Pengiriman </label><input id="date" type="date" placeholder="Tanggal Pengiriman" class="input input-bordered w-auto" />
                </div>`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                backdrop: true,
                allowOutsideClick: () =>
                  this.productionOrderStore.isUpdateLoading,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                  const police_number = this.$swal
                    .getPopup()
                    .querySelector('#police_number').value
                  const driver_name = this.$swal
                    .getPopup()
                    .querySelector('#driver_name').value
                  const man_power_name = this.$swal
                    .getPopup()
                    .querySelector('#man_power_name').value
                  const shipping_date = this.$swal
                    .getPopup()
                    .querySelector('#date').value

                  const value = {
                    police_number: police_number,
                    driver_name: driver_name,
                    man_power_name: man_power_name,
                    shipping_date: shipping_date,
                  }
                  return this.productionOrderStore
                    .shippingProductionOrder(value)
                    .then((resp) => {
                      if (resp.status == 200) {
                        return resp
                      }
                    })
                },
              })
              .then((result) => {
                if (result.isConfirmed) {
                  if (result.value.status == 200) {
                    this.$swal
                      .fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Item produksi dalam proses pengiriman',
                        backdrop: true,
                        allowOutsideClick: () => false,
                      })
                      .then(() => {
                        this.$router.push({
                          name: 'produksi-order-list',
                        })
                      })
                  } else {
                    this.$swal.fire({
                      icon: 'error',
                      title: 'Opss',
                      text: 'Ada permasalahan segera hubungi admin',
                      backdrop: true,
                      allowOutsideClick: () => false,
                    })
                  }
                } else {
                }
              })
          }
        })
    },
    async onRetur() {
      await this.$swal
        .fire({
          title: 'Retur?',
          text: 'Item akan di retur ke Gudang',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Retur!',
          backdrop: true,
          allowOutsideClick: () => this.productionOrderStore.isUpdateLoading,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.productionOrderStore
              .returProductionOrder()
              .then((resp) => {
                return resp
              })
          },
        })
        .then((result) => {
          console.info(result)
          if (result.isConfirmed) {
            if (result.value.status == 200) {
              this.$swal
                .fire({
                  icon: 'success',
                  title: 'Berhasil',
                  backdrop: true,
                  allowOutsideClick: () => false,
                })
                .then(() => {
                  this.$router.push({
                    name: 'produksi-order-list',
                  })
                })
            } else {
              this.$swal.fire({
                icon: 'error',
                title: 'Opss',
                text: 'Ada permasalahan segera hubungi admin',
                backdrop: true,
                allowOutsideClick: () => false,
              })
            }
          }
        })
    },
    async onReceive() {
      await this.$swal
        .fire({
          title: 'Receive?',
          text: 'Item telah diterima pelanggan',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, Selesai!',
          backdrop: true,
          allowOutsideClick: () => this.productionOrderStore.isUpdateLoading,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.productionOrderStore
              .receiveProductionOrder()
              .then((resp) => {
                return resp
              })
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (result.value.status == 200) {
              this.$swal
                .fire({
                  icon: 'success',
                  title: 'Berhasil',
                  backdrop: true,
                  allowOutsideClick: () => false,
                })
                .then(() => {
                  this.$router.push({
                    name: 'produksi-order-list',
                  })
                })
            } else {
              this.$swal.fire({
                icon: 'error',
                title: 'Opss',
                text: 'Ada permasalahan segera hubungi admin',
                backdrop: true,
                allowOutsideClick: () => false,
              })
            }
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
