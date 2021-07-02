import Admin from '../pages/Admin'
import Cart from '../pages/Cart'
import Shop from '../pages/Shop'
import Auth from '../pages/Auth'
import Device from '../pages/Device'
import {ADMIN_ROUTE, CART_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, DEVICE_ROUTE} from './consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: Device
    }
]