import AdminPage from '../pages/admin/AdminPage'
import CartPage from '../pages/cart/CartPage'
import ShopPage from '../pages/shop/ShopPage'
import AuthPage from '../pages/auth/AuthPage'
import ProductPage from '../pages/product/ProductPage'
import LkPage from '../pages/lk/LkPage'
import SearchPage from '../pages/search/SearchPage'
import ErrorPage from '../pages/error/ErrorPage'
import ParserPage from '../pages/parser/ParserPage'

import AboutUs from '../pages/info/AboutUs'
import Delivery from '../pages/info/Delivery'
import Payment from '../pages/info/Payment'
import PrivacyPolicy from '../pages/info/PrivacyPolicy'
import ReturnsPolicy from '../pages/info/ReturnsPolicy'
import TermsOfUse from '../pages/info/TermsOfUse'
import Warranty from '../pages/info/Warranty'
import Contacts from '../pages/info/Contacts'
import Specials from '../pages/info/Specials'

import DeletePage from '../pages/site/DeletePage'

import {
    ADMIN_ROUTE, CART_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, 
    PRODUCT_ROUTE, LK_ROUTE, SEARCH_ROUTE, ERROR_ROUTE, PARSER_ROUTE, ABOUT_US_ROUTE, 
    DELIVERY_ROUTE, PAYMENT_ROUTE, PRIVACY_POLICY_ROUTE, RETURNS_POLICY_ROUTE, 
    TERMS_OF_USE_ROUTE, WARRANTY_ROUTE, CONTACTS_ROUTE, SPECIALS_ROUTE, DELETE_ROUTE
} from './consts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: LK_ROUTE,
        Component: LkPage
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: ShopPage
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: SEARCH_ROUTE,
        Component: SearchPage
    },
    {
        path: ERROR_ROUTE,
        Component: ErrorPage
    },
    {
        path: PARSER_ROUTE,
        Component: ParserPage
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
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: SPECIALS_ROUTE,
        Component: Specials
    },

     // юмор It отдела
    {
        path: DELETE_ROUTE,
        Component: DeletePage
    },

    // роут категорий - /nazvanie-kategorii
    {
        path: '/:name',
        Component: ShopPage
    }
]