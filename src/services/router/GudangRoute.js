import PersediaanScreen from '../../views/gudang/Persediaan/PersediaanScreen.vue'
import GudangScreen from '../../views/gudang/GudangScreen.vue'
import MasukScreen from '../../views/gudang/Mutasi/Masuk/MasukScreen.vue'
import KeluarScreen from '../../views/gudang/Mutasi/Keluar/KeluarScreen.vue'
import MutasiScreen from '../../views/gudang/Mutasi/MutasiScreen.vue'
import MutasiDetailScreen from '../../views/gudang/Mutasi/MutasiDetailScreen.vue'

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
      title: 'Data Persediaan Barang',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/barang/opname',
    name: 'gudang-barang-stock-opname',
    component: MutasiScreen,
    meta: {
      title: 'Stock Opname Persediaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/barang/opname/masuk',
    name: 'gudang-barang-stock-opname-masuk',
    component: MasukScreen,
    meta: {
      title: 'Barang Masuk',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/barang/opname/keluar',
    name: 'gudang-barang-stock-opname-keluar',
    component: KeluarScreen,
    meta: {
      title: 'Barang Keluar',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/barang/opname/detail/:id',
    name: 'gudang-barang-opname-detail',
    component: MutasiDetailScreen,
    meta: {
      title: 'Detail Stock Opname',
      layout: 'layout-normal',
    },
  },
]
