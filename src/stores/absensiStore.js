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
      isLoadingDownload: false,
      singleResponses: null,
      singleAbsensi: [],
      originalSingleResponses: null,
      isUpdateLoading: false,
      isLoading: false,
      isShowLoading: false,
      isStoreLoading: false,
      resultId: null,
      isUpdateLoading: false,
      isDestroyLoading: false,
      absenToDisplay: [],
      filter: {
        date: {
          fromDate: moment().format('yyyy-MM-DD'),
          toDate: moment().format('yyyy-MM-DD'),
        },
        month: moment().month() + 1,
        year: moment().year(),
      },
    }
  },
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    from(state) {
      return state.responses?.from
    },
    to(state) {
      return state.responses?.to
    },
    total(state) {
      return state.responses?.total
    },
    dateQuery(state) {
      if (
        state.filter.date.fromDate == null ||
        state.filter.date.toDate == null
      ) {
        return ''
      }
      return (
        '&start-date=' +
        state.filter.date.fromDate +
        '&end-date=' +
        state.filter.date.toDate
      )
    },
    absensiMonthQuery(state) {
      return '&month=' + state.filter.month
    },
    absensiYearQuery(state) {
      return '&year=' + state.filter.year
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/absensi?${this.dateQuery}${this.dateQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async absenKosong() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/absensi-missing?${this.dateQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async getDataSingle(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/absensi/${id}?${this.absensiMonthQuery}${this.absensiYearQuery}`
        )
        this.singleAbsensi = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async downloadAbsen(id) {
      this.isLoadingDownload = true
      try {
        const response = await axiosIns.get(
          `/report/absensi/${id}?${this.absensiMonthQuery}${this.absensiYearQuery}`
        )
        let responseHtml = response.data
        // console.log(responseHtml, 'Faktur penjualan')
        var myWindow = window.open('response')
        myWindow.document.write(responseHtml)
      } catch (error) {
        console.info(error)
      }
      this.isLoadingDownload = false
    },
  },
})
