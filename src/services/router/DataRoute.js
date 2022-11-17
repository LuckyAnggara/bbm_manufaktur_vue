import DataScreen from '../../views/data/DataScreen.vue'
import TipeScreen from '../../views/data/Tipe/TipeScreen.vue'
import UnitScreen from '../../views/data/Unit/UnitScreen.vue'
import MachineScreen from '../../views/data/Machine/MachineScreen.vue'
import OverheadScreen from '../../views/data/Overhead/OverheadScreen.vue'

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
  {
    path: '/data/tipe',
    name: 'data-tipe',
    component: TipeScreen,
    meta: {
      title: 'Data Tipe',
      layout: 'layout-normal',
    },
  },
  {
    path: '/data/unit',
    name: 'data-unit',
    component: UnitScreen,
    meta: {
      title: 'Data Unit',
      layout: 'layout-normal',
    },
  },
  {
    path: '/data/machine',
    name: 'data-machine',
    component: MachineScreen,
    meta: {
      title: 'Data Mesin',
      layout: 'layout-normal',
    },
  },
  {
    path: '/data/overhead',
    name: 'data-overhead',
    component: OverheadScreen,
    meta: {
      title: 'Data Overhead',
      layout: 'layout-normal',
    },
  },
]
