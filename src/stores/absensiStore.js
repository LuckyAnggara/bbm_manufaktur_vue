import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'
import moment from 'moment'

import { useToast } from 'vue-toastification'

const toast = useToast()

// PRODUCTION ORDER STORE
export const useAbsensiStore = defineStore('absensiStore', {
  state: () => {
    return {
      responses: null,
      singleResponses: null,
      originalSingleResponses: null,
      isUpdateLoading: false,
      isLoading: false,
      isShowLoading: false,
      isStoreLoading: false,
      resultId: null,
      isUpdateLoading: false,
      isDestroyLoading: false,
      filter: {
        date: {
          fromDate: moment().format('yyyy-MM-DD'),
          toDate: moment().format('yyyy-MM-DD'),
        },
      },
    }
  },
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    dateQuery(state) {
      if (state.filter.date.fromDate == null || state.filter.date.toDate == null) {
        return ''
      }
      return '&start-date=' + state.filter.date.fromDate + '&end-date=' + state.filter.date.toDate
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/absensi/get-absen?${this.dateQuery}`)
        this.responses = response.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
  },
})
