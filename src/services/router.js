import { productionOrderRoutes } from './router/ProductionOrderRoute'
import { gudangRoutes } from './router/GudangRoute'
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
    path: '/gudang/mutasi/:id',
    name: 'mutation',
    component: MutationScreen,
    meta: {
      title: 'Mutasi Item',
      layout: 'layout-normal',
    },
  },
  ...productionOrderRoutes,
  ...gudangRoutes,
]
