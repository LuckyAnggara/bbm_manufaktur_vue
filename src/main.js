import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import './style.css'
import App from './App.vue'
import { axiosIns } from './services/axios'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './services/router'
import Toast from 'vue-toastification'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-toastification/dist/index.css'

import '@sweetalert2/themes/dark/dark.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$axios = axiosIns
app.use(pinia)
app.use(router)
app.use(VueSweetalert2)
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
})
app.mount('#app')
