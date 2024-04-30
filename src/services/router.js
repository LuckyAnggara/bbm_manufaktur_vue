import { productionOrderRoutes } from './router/ProductionOrderRoute'
import { gudangRoutes } from './router/GudangRoute'
import { dashboardRoutes } from './router/DashboardRoute'
import { dataRoutes } from './router/DataRoute'
import MutationScreen from '../views/mutation/MutationScreen.vue'
import LoginScreen from '../views/LoginScreen.vue'
import { getUserData, isUserLoggedIn } from './auth'
import { bisnisRoutes } from './router/BisnisRoute'
import { useAuthStore } from '@/stores/authStore'

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginScreen,
    meta: {
      requiresAuth: false,
      title: 'Login',
      layout: 'layout-full',
    },
  },

  {
    path: '/gudang/mutasi/:id',
    name: 'mutation',
    component: MutationScreen,
    meta: {
      requiresAuth: true,
      title: 'Mutasi Item',
      layout: 'layout-normal',
    },
  },
  ...productionOrderRoutes,
  ...gudangRoutes,
  ...dashboardRoutes,
  ...dataRoutes,
  ...bisnisRoutes,
]

const router = createRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const authUser = authStore.userData
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
  const loginQuery = { path: '/login' }
  const dashboardQuery = { path: '/dashboard' }

  if (reqAuth && !authUser) {
    const isAuth = await authStore.getAuthUser()
    if (to.fullPath == loginQuery) {
    }
    if (!isAuth) {
      next(loginQuery)
    } else {
      next()
    }
  } else {
    if (to.fullPath == '/login') {
      const isAuth = await authStore.getAuthUser()
      if (isAuth) {
        next(dashboardQuery)
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router

// export const getNavigation = () => {
//   const isLoggedIn = isUserLoggedIn()
//   const userData = getUserData()
//   if (isLoggedIn) {
//     if (userData.role == 'USER') {
//       return user
//     } else if (userData.role == 'ADMIN') {
//       return admin
//     }
//   } else {
//     return nonUser
//   }
//   // return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
// }
