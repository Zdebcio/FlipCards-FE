// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Cookies from 'js-cookie'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    meta: { requiresAuth: true, drawer: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        meta: { drawer: true, exact: true },
        component: () => import('@/views/Dashboard.vue')
      }
    ]
  },
  {
    path: '/auth',
    redirect: { path: '/auth/login' },
    component: () => import('@/layouts/auth/Auth.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Register.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async to => {
  const authToken = Cookies.get('authToken')
  if (!authToken && to.meta.requiresAuth) {
    return { name: 'Login' }
  }
  if (authToken && !to.meta.requiresAuth) {
    return { name: 'Home' }
  }
})

export default router
