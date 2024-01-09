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
  {
    path: '/bisnis/penjualan',
    name: 'penjualan-list',
    component: () => import('@/views/bisnis/penjualan/PenjualanList.vue'),
    meta: {
      title: 'Penjualan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/bisnis/penjualan/new',
    name: 'penjualan-new',
    component: () => import('@/views/bisnis/penjualan/PenjualanNew.vue'),
    meta: {
      title: 'Penjualan Baru',
      layout: 'layout-normal',
    },
  },
  {
    path: '/bisnis/penjualan/:id/faktur',
    name: 'penjualan-faktur',
    component: () => import('@/views/bisnis/penjualan/FakturPage.vue'),
    meta: {
      title: 'Faktur Penjualan',
      layout: 'layout-full',
    },
  },
]
