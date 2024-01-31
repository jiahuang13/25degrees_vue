import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import About from '@/views/about'
import Massage from '@/views/massage'
import Shop from '@/views/shop'
import Article from '@/views/article'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/about', component: About },
        { path: '/massage', component: Massage },
        { path: '/shop', component: Shop },
        { path: '/article', component: Article },
        {
          path: '/detail/:id',
          component: () => import('@/views/article/detail.vue')
        },
        {
          path: '/product/:id',
          component: () => import('@/views/shop/product.vue')
        }
      ]
    }
    // {
    //   path: '/about',
    //   component: Layout,
    //   children: [{
    //     path: '',
    //     component: () => import('@/views/About/index'),
    //     meta: { title: '關於25°C' }
    //   }]
    // },
    // {
    //   path: '/article',
    //   component: Layout,
    //   children: [{
    //     path: '',
    //     component: () => import('@/views/Article/index'),
    //     meta: { title: '專欄' }
    //   }]
    // },
    // {
    //   path: '/shop',
    //   component: Layout,
    //   children: [{
    //     path: '',
    //     component: () => import('@/views/Shop/index'),
    //     meta: { title: '線上商店' }
    //   }]
    // },
    // {
    //   path: '/massage',
    //   component: Layout,
    //   children: [{
    //     path: '',
    //     component: () => import('@/views/Massage/index'),
    //     meta: { title: '精油按摩' }
    //   }]
    // }
  ]
})

export default router
