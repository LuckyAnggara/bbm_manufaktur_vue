import ProductionScreen from '../../views/produksi/ProductionScreen.vue'
import UpdateScreen from '../../views/produksi/ProductionOrder/Update/UpdateScreen.vue'
import NewScreen from '../../views/produksi/ProductionOrder/New/NewScreen.vue'
import EditScreen from '../../views/produksi/ProductionOrder/Edit/EditScreen.vue'
import FinishScreen from '../../views/produksi/ProductionOrder/FinishScreen.vue'
import ProductionListScreen from '../../views/produksi/ProductionOrder/Daftar/ProductionListScreen.vue'

export const productionOrderRoutes = [
  {
    path: '/produksi',
    name: 'produksi',
    component: ProductionScreen,
    meta: {
      title: 'Produksi',
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
      title: 'Produksi Order',
      layout: 'layout-normal',
    },
  },
  {
    path: '/produksi/order/edit/:id',
    name: 'produksi-order-edit',
    component: EditScreen,
    meta: {
      title: 'Produksi Order',
      layout: 'layout-normal',
    },
  },
  {
    path: '/produksi/order/update/:id',
    name: 'produksi-order-update',
    component: UpdateScreen,
    meta: {
      title: 'Update Production Order',
      layout: 'layout-normal',
    },
  },
]
