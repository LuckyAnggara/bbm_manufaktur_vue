import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'

import moment from 'moment'
import { useToast } from 'vue-toastification'
import { usePegawaiStore } from './pegawaiStore'

const toast = useToast()

// PRODUCTION ORDER STORE
export const useGajiStore = defineStore('gajiStore', {
  state: () => {
    return {
      isLoadingDownload: false,
      modalToggle: false,
      responses: null,
      singleResponses: null,
      isLoading: false,
      isStoreLoading: false,
      isDestroyLoading: false,
      pegawai: [],
      form: {
        created_at: moment().format('yyyy-MM-DD'),
        detail: [],
      },
      filter: {
        page: 1,
        currentLimit: 10,
        searchQuery: '',
        date: {
          fromDate: moment().format('yyyy-MM-DD'),
          toDate: moment().format('yyyy-MM-DD'),
        },
        currentMonth: new Date().getMonth() + 1,
        currentYear: new Date().getFullYear(),
      },
    }
  },
  getters: {
    pegawaiList(state) {
      state.pegawai.forEach((x) => {
        x.bayarkan = true
      })
      return state.pegawai
    },
    items(state) {
      return state.responses?.data ?? []
    },
    gajiTotal(state) {
      let sum = state.pegawai.reduce((accumulator, item) => {
        if (item.bayarkan === true) {
          return (
            accumulator +
            parseFloat(item.gaji) +
            parseFloat(item.uang_makan) +
            parseFloat(item.bonus)
          )
        } else {
          return accumulator
        }
      }, 0)
      return sum
    },
    totalBayar(state) {
      let sum = state.items.reduce((accumulator, item) => {
        return (
          accumulator +
          parseFloat(item.total_gaji) +
          parseFloat(item.total_uang_makan) +
          parseFloat(item.total_bonus)
        )
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
          `/gaji?limit=${this.filter.currentLimit}${this.searchQuery}${this.pageQuery}${this.dateQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async getPegawai() {
      this.isLoading = true
      const pegawaiStore = usePegawaiStore()
      await pegawaiStore.getData()
      this.pegawai = pegawaiStore.items
      this.isLoading = false
    },
    async store() {
      this.isStoreLoading = true
      try {
        this.form.detail = this.pegawai
        const response = await axiosIns.post(`/gaji`, this.form)
        if (response.status == 200) {
          this.reset()
          toast.success('Penggajian berhasil', {
            timeout: 3000,
          })
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
    async showGaji(created_at) {
      this.isLoadingDownload = true
      try {
        const response = await axiosIns.get(
          `/report/gaji/${moment(created_at).format('yyyy-MM-DD')}`
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
    async destroy(created_at, index) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        const resp = await axiosIns.delete(`/gaji/${created_at}`)
        toast.success('Data berhasil di hapus', {
          timeout: 2000,
        })
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
    reset() {
      this.form.created_at = moment().format('yyyy-MM-DD')
      this.form.detail = []
      this.form.pegawai = []
    },
  },
})
