import { getCookie, request } from '@/utils/request'
import type { LocationQueryRaw, RouteParamsRaw, RouteRecordName } from 'vue-router'

export interface INavItem {
  name: string
  link?: string
  label?: string
  icon?: string
  show?: boolean
  actionFn?: Function
  params?: RouteParamsRaw
  query?: LocationQueryRaw
}

export const getNavRoutes = (
  isUserLoggedIn: Boolean = false,
  currentRoute: RouteRecordName  = ''
): Array<INavItem> => {
  return [...getMainNav(isUserLoggedIn, currentRoute)]
}

export const getBottomNav = (isUserLoggedIn: boolean = false): Array<INavItem> => {
  const loginRoute: INavItem = {
    name: isUserLoggedIn ? 'logout' : 'login',
    icon: isUserLoggedIn ? 'co-power-standby' : 'co-user'
  }
  if (isUserLoggedIn) {
    loginRoute.actionFn = async () => {
      await request({
        url: '/users/logout',
        method: 'POST',
        body: { token: getCookie('auth') }
      })
      document.cookie = 'auth=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      window.location.href = '/'
    }
  }
  return [loginRoute]
}

const getMainNav = (isUserLoggedIn: Boolean = false, currentRoute: RouteRecordName = ''): Array<INavItem> => {
  const homeRoute = {
    name: 'Home',
    link: '/Home',
    icon: 'io-home-outline'
  }
  const routesToDisplay = [homeRoute]
  if (!isUserLoggedIn) return routesToDisplay
  const userRoutes = [
    {
      name: 'Settings',
      link: '/user/settings',
      label: 'Settings',
      icon: 'co-cog'
    },
    {
      name: 'Home',
      link: '/Home',
      label: 'Notifications',
      icon: 'bi-bell-fill'
    },
    {
      name: 'Home',
      link: '/Home',
      label: 'Favourites',
      icon: 'bi-star-fill'
    }
  ]
  return [...routesToDisplay, ...userRoutes]
}
