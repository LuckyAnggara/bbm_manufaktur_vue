export const LaporanRoute = [
  {
    path: '/laporan',
    name: 'laporan',
    component: () => import('@/views/laporan/Screen.vue'),
    meta: {
      title: 'Laporan',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
]
