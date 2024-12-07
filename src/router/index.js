import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld'
import Loading from '../components/loading'
import Test_a from '../components/Test_a'
import TongJi from '../components/TongJi'
import Bingttu from '../components/Bingtu'
const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/Loading',
    name: 'Loading',
    component: Loading
  },
  {
    path: '/Test_a',
    name: 'Test_a',
    component: Test_a
  },
  {
    path: '/TongJi',
    name: 'TongJi',
    component: TongJi
  },
  {
    path: '/BingtuChart',
    name: 'BingtuChart',
    component: Bingttu
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
