import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue'),
    meta: { requireLogin: true }, },

  { path: '/todos', name: 'TodoList', component: () => import('../views/todo/TodoList.vue'),
    meta: { requireLogin: true }, },

  { path: '/model', name: 'ModelList', component: () => import('../views/model/ModelList.vue'),
    meta: { requireLogin: true }, },

  { path: '/auth/login', name: 'LogIn', component: () => import('../views/auth/LogIn.vue') },
  { path: '/auth/logout', name: 'LogOut', component: () => import('../views/auth/LogOut.vue'),
    meta: { requireLogin: true }, },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({name: 'LogIn', query: {to:to.path}})
  } else {
    next()
  }
})

export default router
