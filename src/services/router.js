import GudangScreen from '../views/gudang/GudangScreen.vue'
import ProductionScreen from '../views/produksi/ProductionScreen.vue'
import NewScreen from '../views/produksi/ProductionOrder/New/NewScreen.vue'
import EditScreen from '../views/produksi/ProductionOrder/Edit/EditScreen.vue'
import FinishScreen from '../views/produksi/ProductionOrder/FinishScreen.vue'
import ProductionListScreen from '../views/produksi/ProductionOrder/Daftar/ProductionListScreen.vue'
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
    path: '/dashboard',
    name: 'dashboard',
    component: GudangScreen,
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
    path: '/produksi',
    name: 'produksi',
    component: ProductionScreen,
    meta: {
      title: 'Gudang',
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
  {
    path: '/produksi/order/finish/:id',
    name: 'produksi-order-finish',
    component: FinishScreen,
    meta: {
      title: 'Mutasi Item',
      layout: 'layout-normal',
    },
  },
  {
    path: '/produksi/order/list/',
    name: 'produksi-order-list',
    component: ProductionListScreen,
    meta: {
      title: 'Data Produksi Order',
      layout: 'layout-normal',
    },
  },
  {
    path: '/produksi/order/new',
    name: 'produksi-order-new',
    component: NewScreen,
    meta: {
      title: 'Production Order',
      layout: 'layout-normal',
    },
  },
  {
    path: '/produksi/order/edit/:id',
    name: 'produksi-order-edit',
    component: EditScreen,
    meta: {
      title: 'Production Order',
      layout: 'layout-normal',
    },
  },
]
