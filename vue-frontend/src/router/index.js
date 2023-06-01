import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/backstage',
    component: () => import('../views/BackStage.vue'),
  },
  {
    path: '/program',
    component: () => import('../views/Program.vue'),
  },
  {
    path: '/essay',
    component: () => import('../views/Essay.vue'),
  },
  {
    path: '/link',
    component: () => import('../views/Link.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
  routes
})

export default router
