import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'

import { useToast } from 'vue-toastification'

const toast = useToast()

// PRODUCTION ORDER STORE
export const usePelangganStore = defineStore('pelangganStore', {
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
      form: {
        name: null,
        jabatan: null,
        gaji: 0,
        uang_makan: 0,
        bonus: 0,
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
        const response = await axiosIns.get(
          `/pelanggan?limit=${this.filter.currentLimit}${this.searchQuery}${this.pageQuery}${this.dateQuery}`
        )
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
        const response = await axiosIns.post(`/pelanggan`, this.form)
        if (response.status == 200) {
          this.resultId = response.data.data.id
          this.getData()
          toast.success('Data berhasil di buat silahkan tutup Modal', {
            timeout: 3000,
          })
          return true
        }
        return false
      } catch (error) {
        console.info(error)
        toast.error(error.message, {
          timeout: 3000,
        })
        return false
      } finally {
        this.isStoreLoading = false
      }
    },
    async showData(id = '') {
      this.isShowLoading = true
      try {
        const response = await axiosIns.get(`/pelanggan/${id}`)
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponses = JSON.parse(
          JSON.stringify(response.data.data)
        )
        return true
      } catch (error) {
        toast.error('Data not found', {
          position: 'bottom-right',
        })
        return false
      }
    },
    async update() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.put(
          `/pelanggan/${this.singleResponses.id}`,
          this.singleResponses
        )
        if (response.status == 200) {
          toast.success(response.data.message, {
            timeout: 2000,
          })
          this.originalSingleResponses = JSON.parse(
            JSON.stringify(response.data.data)
          )
          this.getData()
          return true
        } else {
          return false
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
      } finally {
        this.isUpdateLoading = false
      }
    },
    async destroy(id) {
      this.isDestroyLoading = true
      try {
        const resp = await axiosIns.delete(`/pelanggan/${id}`)
        toast.success('Data berhasil di hapus', {
          timeout: 2000,
        })
        const index = this.items.findIndex((item) => item.id === id)
        this.responses.data.splice(index, 1)
        return resp
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
      } finally {
        this.isDestroyLoading = false
      }
    },
    clearForm() {
      this.form = {
        name: null,
        jabatan: null,
        gaji: 0,
        uang_makan: 0,
        bonus: 0,
      }
    },
  },
})
