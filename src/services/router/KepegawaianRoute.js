import PegawaiScreen from '@/views/data/pegawai/PegawaiScreen.vue'
import AbsensiScreen from '@/views/kepegawaian/absensi/AbsensiScreen.vue'

export const kepegawaianRoutes = [
  {
    path: '/kepegawaian',
    name: 'kepegawaian',
    component: () => import('@/views/kepegawaian/Screen.vue'),
    meta: {
      title: 'Kepegawaian',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/kepegawaian/list',
    name: 'daftar-pegawai',
    component: PegawaiScreen,
    meta: {
      title: 'Daftar Pegawai',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/kepegawaian/absensi',
    name: 'data-absensi',
    component: AbsensiScreen,
    meta: {
      title: 'Data Absensi',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
]
