import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import _Slug from '@/pages/legal/_Slug.vue'
import { routeName } from '@/utils/constants/legalTextConstants.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/legal/:slug',
    name: routeName,
    component: _Slug
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
