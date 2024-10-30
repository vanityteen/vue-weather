import { createRouter, createWebHashHistory } from 'vue-router'
import ProvinceView from '@/views/ProvinceView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'province',
      component: ProvinceView,
      meta: {
        title: '省份'
      },
      children: [
        {
          path: '/city',
          name: 'city',
          component: () => import('@/views/CityView.vue'),
          meta: {
            title: '城市'
          },
          children: [
            {
              path: '/weather',
              name: 'weather',
              // route level code-splitting
              // this generates a separate chunk (About.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import('@/views/WeatherView.vue'),
              meta: {
                title: '天气'
              }
            }
          ]
        }
      ]
    }
  ]
})

export default router
