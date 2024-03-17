import ProductionScreen from '@/views/produksi/ProductionScreen.vue'
import UpdateScreen from '@/views/produksi/productionorder/update/UpdateScreen.vue'
import NewScreen from '@/views/produksi/productionorder/new/NewScreen.vue'
import EditScreen from '@/views/produksi/productionorder/edit/EditScreen.vue'
import FinishScreen from '@/views/produksi/productionorder/FinishScreen.vue'
import ProductionListScreen from '@/views/produksi/productionorder/daftar/ProductionListScreen.vue'

export const productionOrderRoutes = [
  {
    path: '/produksi',
    name: 'produksi',
    component: ProductionScreen,
    meta: {
      title: 'Produksi',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/produksi/order/finish/:id',
    name: 'produksi-order-finish',
    component: FinishScreen,
    meta: {
      title: 'Deetail Produksi',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/produksi/order/list/',
    name: 'produksi-order-list',
    component: ProductionListScreen,
    meta: {
      title: 'Data Produksi Order',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/produksi/order/new',
    name: 'produksi-order-new',
    component: NewScreen,
    meta: {
      title: 'Produksi Order',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/produksi/order/edit/:id',
    name: 'produksi-order-edit',
    component: EditScreen,
    meta: {
      title: 'Produksi Order',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/produksi/order/update/:id',
    name: 'produksi-order-update',
    component: UpdateScreen,
    meta: {
      title: 'Update Production Order',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
]
