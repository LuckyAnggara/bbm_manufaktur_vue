import PersediaanScreen from '../../views/gudang/Persediaan/PersediaanScreen.vue'
import GudangScreen from '../../views/gudang/GudangScreen.vue'
import MasukScreen from '../../views/gudang/Mutasi/Masuk/MasukScreen.vue'

export const gudangRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: PersediaanScreen,
    meta: {
      title: 'Dashboard',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang',
    name: 'gudang',
    component: GudangScreen,
    meta: {
      title: 'Gudang',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/persediaan',
    name: 'gudang-persediaan',
    component: PersediaanScreen,
    meta: {
      title: 'Persediaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/barang/masuk',
    name: 'gudang-barang-masuk',
    component: MasukScreen,
    meta: {
      title: 'Gudang',
      layout: 'layout-normal',
    },
  },
]
