import { defineStore } from 'pinia'
import { axiosIns } from '../services/axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

// ITEM STORE
export const useItemStore = defineStore('itemStore', {
  state: () => {
    return {
      responsItems: {},
      itemTypes: [],
      itemUnits: [],
      isLoading: true,
      isDeleteLoading: false,
      modalSubmitLoading: false,
      modalToggle: false,
      currentLimit: 10,
      searchName: '',
    }
  },
  getters: {
    items(state) {
      return state.responsItems.data
    },
    currentPage(state) {
      return state.responsItems.current_page
    },
    lastPage(state) {
      return state.responsItems.last_page
    },
    from(state) {
      return state.responsItems.from
    },
    to(state) {
      return state.responsItems.to
    },
    searchQuery(state) {
      if (state.searchName == '' || null) {
        return ''
      }
      return '&name=' + state.searchName
    },
  },
  actions: {
    async storeItemData(data) {
      this.modalSubmitLoading = true
      try {
        const response = await axiosIns.post(
          `/items`,
          data
          // {
          //   headers: {
          //     Authorization: `${this.token.token_type} ${this.token.access_token}`,
          //   },
          // }
        )
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
        this.responsItems.data.splice(index, 1)
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
          `/items?limit=${this.currentLimit}${this.searchQuery}${page}`
          // {
          //   headers: {
          //     Authorization: `${this.token.token_type} ${this.token.access_token}`,
          //   },
          // }
        )
        this.responsItems = response.data.data
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
  },
})

//WAREHOUSE STORE
export const useWarehouse = defineStore('warehouseStore', {
  state: () => {
    return { listData: [] }
  },
  getters: {},
  actions: {
    async getData() {
      try {
        const response = await axiosIns.get(`/warehouses`)
        this.listData = response.data.data.data
      } catch (error) {
        alert(error)
      }
    },
  },
})
