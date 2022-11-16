import DataScreen from '../../views/data/DataScreen.vue'

export const dataRoutes = [
  {
    path: '/data',
    name: 'data',
    component: DataScreen,
    meta: {
      title: 'Master Data',
      layout: 'layout-normal',
    },
  },
]
