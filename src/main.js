import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import './index.css'
import './style.css'
import App from './App.vue'
import axiosIns from './services/axios'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './services/router'
import Toast from 'vue-toastification'
import VueSweetalert2 from 'vue-sweetalert2'
import moment from 'moment'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-toastification/dist/index.css'

import '@sweetalert2/themes/dark/dark.css'
import { isUserLoggedIn } from './services/auth'
import { useAuthStore } from './stores/store'

moment.updateLocale('en', {
  months: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agus',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ],
  weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'],
  weekdaysShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
})
moment().format('L')

const router = createRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  history: createWebHashHistory(),
  routes,
})

router.beforeResolve(async (to, _, next) => {
  const auth = useAuthStore()
  const isLoggedIn = isUserLoggedIn()
  // const userData = getUserData()
  // if (to.name !== 'login' && !isLoggedIn) next({ name: 'login' })
  if (to.name !== 'login' && !auth.isLogin) next({ name: 'login' })
  else next()
})

const pirntOptions = {
  name: '_blank',
  specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
  styles: [],
}

createApp(App)
const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$moment = moment
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
