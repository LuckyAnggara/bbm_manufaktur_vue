import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'

import { useToast } from 'vue-toastification'

const toast = useToast()

// PRODUCTION ORDER STORE
export const useAuthStore = defineStore('authStore', {
  // AUTH STORE
  state: () => {
    return {
      user: null,
      form: {
        username: null,
        password: null,
      },

      isLoading: false,
    }
  },
  getters: {
    userData(state) {
      return state.user
    },
    token() {
      return JSON.parse(localStorage.getItem('token'))
    },
    userData() {
      return JSON.parse(localStorage.getItem('userData'))
    },
    isLogin() {
      if (JSON.parse(localStorage.getItem('userData'))) return true
      return false
    },
  },
  actions: {
    async login() {
      console.info('aa')
      this.isLoading = true
      try {
        const response = await axiosIns.post(`/login`, this.form)
        console.info(response)
        const data = response.data
        if (response.status == 200) {
          localStorage.setItem('token', JSON.stringify(data.data.token))
          localStorage.setItem('userData', JSON.stringify(data.data.user))
          toast.success(data.message, {
            timeout: 1500,
            position: 'top-left',
          })
          return true
        }
        if (response.status == 202) {
          console.info(data)
          toast.warning(data.message, {
            timeout: 2000,
            position: 'top-left',
          })
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        })
        console.info(error)
        this.isLoading = false
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/logout`)
        if (response.status == 200) {
          if (response.data == 'error') {
            localStorage.clear()
          } else {
            localStorage.removeItem('userData')
            localStorage.removeItem('token')
          }
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
    async getAuthUser() {
      try {
        const respo = await axiosIns.get(`/auth/user`)
        this.user = respo.data
        return respo.data
      } catch (error) {
      } finally {
        this.isLoading = false
      }
      return false
    },
  },
})
