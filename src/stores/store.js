import { defineStore } from 'pinia'

import { axiosIns } from '../services/axios'

export const useItemStore = defineStore('itemStore', {
  state: () => {
    return { responsItems: {}, itemTypes: [], itemUnits: [], isLoading: true }
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
  },
  actions: {
    async getItemData(currentLimit, searchName, page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/items?limit=${currentLimit}${searchName}${page}`
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
