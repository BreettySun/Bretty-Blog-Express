import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontStage/Index.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/FrontStage/Login.vue')
  },
  {
    path: '/program',
    component: () => import('../views/FrontStage/Code.vue'),
  },
  {
    path: '/essay',
    component: () => import('../views/FrontStage/Essay.vue'),
  },
  {
    path: '/link',
    component: () => import('../views/FrontStage/Link.vue'),
  },
  {
    path: '/article/:id',
    component: () => import('../views/FrontStage/Article.vue'),
  },
  {
    path: '/backstage',
    component: () => import('../views/BackStage/BackStage.vue'),
    children: [
      {
        path: '/usermanage',
        component: () => import('../views/BackStage/UserManage.vue'),
      },
      {
        path: '/articlepublish',
        component: () => import('../views/BackStage/ArticlePublish.vue'),
      },
      {
        path: '/articlepublish/:id',
        component: () => import('../views/BackStage/ArticlePublish.vue'),
      },
      {
        path: '/codemanage',
        component: () => import('../views/BackStage/CodeManage.vue'),
      },
      {
        path: '/essaymanage',
        component: () => import('../views/BackStage/EssayManage.vue'),
      }
    ]
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

//后台路由拦截
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/backstage')) {
    const token = window.localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
