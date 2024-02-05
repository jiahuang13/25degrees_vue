import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import About from '@/views/about'
import Massage from '@/views/massage'
import Shop from '@/views/shop'
import Article from '@/views/article'
import { getToken, getAdminToken } from '@/utils/auth'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin/login',
      component: () => import('@/views-admin/login.vue')
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
    },
    {
      path: '/admin',
      component: () => import('@/views-admin/index.vue'),
      children: [
        {
          path: '',
          redirect: 'workbench'
        },
        {
          path: 'workbench',
          component: () => import('@/views-admin/workbench.vue')
        },
        {
          path: 'product',
          component: () => import('@/views-admin/product.vue')
        },
        {
          path: 'article',
          component: () => import('@/views-admin/article.vue')
        },
        {
          path: 'user',
          component: () => import('@/views-admin/user.vue')
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // 返回页面顶部
    return { x: 0, y: 0 }
  }
})

// 路由守衛
const whiteList = ['/login', '/admin/login', '/', '/home', '/about', '/massage', '/shop', '/article', '/product/*', '/detail/*']
// 匹配所有 /detail/ 下的路径

router.beforeEach((to, from, next) => {
  const token = getToken()
  const adminToken = getAdminToken()

  if (token) {
    // 用户已登录
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else if (adminToken) {
    // 后台用户已登录
    if (to.path === '/admin/login') {
      next('/admin')
    } else {
      next()
    }
  } else if (whiteList.some(pattern => to.path.match(new RegExp(`^${pattern.replace(/\*/g, '.*')}$`)))) {
    // 在白名单中，直接放行
    next()
  } else {
    // 未登录且访问非白名单页面，则跳转至登录页面
    next('/login')
  }
})

export default router
