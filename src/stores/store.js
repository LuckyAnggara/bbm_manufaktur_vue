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
      return JSON.parse(localStorage.getItem('userData'))
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
          localStorage.setItem('token', JSON.stringify(data.data.token))
          localStorage.setItem('userData', JSON.stringify(data.data.user))
          toast.success(data.message, {
            timeout: 2000,
          })
          return true
        }
        if (response.status == 202) {
          console.info(data)
          toast.warning(data.message, {
            timeout: 2000,
          })
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
        this.isLoading = false
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/logout`)
        if (response.status == 200) {
          localStorage.removeItem('userData')
          localStorage.removeItem('token')
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
        this.isLoading = false
        return false
      } finally {
        this.isLoading = false
      }
    },
  },
})

// DASHBOARD STORE
export const useDashboardStore = defineStore('dashboardStore', {
  state: () => {
    return {
      isLoadingGetItemCount: false,
      isLoadingGetProductionCount: false,
      dataItem: {
        bahan_baku: 0,
        barang_jadi: 0,
        barang_lainnya: 0,
      },
      dataProduction: {
        on_progress: 0,
        done: 0,
      },
    }
  },
  actions: {
    async getItemCount() {
      this.isLoadingGetItemCount = true
      try {
        const response = await axiosIns.get(`/dashboard/items`)
        this.isLoadingGetItemCount = false
        this.dataItem = response.data.data
      } catch (error) {}
      this.isLoadingGetItemCount = false
    },
    async getProductionCount() {
      this.isLoadingGetProductionCount = true
      try {
        const response = await axiosIns.get(`/dashboard/productions`)
        this.isLoadingGetProductionCount = false
        this.dataProduction = response.data.data
      } catch (error) {}
      this.isLoadingGetProductionCount = false
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
      isLoadingDownload: false,
      isDeleteLoading: false,
      modalSubmitLoading: false,
      modalToggle: false,
      currentLimit: 10,
      searchName: '',
      itemDetailData: {
        name: null,
      },
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
    async getItemDetailData(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/items/${id}`)
        this.itemDetailData = response.data.data
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
    async getDownloadData() {
      this.isLoadingDownload = true
      try {
        const response = await axiosIns.get(
          `/report/item?${this.warehousesQuery}${this.fromToDate}`
        )
      } catch (error) {
        console.info(error)
      }
      this.isLoadingDownload = false
    },
  },
})

// MUTATION STORE

export const useMutationStore = defineStore('mutationStore', {
  state: () => {
    return {
      isLoadingDownload: false,
      currentLimit: 10,
      searchName: '',
      typeData: 'debit',
      storeLoading: false,
      dataItem: null,
      responseData: [],
      responseMasterData: [],
      fromDate: '',
      toDate: '',
      currentId: '',
      isLoading: false,
      listDebitItem: [],
      listKreditItem: [],
      masuk: {},
      currentLimit: 10,
      incomingItem: {
        data: {},
        detail: [],
      },
      exitItem: {
        data: {},
        detail: [],
      },
      detailMutation: {
        type: 'KELUAR',
      },
    }
  },
  getters: {
    searchQuery(state) {
      if (state.searchName == '' || null) {
        return ''
      }
      return '&name=' + state.searchName
    },
    typeQuery(state) {
      if (state.typeData == 'debit' || null) {
        return ''
      }
      return '&type-data=' + state.typeData
    },
    dataMutation(state) {
      return state.responseData.data
    },
    fromToDate(state) {
      if (state.fromDate == '' && state.toDate == '') {
        return ''
      }
      return '?from_date=' + state.fromDate + '&to_date=' + state.toDate
    },
    currentPage(state) {
      return state.responseMasterData.current_page
    },
    lastPage(state) {
      return state.responseMasterData.last_page
    },
    from(state) {
      return state.responseMasterData.from
    },
    to(state) {
      return state.responseMasterData.to
    },
    dataMasterMutation(state) {
      return state.responseMasterData.data
    },
    dataDetailMutation(state) {
      return state.detailMutation
    },
  },
  actions: {
    deleteListDebit(index) {
      this.listDebitItem.splice(index, 1)
    },
    deleteListKredit(index) {
      this.listKreditItem.splice(index, 1)
    },
    async getMasterMutationData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/mutations/master?limit=${this.currentLimit}${this.searchQuery}${page}${this.typeQuery}`
        )
        this.responseMasterData = response.data.data
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
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
        if (response.status == 200) {
          return response
        }
      } catch (error) {
        return 404
      } finally {
        this.storeLoading = false
      }
    },
    async storeExitItem() {
      this.storeLoading = true
      try {
        const response = await axiosIns.post(
          `mutation-exit/store`,
          this.exitItem
        )
        toast.success('Mutasi barang keluar berhasil diproses', {
          timeout: 1000,
        })
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.storeLoading = false
      }
    },
    getDetailMutation(id) {
      this.isLoading = true
      try {
        const response = this.responseMasterData.data[id]
        this.detailMutation = response
        console.info(this.detailMutation)
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
    async getDownloadDetailMutation(id) {
      this.isLoadingDownload = true
      try {
        const response = await axiosIns.get(
          `/report/mutation?${this.fromToDate}&id=${this.data.id}`
        )
      } catch (error) {
        console.info(error)
      }
      this.isLoadingDownload = false
    },
  },
})

// PRODUCTION ORDER STORE
export const useProductionOrderStore = defineStore('productionOrderStore', {
  state: () => {
    return {
      isLoadingPrint: false,
      responseListData: {},
      currentId: null,
      currentData: {
        pic_production: '',
      },
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
        this.currentData.pic_production = ''
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
    async shippingProductionOrder(nopol) {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.post(
          `/production-order/update-shipping`,
          {
            id: this.currentData.id,
            nopol: nopol,
          }
        )
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    async returProductionOrder() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.post(
          `/production-order/retur-shipping`,
          {
            id: this.currentData.id,
          }
        )
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    async receiveProductionOrder() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.post(
          `/production-order/receive-shipping`,
          {
            id: this.currentData.id,
          }
        )
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
    async printData() {
      this.isLoadingPrint = true
      try {
        const response = await axiosIns.post(
          `/report/production2`,
          this.currentData
        )
      } catch (error) {
        console.info(error)
      }
      this.isLoadingPrint = false
    },
  },
})
