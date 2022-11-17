<template>
  <div class="card flex bg-neutral flex-col lg:w-min w-full">
    <div class="card-body shadow-xl rounded-xl">
      <h2 class="card-title mb-2 text-2xl">Data Machine Item</h2>
      <div class="md:flex py-2">
        <div class="w-1/5">
          <button
            class="btn w-32 btn-secondary modal-button shadow-md"
            @click="newMachine()"
          >
            New Item
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
              <th>Unit</th>
              <th>Capacity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="itemStore.isLoading2">
              <td colspan="5" class="text-center">
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
              <tr v-if="itemStore.itemMachines.length == 0">
                <td colspan="5" class="text-center">Tidak ada data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in itemStore.itemMachines"
                :key="item.id"
              >
                <td class="text-center">{{ from + index }}</td>
                <td>
                  {{ item.name.toUpperCase() }}
                </td>
                <td>
                  {{ item.unit == null ? '-' : item.unit.toUpperCase() }}
                </td>
                <td>
                  {{ numeralFormat(item.usage_capacity) }}
                </td>

                <td>
                  <button
                    class="btn btn-sm btn-square btn-ghost hover:scale-110"
                    @click="onDelete(item.id, index)"
                  >
                    <svg
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
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useItemStore } from '../../../stores/store'

export default {
  setup() {
    const itemStore = useItemStore()
    const from = 1

    function getData() {
      itemStore.getMachineData()
    }

    // expose to template and other options API hooks
    return {
      from,
      getData,
      itemStore,
    }
  },

  computed: {},
  methods: {
    newMachine() {
      this.$swal
        .fire({
          title: 'Input data Mesin',
          html: `<div class="grid gap-y-2 justify-items-center w-full">
                <input class="input input-bordered w-3/4" id="name" placeholder="Nama Mesin" />
                <input class="input input-bordered w-3/4" id="unit" placeholder="Satuan" />
                <input class="input input-bordered w-3/4" id="usage_capacity" type="number" placeholder="Kapasitas Mesin" />
                </div>`,
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          backdrop: true,
          preConfirm: () => {
            const name = this.$swal.getPopup().querySelector('#name').value
            const unit = this.$swal.getPopup().querySelector('#unit').value
            const usage_capacity = this.$swal
              .getPopup()
              .querySelector('#usage_capacity').value

            const value = {
              name: name,
              unit: unit,
              usage_capacity: usage_capacity,
            }
            return this.itemStore.storeMachineData(value).then((resp) => {
              if (resp.status == 200) {
                return resp
              }
            })
          },
          allowOutsideClick: () => this.itemStore.modalSubmitLoading,
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (result.value.status == 200) {
              this.$swal
                .fire({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Machine item baru berhasil di tambahkan',
                  backdrop: true,
                  allowOutsideClick: () => false,
                })
                .then(() => {
                  this.getData()
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
    onDelete(id, index) {
      this.$swal
        .fire({
          title: 'Anda yakin?',
          text: 'Data ini akan di hapus!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete!',
          showLoaderOnConfirm: true,
          backdrop: true,
          preConfirm: (value) => {
            return this.itemStore.deleteMachineData(id, index).then((resp) => {
              if (resp.status == 200) {
                return resp
              }
            })
          },
          allowOutsideClick: () => this.itemStore.isDeleteLoading,
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (result.value.status == 200) {
              this.$swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'Data berhasil di hapus',
                backdrop: true,
                allowOutsideClick: () => false,
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
    this.getData()
  },
}
</script>
