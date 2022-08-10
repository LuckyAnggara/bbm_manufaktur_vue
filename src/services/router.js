import GudangScreen from '../views/gudang/GudangScreen.vue'
import MutationScreen from '../views/mutation/MutationScreen.vue'
import LoginScreen from '../views/LoginScreen.vue'

export const routes = [
  {
    path: '/login',
    name: 'login',
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
    path: '/gudang/mutation/:id',
    name: 'mutation',
    component: MutationScreen,
    meta: {
      title: 'Mutasi Item',
      layout: 'layout-normal',
    },
  },
]
