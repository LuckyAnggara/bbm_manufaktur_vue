import MainScreen from '../../views/dashboard/MainScreen.vue'

export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: MainScreen,
    meta: {
      title: 'Dashboard',
      layout: 'layout-normal',
    },
  },

  {
    path: '/',
    name: '',
    component: MainScreen,
    meta: {
      title: 'Dashboard',
      layout: 'layout-normal',
    },
  },
]
