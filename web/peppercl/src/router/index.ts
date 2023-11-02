import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/users/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'Users',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: RegisterView
    },
    {
      path: '/logout',
      name: 'logout',
      component: HomeView
    }
  ]
})

export default router
