interface NavItem {
    name: string,
    link: string,
    label?: string,
    icon?: string,
}

export const getNavRoutes = (): Array<NavItem> => {
    return [
        ...getMainNav()
    ]
}

const getMainNav = (): Array<NavItem> => {
    return [
        {
            "name": "Users",
            "link": "/users"
        }
    ]
}