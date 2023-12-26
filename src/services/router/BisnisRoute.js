export const bisnisRoutes = [
  {
    path: '/bisnis',
    name: 'bisnis',
    component: () => import('@/views/bisnis/BisnisScreen.vue'),
    meta: {
      title: 'Bisnis',
      layout: 'layout-normal',
    },
  },
  {
    path: '/bisnis/pembelian',
    name: 'pembelian-list',
    component: () => import('@/views/bisnis/pembelian/PembelianList.vue'),
    meta: {
      title: 'Pembelian',
      layout: 'layout-normal',
    },
  },
]
