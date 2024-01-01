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
  {
    path: '/bisnis/pembelian/new',
    name: 'pembelian-new',
    component: () => import('@/views/bisnis/pembelian/PembelianNew.vue'),
    meta: {
      title: 'Pembelian Baru',
      layout: 'layout-normal',
    },
  },
  {
    path: '/bisnis/pembelian/:id/faktur',
    name: 'pembelian-faktur',
    component: () => import('@/views/bisnis/pembelian/FakturPage.vue'),
    meta: {
      title: 'Pembelian Baru',
      layout: 'layout-full',
    },
  },
]
