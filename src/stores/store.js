import { defineStore } from 'pinia'
import axiosIns from '../services/axios'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2/dist/sweetalert2'
import moment from 'moment'

const toast = useToast()

// DASHBOARD STORE
export const useDashboardStore = defineStore('dashboardStore', {
  state: () => {
    return {
      isLoadingGetItemCount: false,
      isLoadingGetProductionCount: false,
      isLoadingGetShippingCount: false,
      dataItem: {
        bahan_baku: 0,
        barang_jadi: 0,
        barang_lainnya: 0,
      },
      dataProduction: {
        on_progress: 0,
        done: 0,
      },
      dataShipping: {
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
    async getShippingCount() {
      this.isLoadingGetShippingCount = true
      try {
        const response = await axiosIns.get(`/dashboard/shipping`)
        this.isLoadingGetShippingCount = false
        this.dataShipping = response.data.data
      } catch (error) {}
      this.isLoadingGetShippingCount = false
    },
  },
})

// ITEM STORE
export const useItemStore = defineStore('itemStore', {
  state: () => {
    return {
      responsItem: {},
      detailItem: {},
      itemTypes: [],
      itemUnits: [],
      itemMachines: [],
      itemOverheads: [],
      warehouses: [],
      currentWarehouse: 1,
      currentType: 0,
      fromDate: '',
      toDate: '',
      isLoading: true,
      isLoading2: true,
      isUpdateLoading: false,
      isLoadingDownload: false,
      isDeleteLoading: false,
      modalSubmitLoading: false,
      modalToggle: false,
      currentLimit: 10,
      searchName: '',
      itemDetailData: {
        name: null,
      },
      filter: {
        type: 0,
        dataNol: true,
      },
    }
  },
  getters: {
    items: (state) => {
      return state.responsItem.data ?? []
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
    typeQuery(state) {
      if (state.filter.type == '' && state.filter.type == 0) {
        return ''
      }
      return '&type=' + state.filter.type
    },
    balanceQuery(state) {
      if (state.filter.dataNol == true) {
        return ''
      }
      return '&balance_nol=no'
    },
  },
  actions: {
    async itemUpdate() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.put(
          `/items/${this.detailItem.id}`,
          this.detailItem
        )
        this.isUpdateLoading = false
        toast.success('Update sukses', {
          timeout: 2000,
        })
        this.getItemData()
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
      } finally {
        this.isUpdateLoading = false
      }
    },
    async storeItemData(data) {
      this.modalSubmitLoading = true
      try {
        const response = await axiosIns.post(`/items`, data)
        this.modalToggle = false
        this.modalSubmitLoading = false
        toast.success('Item baru selesai di buat', {
          timeout: 2000,
        })
        this.getItemData()
      } catch (error) {}
      this.modalSubmitLoading = false
    },
    async storeTypeData(data) {
      this.modalSubmitLoading = true
      try {
        const response = await axiosIns.post(`/item-types`, {
          name: data,
        })
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.modalSubmitLoading = false
      }
    },
    async storeUnitData(data) {
      this.modalSubmitLoading = true
      try {
        const response = await axiosIns.post(`/item-units`, {
          name: data,
        })
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.modalSubmitLoading = false
      }
    },
    async storeMachineData(data) {
      this.modalSubmitLoading = true
      try {
        const response = await axiosIns.post(`/machines`, data)
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.modalSubmitLoading = false
      }
    },
    async storeOverheadData(data) {
      this.modalSubmitLoading = true
      try {
        const response = await axiosIns.post(`/overheads`, data)
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.modalSubmitLoading = false
      }
    },
    async storeOverheadData(data) {
      this.modalSubmitLoading = true
      try {
        const response = await axiosIns.post(`/overheads`, data)
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.modalSubmitLoading = false
      }
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
    async deleteTypeData(id, index) {
      this.isDeleteLoading = true
      try {
        const response = await axiosIns.delete(`/item-types/${id}`)
        this.itemTypes.splice(index, 1)
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isDeleteLoading = false
      }
    },
    async deleteUnitData(id, index) {
      this.isDeleteLoading = true
      try {
        const response = await axiosIns.delete(`/item-units/${id}`)
        this.itemUnits.splice(index, 1)
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isDeleteLoading = false
      }
    },
    async deleteMachineData(id, index) {
      this.isDeleteLoading = true
      try {
        const response = await axiosIns.delete(`/machines/${id}`)
        this.itemMachines.splice(index, 1)
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isDeleteLoading = false
      }
    },
    async deleteOverheadData(id, index) {
      this.isDeleteLoading = true
      try {
        const response = await axiosIns.delete(`/overheads/${id}`)
        this.itemOverheads.splice(index, 1)
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isDeleteLoading = false
      }
    },
    async getItemData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/items?limit=${this.currentLimit}${this.searchQuery}${page}${this.warehousesQuery}${this.fromToDate}${this.typeQuery}${this.balanceQuery}`
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
        this.isLoading2 = true
        const response = await axiosIns.get(`/item-types`)
        this.itemTypes = response.data.data.data
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading2 = false
      }
    },
    async getItemUnitData() {
      try {
        this.isLoading2 = true
        const response = await axiosIns.get(`/item-units`)
        this.itemUnits = response.data.data.data
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading2 = false
      }
    },
    async getMachineData() {
      try {
        this.isLoading2 = true
        const response = await axiosIns.get(`/machines`)
        this.itemMachines = response.data.data.data
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading2 = false
      }
    },
    async getOverheadData() {
      try {
        this.isLoading2 = true
        const response = await axiosIns.get(`/overheads`)
        this.itemOverheads = response.data.data.data
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading2 = false
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
        let responseHtml = response.data
        var myWindow = window.open('response')
        myWindow.document.write(responseHtml)
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
      currentTab: 0,
      isLoadingDownload: false,
      currentLimit: 10,
      searchName: '',
      typeData: 'debit',
      storeLoading: false,
      dataItem: null,
      responseData: [],
      responseMasterData: [],
      responseDetailData: null,
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
      return '&from_date=' + state.fromDate + '&to_date=' + state.toDate
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
    dataDetailMasterMutation(state) {
      return state.responseDetailData?.data
    },
    dataDetailMutation(state) {
      return state.detailMutation
    },
  },
  actions: {
    deleteListDebit(index) {
      this.incomingItem.detail.splice(index, 1)
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
    async getDetailMasterMutation(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/mutations/master/${id}?type-data=${this.typeData}`
        )
        this.responseDetailData = response.data
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
          `/mutations/${this.currentId}?limit=${this.currentLimit}${this.searchQuery}${this.fromToDate}`
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
          `mutation-incoming`,
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
          `/report/mutation?limit=${this.currentLimit}&id=${id}${this.searchQuery}${this.fromToDate}`
        )
        let responseHtml = response.data
        var myWindow = window.open('response')
        myWindow.document.write(responseHtml)
      } catch (error) {
        console.info(error)
      }
      this.isLoadingDownload = false
    },
    async deleteMasterMutation(id, index) {
      this.isDeleteLoading = true
      if (this.typeData == 'debit') {
        try {
          await axiosIns.delete(`/mutation-incoming/${id}`)
          this.responseMasterData.data.splice(index, 1)
          toast.error('Data telah di Delete', {
            timeout: 2000,
          })
          return true
        } catch (error) {
        } finally {
          this.isDeleteLoading = false
        }
      } else {
        try {
          await axiosIns.delete(`/mutation-exit/${id}`)
          this.responseMasterData.data.splice(index, 1)
          toast.error('Data telah di Delete', {
            timeout: 2000,
          })
          return true
        } catch (error) {
        } finally {
          this.isDeleteLoading = false
        }
      }
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
        order_date: moment().format('yyyy-MM-DD'),
        customer_name: 'dummy',
        pic_name: null,
        shift: 1,
        notes: null,
        target_date: moment().format('yyyy-MM-DD'),
        output: [],
        input: [],
        machine: [],
        pegawai: [],
        overhead: [],
      },
      editOrder: {
        output: [],
        input: [],
        machine: [],
        overhead: [],
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
    machineData(state) {
      state.dataOrder.machine.forEach((x) => {
        x.usage_meter = 0
      })
      return state.dataOrder.machine
    },
    overheadData(state) {
      state.dataOrder.overhead.forEach((x) => {
        x.usage_meter = 0
      })
      return state.dataOrder.overhead
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
    machineDataEdit(state) {
      state.editOrder.machine.forEach((x) => {
        if (!x.usage_meter) {
          x.usage_meter = 0
        }
        if (x.machine) {
          x.id = x.machine.id
          x.name = x.machine.name
          x.unit = x.machine.unit
        }
      })
      return state.editOrder.machine
    },
    overheadDataEdit(state) {
      state.editOrder.overhead.forEach((x) => {
        if (!x.usage_meter) {
          x.usage_meter = 0
        }
        if (x.overhead) {
          x.id = x.overhead.id
          x.name = x.overhead.name
          x.unit = x.overhead.unit
        }
      })
      return state.editOrder.overhead
    },
    pegawaiDataEdit(state) {
      state.editOrder.pegawai.forEach((x) => {
        if (x.overhead) {
          x.id = x.pegawai.id
          x.name = x.pegawai.name
        }
      })
      return state.editOrder.pegawai
    },
  },
  actions: {
    deleteInputEditData(index) {
      this.editOrder.input.splice(index, 1)
    },
    deleteOutputEditData(index) {
      this.editOrder.output.splice(index, 1)
    },
    deleteMachineEditData(index) {
      this.editOrder.machine.splice(index, 1)
    },
    deleteOverheadEditData(index) {
      this.editOrder.overhead.splice(index, 1)
    },
    deletePegawaiEditData(index) {
      this.editOrder.pegawai.splice(index, 1)
    },
    deleteOutputUpdateData(index) {
      this.outputDataUpdate.splice(index, 1)
    },
    deleteInputData(index) {
      this.dataOrder.input.splice(index, 1)
    },
    deleteOutputData(index) {
      this.dataOrder.output.splice(index, 1)
    },
    deleteMachineData(index) {
      this.dataOrder.machine.splice(index, 1)
    },
    deleteOverheadData(index) {
      this.dataOrder.overhead.splice(index, 1)
    },
    deletePegawaiData(index) {
      this.dataOrder.pegawai.splice(index, 1)
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
        return response
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
          update_input: this.currentData.input,
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
        return response
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
    async shippingProductionOrder(data) {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.post(
          `/production-order/update-shipping`,
          {
            id: this.currentData.id,
            data: data,
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
        const response = await axiosIns.get(
          `/report/production?id=${this.currentData.id}&pic_production=${this.currentData.pic_production}`
        )
        let responseHtml = response.data
        var myWindow = window.open('response')
        myWindow.document.write(responseHtml)
      } catch (error) {
        console.info(error)
      }
      this.isLoadingPrint = false
    },
  },
})

// ETC STORE
export const useEtcStore = defineStore('etcStore', {
  state: () => {
    return {
      modalMachineOn: false,
      responseMachine: null,
      responseOverhead: null,
      response: null,
      fromDate: '',
      toDate: '',
      isLoading: true,
      currentLimit: 10,
      searchName: '',
    }
  },
  getters: {
    data(state) {
      if (state.response != null) {
        return state.response.data
      }
    },
    machine(state) {
      if (state.responseMachine != null) {
        return state.responseMachine.data
      }
    },
    overhead(state) {
      if (state.responseOverhead != null) {
        return state.responseOverhead.data
      }
    },
    currentPage(state) {
      return state.response.current_page
    },
    lastPage(state) {
      return state.response.last_page
    },
    from(state) {
      return state.response.from
    },
    to(state) {
      return state.response.to
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
  },
  actions: {
    async getMachineData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/machines?limit=${this.currentLimit}${this.searchQuery}${page}${this.fromToDate}`
        )
        this.response = response.data.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
    async getOverheadData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/overheads?limit=${this.currentLimit}${this.searchQuery}${page}${this.fromToDate}`
        )
        this.response = response.data.data
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
  },
})
