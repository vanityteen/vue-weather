import { createRouter, createWebHashHistory } from 'vue-router'
import ProvinceView from '@/views/Weather/ProvinceView.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/weather/province',
      name: 'province',
      component: ProvinceView,
      meta: {
        title: '省份'
      },
      children: [
        {
          path: '/weather/city',
          name: 'city',
          component: () => import('@/views/Weather/CityView.vue'),
          meta: {
            title: '城市'
          },
          children: [
            {
              path: '/weather/detail',
              name: 'detail',
              // route level code-splitting
              // this generates a separate chunk (About.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import('@/views/Weather/WeatherView.vue'),
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
