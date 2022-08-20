import GudangScreen from '../views/gudang/GudangScreen.vue'
import ProductionScreen from '../views/produksi/ProductionScreen.vue'
import POScreen from '../views/produksi/ProductionOrder/POScreen.vue'
import MutationScreen from '../views/mutation/MutationScreen.vue'
import LoginScreen from '../views/LoginScreen.vue'

export const routes = [
  {
    path: '/login',
    name: 'dashboard',
    component: LoginScreen,
    meta: {
      title: 'Login',
      layout: 'layout-full',
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
    path: '/produksi',
    name: 'produksi',
    component: ProductionScreen,
    meta: {
      title: 'Gudang',
      layout: 'layout-normal',
    },
  },
  {
    path: '/produksi/order',
    name: 'produksi-order',
    component: POScreen,
    meta: {
      title: 'Production Order',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang',
    name: 'laporan',
    component: GudangScreen,
    meta: {
      title: 'Gudang',
      layout: 'layout-normal',
    },
  },
  {
    path: '/gudang/mutasi/:id',
    name: 'mutation',
    component: MutationScreen,
    meta: {
      title: 'Mutasi Item',
      layout: 'layout-normal',
    },
  },
]
