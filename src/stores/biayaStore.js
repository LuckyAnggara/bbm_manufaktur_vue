import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'

import moment from 'moment'
import { useToast } from 'vue-toastification'

const toast = useToast()

// PRODUCTION ORDER STORE
export const useBiayaStore = defineStore('biayaStore', {
  state: () => {
    return {
      modalToggle: false,
      responses: null,
      singleResponses: null,
      isLoading: false,
      isStoreLoading: false,
      isDestroyLoading: false,
      form: {
        tanggal_transaksi: new Date(),
        nama: null,
        kategori: null,
        jumlah: 0,
      },
      filter: {
        page: 1,
        currentLimit: 10,
        searchQuery: '',
        date: {
          fromDate: null,
          toDate: null,
        },
        currentMonth: new Date().getMonth() + 1,
        currentYear: new Date().getFullYear(),
      },
    }
  },
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    biayaTotal(state) {
      let sum = state.items.reduce((accumulator, item) => {
        return accumulator + item.jumlah
      }, 0)
      return sum
    },
    currentPage(state) {
      return state.responses?.current_page
    },
    pageLength(state) {
      return Math.round(state.responses?.total / state.responses?.per_page)
    },
    lastPage(state) {
      return state.responses?.last_page
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
    pageQuery(state) {
      if (state.filter.page == 1) {
        return ''
      }
      return '&page=' + state.filter.page
    },
    dateQuery(state) {
      if (state.filter.date.fromDate == null || state.filter.date.toDate == null) {
        return ''
      }
      return '&start-date=' + state.filter.date.fromDate + '&end-date=' + state.filter.date.toDate
    },
    searchQuery(state) {
      if (state.filter.searchQuery == '' || state.filter.searchQuery == null) {
        return ''
      }
      return '&query=' + state.filter.searchQuery
    },
  },
  actions: {
    async getData() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/biaya?limit=${this.filter.currentLimit}${this.searchQuery}${this.pageQuery}${this.dateQuery}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/biaya`, this.form)
        if (response.status == 200) {
          this.reset()
          return true
        }
        return false
      } catch (error) {
        toast.error(error.response.data.data, {
          timeout: 3000,
        })
        return false
      } finally {
        this.isStoreLoading = false
      }
    },
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        await axiosIns.delete(`/biaya/${id}`)
        toast.success('Data berhasil di hapus', {
          timeout: 2000,
        })
        const index = this.items.findIndex((item) => item.id === id)
        this.responses.data.splice(index, 1)
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
      } finally {
        this.isDestroyLoading = false
      }
    },
    reset() {
      this.form.tanggal_transaksi = null
      this.form.nama = null
      this.form.kategori = null
      this.form.jumlah = null
    },
  },
})
