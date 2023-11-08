import type { LocationQueryRaw, RouteParamsRaw } from 'vue-router'

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

export const getNavRoutes = (): Array<INavItem> => {
  return [...getMainNav()]
}

export const getBottomNav = (isUserLoggedIn: boolean = false): Array<INavItem> => {
  const loginRoute: INavItem = {
    name: isUserLoggedIn ? 'logout' : 'login',
    icon: isUserLoggedIn ? 'co-power-standby' : 'co-user'
  }
  if (isUserLoggedIn) {
    loginRoute.actionFn = () => {
      document.cookie = 'auth=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      window.location.href = '/'
    }
  }
  return [loginRoute]
}

const getMainNav = (): Array<INavItem> => {
  return [
    {
      name: 'Home',
      link: '/Home',
      icon: 'io-home-outline'
    },
    {
      name: 'Home',
      link: '/Home',
      icon: 'io-home-outline'
    },
    {
      name: 'Home',
      link: '/Home',
      icon: 'io-home-outline'
    },
    {
      name: 'Home',
      link: '/Home',
      icon: 'io-home-outline'
    },
    {
      name: 'Home',
      link: '/Home',
      icon: 'io-home-outline'
    },
    {
      name: 'Home',
      link: '/Home',
      icon: 'io-home-outline'
    }
  ]
}
