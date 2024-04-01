import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'

import moment from 'moment'
import { useToast } from 'vue-toastification'

const toast = useToast()

// PRODUCTION ORDER STORE
export const useMutationDetailStore = defineStore('mutationDetailStore', {
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
      return state.responseData.current_page
    },
    lastPage(state) {
      return state.responseData.last_page
    },
    from(state) {
      return state.responseData.from
    },
    to(state) {
      return state.responseData.to
    },
    dataMasterMutation(state) {
      return state.responseData.data
    },

    dataDetailMutation(state) {
      return state.detailMutation
    },
  },
  actions: {
    async getMutationData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/mutations/${this.currentId}?limit=${this.currentLimit}${page}${this.searchQuery}${this.fromToDate}`)
        this.responseData = response.data.data
        return response
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
