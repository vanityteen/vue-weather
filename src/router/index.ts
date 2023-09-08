import { createRouter, createWebHistory } from 'vue-router'
import ProvinceView from '@/views/ProvinceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'province',
      component: ProvinceView
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('@/views/CityView.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/WeatherView.vue')
    }
  ]
})

export default router
