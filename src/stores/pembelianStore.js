import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'

// PRODUCTION ORDER STORE
export const usePembelianStore = defineStore('pembelianStore', {
  state: () => {
    return {
      responses: null,
      singleResponses: null,
      originalSingleResponses: null,
      isUpdateLoading: false,
      isLoading: false,
      isStoreLoading: false,
      isUpdateLoading: false,
      isDestroyLoading: false,
      form: {
        bulan: new Date().getMonth() + 1,
        tahun: new Date().getFullYear(),
        capaian_sasaran_program: 0,
        capaian_output_program: 0,
        efisiensi: 0,
        konsistensi: 0,
        nilai_efisiensi: 0,
        penyerapan: 0,
        rata_nka_satker: 0,
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
          `/pembelian?limit=${this.filter.currentLimit}${this.searchQuery}${this.pageQuery}${this.dateQuery}`
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
        const response = await axiosIns.post(`/pembelian`, this.form)
        if (response.status == 200) {
          toast.success('Data berhasil dibuat', {
            timeout: 3000,
          })
          return true
        } else {
          return false
        }
      } catch (error) {
        console.info(error)
        toast.error(error.response.data.data, {
          timeout: 3000,
        })
      } finally {
        this.isStoreLoading = false
      }
    },
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        await axiosIns.delete(`/pembelian/${id}`)
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
    async update() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.put(
          `/pembelian/${this.singleResponses.id}`,
          this.singleResponses
        )
        if (response.status == 200) {
          toast.success(response.data.message, {
            timeout: 2000,
          })
          this.originalSingleResponses = JSON.parse(
            JSON.stringify(response.data.data)
          )
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
  },
})
