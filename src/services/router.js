import GudangScreen from '../views/gudang/GudangScreen.vue'

import { productionOrderRoute } from './router/ProductionOrderRoute'
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
  ...productionOrderRoute,
]
