import Admin from '../pages/Admin'
import Cart from '../pages/Cart'
import Shop from '../pages/Shop'
import Auth from '../pages/Auth'
import Product from '../pages/Product'

import AboutUs from '../pages/informations/AboutUs'
import Delivery from '../pages/informations/Delivery'
import Payment from '../pages/informations/Payment'
import PrivacyPolicy from '../pages/informations/PrivacyPolicy'
import ReturnsPolicy from '../pages/informations/ReturnsPolicy'
import TermsOfUse from '../pages/informations/TermsOfUse'
import Warranty from '../pages/informations/Warranty'

import {
    ADMIN_ROUTE, CART_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PRODUCT_ROUTE,
    ABOUT_US_ROUTE, DELIVERY_ROUTE, PAYMENT_ROUTE, PRIVACY_POLICY_ROUTE, RETURNS_POLICY_ROUTE,
    TERMS_OF_USE_ROUTE, WARRANTY_ROUTE
} from './consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: CART_ROUTE,
        Component: Cart
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
        path: PRODUCT_ROUTE + '/:id',
        Component: Product
    },
    // отдел Информация
    {
        path: ABOUT_US_ROUTE,
        Component: AboutUs
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
    {
        path: PAYMENT_ROUTE,
        Component: Payment
    },
    {
        path: PRIVACY_POLICY_ROUTE,
        Component: PrivacyPolicy
    },
    {
        path: RETURNS_POLICY_ROUTE,
        Component: ReturnsPolicy
    },
    {
        path: TERMS_OF_USE_ROUTE,
        Component: TermsOfUse
    },
    {
        path: WARRANTY_ROUTE,
        Component: Warranty
    }
]