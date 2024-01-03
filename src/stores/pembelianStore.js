import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'
import { useArrayFindIndex } from '@vueuse/core'

import moment from 'moment'
import { useToast } from 'vue-toastification'

const toast = useToast()

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
      resultId: null,
      isUpdateLoading: false,
      isDestroyLoading: false,
      form: {
        nomor_faktur: null,
        nama_supplier: null,
        tanggal_transaksi: moment().format('YYYY-MM-DD'),
        cart: [],
        total: 0,
        pajak: 0,
        diskon: 0,
        ongkir: 0,
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
    cartTotal(state) {
      let sum = state.form.cart.reduce((accumulator, item) => {
        return accumulator + item.harga * item.jumlah
      }, 0)
      return sum
    },
    cartDiskon(state) {
      let sum = state.form.cart.reduce((accumulator, item) => {
        return accumulator + item.discount * item.jumlah
      }, 0)
      return sum
    },
    grandTotal(state) {
      return parseFloat(this.cartTotal) + parseFloat(state.form.ongkir) + parseFloat(state.form.pajak)
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
        const response = await axiosIns.get(`/pembelian?limit=${this.filter.currentLimit}${this.searchQuery}${this.pageQuery}${this.dateQuery}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async getFakturNumber() {
      const response = await axiosIns.get(`/pembelian/faktur`)
      this.form.nomor_faktur = response.data
    },
    async store() {
      this.isStoreLoading = true
      this.form.total = this.cartTotal
      this.form.diskon = this.cartDiskon
      try {
        const response = await axiosIns.post(`/pembelian`, this.form)
        if (response.status == 200) {
          this.resultId = response.data.data.id
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
    async showData(id = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/pembelian/${id}`)
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponses = JSON.parse(JSON.stringify(response.data.data))
      } catch (error) {
        toast.error('Data not found', {
          position: 'bottom-right',
        })
      }
      this.isLoading = false
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
    async showFaktur(id) {
      this.isLoadingDownload = true
      try {
        const response = await axiosIns.get(`/faktur/pembelian/${id}`)
        let responseHtml = response.data
        console.log(responseHtml, 'Faktur Pembelian')
        var myWindow = window.open('response')
        myWindow.document.write(responseHtml)
      } catch (error) {
        console.info(error)
      }
      this.isLoadingDownload = false
    },

    // async update() {
    //   this.isUpdateLoading = true
    //   try {
    //     const response = await axiosIns.put(
    //       `/pembelian/${this.singleResponses.id}`,
    //       this.singleResponses
    //     )
    //     if (response.status == 200) {
    //       toast.success(response.data.message, {
    //         timeout: 2000,
    //       })
    //       this.originalSingleResponses = JSON.parse(
    //         JSON.stringify(response.data.data)
    //       )
    //       return true
    //     } else {
    //       return false
    //     }
    //   } catch (error) {
    //     toast.error(error.message, {
    //       timeout: 2000,
    //     })
    //   } finally {
    //     this.isUpdateLoading = false
    //   }
    // },
    addCart(item) {
      if (!this.checkItem(item.id)) {
        const newItem = {
          id: item.id,
          unit: item.unit,
          name: item.name,
          harga: 0,
          discount: 0,
          jumlah: 0,
        }
        this.form.cart.push(newItem)
      } else {
        const b = useArrayFindIndex(this.form.cart, (i) => i.id == item.id)
        this.form.cart[b.value].jumlah++
      }
    },
    checkItem(id) {
      const b = this.form.cart.find((e) => e.id == id)
      if (b) {
        return true
      }
      return false
    },
    checkCartExisting() {
      return this.form.cart.length > 0 && this.cartTotal > 0
    },
  },
})
