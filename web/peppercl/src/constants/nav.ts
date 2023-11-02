import type { LocationQueryRaw, RouteParamsRaw } from 'vue-router'

export interface INavItem {
    name: string,
    link?: string,
    label?: string,
    icon?: string,
    show?: boolean
    params?: RouteParamsRaw
    query?: LocationQueryRaw
}

export const getNavRoutes = (): Array<INavItem> => {
    return [
        ...getMainNav()
    ]
}

export const getBottomNav = (isUserLoggedIn: boolean = false): Array<INavItem> => {
    const loginRoute = {
        'name': isUserLoggedIn ? 'logout' : 'login',
        'icon': isUserLoggedIn ? 'co-power-standby' : 'co-user'
    }
    return [
       loginRoute
    ]
}

const getMainNav = (): Array<INavItem> => {
    return [
        {
            "name": "Home",
            "link": "/Home",
            "icon": "io-home-outline",
        },
    ]
}