import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/qnyh-keju',
    name: 'qnyh-keju',
    component: () => import(/* webpackChunkName: "qnyh-keju" */ '../views/qnyh/KeJu.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
