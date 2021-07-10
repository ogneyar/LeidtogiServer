export const ADMIN_ROUTE = '/admin'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'
export const SHOP_ROUTE = '/'
export const CART_ROUTE = '/cart'
export const PRODUCT_ROUTE = '/product'

export const API_URL = 
        process.env.REACT_APP_ENV === 'production' 
    ? 
        process.env.REACT_APP_API_URL_PRODUCTION 
    : 
        process.env.REACT_APP_API_URL