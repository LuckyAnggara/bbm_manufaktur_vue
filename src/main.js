import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import './index.css'
import './style.css'
import App from './App.vue'
import axiosIns from './services/axios'
import router from './services/router'
import Toast from 'vue-toastification'
import VueSweetalert2 from 'vue-sweetalert2'
import moment from 'moment-timezone'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-toastification/dist/index.css'
import VueNumerals from 'vue-numerals'
import '@sweetalert2/themes/dark/dark.css'

moment.tz.setDefault('Asia/Jakarta')
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

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$moment = moment
app.config.globalProperties.$axios = axiosIns
app.use(pinia)
app.use(router)
app.use(VueNumerals)
app.use(VueSweetalert2)
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
})

app.mount('#app')
