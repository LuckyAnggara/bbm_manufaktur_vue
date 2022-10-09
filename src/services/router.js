import { productionOrderRoutes } from './router/ProductionOrderRoute'
import { gudangRoutes } from './router/GudangRoute'
import MutationScreen from '../views/mutation/MutationScreen.vue'
import LoginScreen from '../views/LoginScreen.vue'
import { getUserData, isUserLoggedIn } from './auth'
import ProductionScreen from '../views/produksi/ProductionScreen.vue'

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
    path: '/',
    name: '',
    component: ProductionScreen,
    meta: {
      title: 'Login',
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
  ...productionOrderRoutes,
  ...gudangRoutes,
]

export const getNavigation = () => {
  const isLoggedIn = isUserLoggedIn()
  const userData = getUserData()
  if (isLoggedIn) {
    if (userData.role == 'USER') {
      return user
    } else if (userData.role == 'ADMIN') {
      return admin
    }
  } else {
    return nonUser
  }
  // return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}
