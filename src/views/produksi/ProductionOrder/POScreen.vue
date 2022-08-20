<template>
  <div class="mx-auto justify-center w-full md:w-1/2">
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
        <form @submit.prevent="nextTab">
          <div class="grid gap-y-5">
            <div class="form-control">
              <label class="input-group">
                <span class="w-1/4">Tanggal Order</span>
                <input
                  id="date"
                  type="date"
                  placeholder="Type here"
                  class="input input-bordered w-3/4"
                  required
                />
              </label>
            </div>
            <div class="form-control">
              <label class="input-group">
                <span class="w-1/4">Nama Pelanggan</span>
                <input
                  type="text"
                  class="input input-bordered w-3/4"
                  required
                />
              </label>
            </div>
            <div class="form-control">
              <label class="input-group">
                <span class="w-1/4">Penanggung Jawab</span>
                <input
                  type="text"
                  required
                  class="input input-bordered w-3/4"
                />
              </label>
            </div>
            <div class="form-control">
              <label class="input-group">
                <span class="w-1/4">Catatan</span>
                <textarea
                  class="textarea textarea-bordered w-3/4"
                  placeholder="Bio"
                ></textarea>
              </label>
            </div>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Next</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div
      class="bg-neutral text-neutral-content rounded-b-lg"
      :class="{ hidden: tabIndex != 1 }"
    >
      <div class="card-body">
        <h2 class="card-title">Detail Bahan Mentah</h2>
        <p>Isi dengan Bahan Mentah yang di gunakan</p>

        <div class="form-control">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <p class="p-4">Countries</p>
            <div class="border-b-2 m-0"></div>
            <p class="p-4">Select Country:</p>
            <div class="mr-8 ml-4">
              <div class="relative">
                <button
                  class="bg-teal p-3 rounded text-white shadow-inner w-full"
                >
                  <span class="float-left">Show options</span>

                  <svg
                    class="h-4 float-right fill-current text-white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 129 129"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    enable-background="new 0 0 129 129"
                  >
                    <g>
                      <path
                        d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                      />
                    </g>
                  </svg>
                </button>
                <div class="rounded shadow-md my-2 relative pin-t pin-l">
                  <ul class="list-reset">
                    <li class="p-2">
                      <input class="border-2 rounded h-8 w-full" /><br />
                    </li>
                    <li>
                      <p
                        class="p-2 block text-black hover:bg-grey-light cursor-pointer"
                      >
                        USA
                        <svg
                          class="float-right"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                        >
                          <path
                            d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z"
                          />
                        </svg>
                      </p>
                    </li>
                    <li>
                      <p
                        class="p-2 block text-black hover:bg-grey-light cursor-pointer"
                      >
                        Montenegro
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex mt-2 md:overflow-visible overflow-y-auto mb-5">
          <table class="table table-compact w-full">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody></tbody>
          </table>
        </div>

        <div class="card-actions justify-between">
          <button type="button" class="btn btn-primary" @click="tabIndex--">
            Back
          </button>
          <button type="button" class="btn btn-primary" @click="tabIndex++">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useItemStore } from '../../../stores/store'

export default {
  setup() {
    const searchActive = ref(false)
    const itemStore = useItemStore()

    const tabIndex = ref(0)
    const tabList = [
      { index: 0, name: 'Data Order' },
      { index: 1, name: 'Input' },
      { index: 2, name: 'Output' },
    ]

    itemStore.getItemData()

    function nextTab() {
      this.tabIndex++
    }
    return {
      searchActive,
      itemStore,
      nextTab,
      tabIndex,
      tabList,
    }
  },
}
</script>
