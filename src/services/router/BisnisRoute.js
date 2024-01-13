export const bisnisRoutes = [
  {
    path: '/bisnis',
    name: 'bisnis',
    component: () => import('@/views/bisnis/BisnisScreen.vue'),
    meta: {
      title: 'Bisnis',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/bisnis/pembelian',
    name: 'pembelian-list',
    component: () => import('@/views/bisnis/pembelian/PembelianList.vue'),
    meta: {
      title: 'Pembelian',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/bisnis/pembelian/new',
    name: 'pembelian-new',
    component: () => import('@/views/bisnis/pembelian/PembelianNew.vue'),
    meta: {
      title: 'Pembelian Baru',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/bisnis/pembelian/:id/faktur',
    name: 'pembelian-faktur',
    component: () => import('@/views/bisnis/pembelian/FakturPage.vue'),
    meta: {
      title: 'Pembelian Baru',
      layout: 'layout-full',
      requiresAuth: true,
    },
  },
  {
    path: '/bisnis/penjualan',
    name: 'penjualan-list',
    component: () => import('@/views/bisnis/penjualan/PenjualanList.vue'),
    meta: {
      title: 'Penjualan',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/bisnis/penjualan/new',
    name: 'penjualan-new',
    component: () => import('@/views/bisnis/penjualan/PenjualanNew.vue'),
    meta: {
      title: 'Penjualan Baru',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/bisnis/penjualan/:id/faktur',
    name: 'penjualan-faktur',
    component: () => import('@/views/bisnis/penjualan/FakturPage.vue'),
    meta: {
      requiresAuth: true,
      title: 'Faktur Penjualan',
      layout: 'layout-full',
    },
  },
  {
    path: '/bisnis/penjualan/:id/verification',
    name: 'verification',
    component: () => import('@/views/bisnis/penjualan/VerificationPage.vue'),
    meta: {
      requiresAuth: false,
      title: 'Bisnis',
      layout: 'layout-full',
    },
  },
  {
    path: '/bisnis/biaya',
    name: 'biaya-list',
    component: () => import('@/views/bisnis/biaya/BiayaList.vue'),
    meta: {
      title: 'Biaya',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/bisnis/gaji',
    name: 'gaji-list',
    component: () => import('@/views/bisnis/gaji/GajiList.vue'),
    meta: {
      title: 'Gaji',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/bisnis/gaji',
    name: 'gaji-new',
    component: () => import('@/views/bisnis/gaji/New.vue'),
    meta: {
      title: 'Gaji',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
]
