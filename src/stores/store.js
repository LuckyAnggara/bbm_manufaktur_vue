import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2/dist/sweetalert2'

const toast = useToast()

// AUTH STORE

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      username: null,
      password: null,
      isLoading: false,
    }
  },
  getters: {
    token() {
      return JSON.parse(localStorage.getItem('token'))
    },
    userData() {
      JSON.parse(localStorage.getItem('userData'))
    },
    isLogin() {
      if (JSON.parse(localStorage.getItem('userData'))) return true
      return false
    },
  },
  actions: {
    async login() {
      this.isLoading = true
      try {
        const response = await axiosIns.post(`/login`, {
          username: this.username,
          password: this.password,
        })
        const data = response.data
        if (response.status == 200) {
          toast.success(data.message, {
            timeout: 2000,
          })
          console.info('yes')
          localStorage.setItem('token', JSON.stringify(data.data))
          await this.cekUser(data.data)
          return response
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
      } finally {
        this.isLoading = false
      }
    },
    async cekUser() {
      try {
        const response = await axiosIns.get('/user')
        if (response.status == 200) {
          localStorage.setItem('userData', JSON.stringify(response.data))
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
      }
    },
    async logout() {
      try {
        localStorage.removeItem('userData')
        localStorage.removeItem('token')
      } catch (error) {
        alert(error)
        return false
      } finally {
        return true
      }
    },
  },
})

// ITEM STORE
export const useItemStore = defineStore('itemStore', {
  state: () => {
    return {
      responsItem: {},
      itemTypes: [],
      itemUnits: [],
      warehouses: [],
      currentWarehouse: 0,
      currentType: 0,
      fromDate: '',
      toDate: '',
      isLoading: true,
      isDeleteLoading: false,
      modalSubmitLoading: false,
      modalToggle: false,
      currentLimit: 10,
      searchName: '',
    }
  },
  getters: {
    items: (state) => {
      return state.responsItem.data
    },
    itemByType: (state) => {
      return (typeId) => {
        if (typeId == 0) return state.responsItem.data
        return state.responsItem.data.filter((item) => item.type_id == typeId)
      }
    },
    currentPage(state) {
      return state.responsItem.current_page
    },
    lastPage(state) {
      return state.responsItem.last_page
    },
    from(state) {
      return state.responsItem.from
    },
    to(state) {
      return state.responsItem.to
    },
    searchQuery(state) {
      if (state.searchName == '' || null) {
        return ''
      }
      return '&name=' + state.searchName
    },
    warehousesQuery(state) {
      if (state.currentWarehouse == '' || null || 0) {
        return ''
      }
      return '&warehouse_id=' + state.currentWarehouse
    },
    listWarehouse(state) {
      return [{ id: 0, name: 'semua' }].concat(state.warehouses)
    },
    fromToDate(state) {
      if (state.fromDate == '' && state.toDate == '') {
        return ''
      }
      return '&from_date=' + state.fromDate + '&to_date=' + state.toDate
    },
  },
  actions: {
    async storeItemData(data) {
      this.modalSubmitLoading = true
      try {
        const response = await axiosIns.post(`/items`, data)
        this.modalToggle = false
        this.modalSubmitLoading = false
        toast.success('My toast content', {
          timeout: 2000,
        })
        this.getItemData()
      } catch (error) {}
      this.modalSubmitLoading = false
    },
    async deleteItemData(id, index) {
      this.isDeleteLoading = true
      try {
        await axiosIns.delete(`/items/${id}`)
        this.responsItem.data.splice(index, 1)
        toast.error('Data telah di Delete', {
          timeout: 2000,
        })
        return true
      } catch (error) {}
      this.isDeleteLoading = false
    },
    async getItemData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/items?limit=${this.currentLimit}${this.searchQuery}${page}${this.warehousesQuery}${this.fromToDate}`
        )
        this.responsItem = response.data.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
    async getItemTypeData() {
      try {
        const response = await axiosIns.get(`/item-types`)
        this.itemTypes = response.data.data.data
      } catch (error) {
        alert(error)
      }
    },
    async getItemUnitData() {
      try {
        const response = await axiosIns.get(`/item-units`)
        this.itemUnits = response.data.data.data
      } catch (error) {
        alert(error)
      }
    },
    async getWarehousesData() {
      try {
        const response = await axiosIns.get(`/warehouses`)
        this.warehouses = response.data.data.data
      } catch (error) {
        alert(error)
      }
    },
  },
})

// MUTATION STORE

export const useMutationStore = defineStore('mutationStore', {
  state: () => {
    return {
      storeLoading: false,
      responseData: [],
      fromDate: '',
      toDate: '',
      currentId: '',
      isLoading: false,
      listDebitItem: [],
      listKreditItem: [],
      masuk: {},
      incomingItem: {
        data: {},
        detail: [],
      },
    }
  },
  getters: {
    dataMutation(state) {
      return state.responseData.mutation
    },
    data(state) {
      return state.responseData
    },
    title(state) {
      if (state.fromDate == '' && state.toDate == '') {
        return `Data Persediaan ${state.data.name.toUpperCase()}`
      } else {
        return `Data Persediaan ${state.data.name.toUpperCase()} Dari tanggal ${
          state.fromDate
        } s.d ${state.toDate}`
      }
    },
    fromToDate(state) {
      if (state.fromDate == '' && state.toDate == '') {
        return ''
      }
      return '?from_date=' + state.fromDate + '&to_date=' + state.toDate
    },
  },
  actions: {
    deleteListDebit(index) {
      this.listDebitItem.splice(index, 1)
    },
    async getMutationData() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/mutations/${this.currentId}${this.fromToDate}`
        )
        this.responseData = response.data.data
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
    async storeIncomingItem() {
      this.storeLoading = true
      try {
        const response = await axiosIns.post(
          `mutation-incoming/store`,
          this.incomingItem
        )
        toast.success('Mutasi barang masuk berhasil diproses', {
          timeout: 1000,
        })
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.storeLoading = false
      }
    },
  },
})

// PRODUCTION ORDER STORE
export const useProductionOrderStore = defineStore('productionOrderStore', {
  state: () => {
    return {
      responseListData: {},
      currentId: null,
      currentData: null,
      isLoading: false,
      currentLimit: 10,
      searchName: '',
      fromDate: '',
      toDate: '',
      isDataEmpty: false,
      isDeleteLoading: false,
      isUpdateLoading: false,
      responseSingleData: null,
      storeLoading: false,
      outputDataUpdate: [],
      dataOrder: {
        order_date: null,
        customer_name: null,
        pic_name: null,
        notes: null,
        target_date: null,
        output: [],
        input: [],
      },
      editOrder: {
        output: [],
        input: [],
      },
    }
  },
  getters: {
    listData(state) {
      return state.responseListData.data
    },
    currentPage(state) {
      return state.responseListData.current_page
    },
    lastPage(state) {
      return state.responseListData.last_page
    },
    from(state) {
      return state.responseListData.from
    },
    to(state) {
      return state.responseListData.to
    },
    searchQuery(state) {
      if (state.searchName == '' || null) {
        return ''
      }
      return '&name=' + state.searchName
    },
    fromToDate(state) {
      if (state.fromDate == '' && state.toDate == '') {
        return ''
      }
      return '&from_date=' + state.fromDate + '&to_date=' + state.toDate
    },
    inputData(state) {
      state.dataOrder.input.forEach((x) => {
        x.estimate_quantity = 0
      })
      return state.dataOrder.input
    },
    outputData(state) {
      state.dataOrder.output.forEach((x) => {
        x.target_quantity = 0
      })
      return state.dataOrder.output
    },
    inputDataEdit(state) {
      state.editOrder.input.forEach((x) => {
        if (!x.estimate_quantity) {
          x.estimate_quantity = 0
        }
        if (x.item) {
          x.id = x.item.id
          x.name = x.item.name
          x.unit = x.item.unit
        }
      })
      return state.editOrder.input
    },
    outputDataEdit(state) {
      state.editOrder.output.forEach((x) => {
        if (!x.target_quantity) {
          x.target_quantity = 0
        }
        if (x.item) {
          x.id = x.item.id
          x.name = x.item.name
          x.unit = x.item.unit
        }
      })
      return state.editOrder.output
    },
  },
  actions: {
    deleteInputEditData(index) {
      this.editOrder.input.splice(index, 1)
    },
    deleteOutputEditData(index) {
      this.editOrder.output.splice(index, 1)
    },
    deleteOutputUpdateData(index) {
      this.currentData.output.splice(index, 1)
    },
    deleteInputData(index) {
      this.dataOrder.input.splice(index, 1)
    },
    deleteOutputData(index) {
      this.dataOrder.output.splice(index, 1)
    },
    async updateStatus(status, id = null) {
      this.isLoading = true
      try {
        const response = await axiosIns.post(
          `/production-order/update-status`,
          {
            id: id == null ? this.currentData.id : id,
            status: status,
          }
        )
        // this.storeLoading = false
        toast.success('Status berhasil di update', {
          timeout: 1000,
        })
        this.responseListData = response.data.data
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
    async getAllData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/production-order?limit=${this.currentLimit}${this.searchQuery}${this.fromToDate}`
        )
        this.responseListData = response.data.data
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok',
        })
        this.responseListData = {
          data: [],
        }
      } finally {
        this.isLoading = false
      }
    },
    async getProductionOrderData(edit = false) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/production-order/${this.currentId}`
        )
        if (edit == true) {
          this.editOrder = response.data.data
        }
        this.currentData = response.data.data
      } catch (error) {
        this.isDataEmpty = true
        this.isLoading = false
      } finally {
        this.isLoading = false
      }
    },
    async storeProductionOrder(data) {
      this.storeLoading = true
      try {
        const response = await axiosIns.post(
          `/production-order`,
          this.dataOrder
        )
        this.responseSingleData = response.data.data
        this.currentId = response.data.data.id
        // this.storeLoading = false
        toast.success('Produksi Order berhasil di tambahkan', {
          timeout: 1000,
        })
      } catch (error) {
        alert(error)
      } finally {
        this.storeLoading = false
      }
    },
    async storeUpdateProductionOrder() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.post(`/production-order/update-data`, {
          data_order: this.currentData,
          update_order: this.outputDataUpdate,
        })
        // this.storeLoading = false
        toast.success('Produksi Order berhasil di ubah', {
          timeout: 1000,
        })
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    async updateProductionOrder() {
      this.storeLoading = true
      try {
        const response = await axiosIns.put(
          `/production-order/${this.editOrder.id}`,
          this.editOrder
        )
        // this.storeLoading = false
        toast.success('Produksi Order berhasil di ubah', {
          timeout: 1000,
        })
      } catch (error) {
        alert(error)
      } finally {
        this.storeLoading = false
      }
    },
    async warehouseProductionOrder() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.post(
          `/production-order/update-warehouse`,
          this.currentData
        )
        // this.storeLoading = false
        toast.success('Data Item berhasil di pindahkan ke Gudang', {
          timeout: 2000,
        })
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    async deleteProductionOrderData(id, index) {
      this.isDeleteLoading = true
      try {
        const response = axiosIns.delete(`/production-order/${id}`)
        if (index > 0) {
          this.responseListData.data.splice(index, 1)
        }
        if (index == 0) {
          this.responseListData.data.shift()
        }
        toast.error('Data telah di hapus!', {
          timeout: 2000,
        })
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isDeleteLoading = false
      }
    },
  },
})
