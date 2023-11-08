import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from "../utils/request.ts"
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
      path: '/me',
      name: 'Profile',
      meta: {
        loginRequired: true
      },
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
      meta: {
        loginRequired: true
      },
      component: HomeView
    }
  ]
})

router.beforeEach(async (to) => {
  const isAuthenticated = getCookie('auth');
  if (!isAuthenticated && to.meta.loginRequired){
    return { name: 'login' }
  } else if (isAuthenticated && to.name === 'login') return { name: "Profile" }
})

export default router
