import DataScreen from '@/views/data/DataScreen.vue'
import TipeScreen from '@/views/data/tipe/TipeScreen.vue'
import UnitScreen from '@/views/data/unit/UnitScreen.vue'
import MachineScreen from '@/views/data/machine/MachineScreen.vue'
import OverheadScreen from '@/views/data/overhead/OverheadScreen.vue'
import PegawaiScreen from '@/views/data/pegawai/PegawaiScreen.vue'

export const dataRoutes = [
  {
    path: '/data',
    name: 'data',
    component: DataScreen,
    meta: {
      title: 'Master Data',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/data/tipe',
    name: 'data-tipe',
    component: TipeScreen,
    meta: {
      title: 'Data Tipe',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/data/unit',
    name: 'data-unit',
    component: UnitScreen,
    meta: {
      title: 'Data Unit',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/data/machine',
    name: 'data-machine',
    component: MachineScreen,
    meta: {
      title: 'Data Mesin',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/data/overhead',
    name: 'data-overhead',
    component: OverheadScreen,
    meta: {
      title: 'Data Overhead',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
  {
    path: '/data/pegawai',
    name: 'data-pegawai',
    component: PegawaiScreen,
    meta: {
      title: 'Data Pegawai',
      layout: 'layout-normal',
      requiresAuth: true,
    },
  },
]
