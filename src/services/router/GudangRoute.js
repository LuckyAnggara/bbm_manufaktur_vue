import PersediaanScreen from '../../views/gudang/Persediaan/PersediaanScreen.vue'
import GudangScreen from '../../views/gudang/GudangScreen.vue'
import MasukScreen from '../../views/gudang/Mutasi/Masuk/MasukScreen.vue'
import KeluarScreen from '../../views/gudang/Mutasi/Keluar/KeluarScreen.vue'
import MutasiScreen from '../../views/gudang/Mutasi/MutasiScreen.vue'

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
    path: '/gudang/barang/mutasi',
    name: 'gudang-barang-mutasi',
    component: MutasiScreen,
    meta: {
      title: 'Master Mutasi Persediaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/barang/masuk',
    name: 'gudang-barang-masuk',
    component: MasukScreen,
    meta: {
      title: 'Barang Masuk',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/barang/keluar',
    name: 'gudang-barang-keluar',
    component: KeluarScreen,
    meta: {
      title: 'Barang Keluar',
      layout: 'layout-normal',
    },
  },
]
