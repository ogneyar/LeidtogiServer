export const LIMIT = 4

export const ADMIN_ROUTE = '/admin' // администрация
export const LOGIN_ROUTE = '/login' // вход
export const REGISTRATION_ROUTE = '/registration' // регистрация
export const SHOP_ROUTE = '/' // главная
export const CART_ROUTE = '/cart' // корзина
export const PRODUCT_ROUTE = '/product' // товар
export const LK_ROUTE = '/lk' // личный кабинет
export const SEARCH_ROUTE = '/search' // поиск
export const ERROR_ROUTE = '/error' // ошибка
export const PARSER_ROUTE = '/parser' // парсер HTML

// отдел Информация
export const ABOUT_US_ROUTE = '/about_us' // о нас
export const DELIVERY_ROUTE = '/delivery' // доставка
export const PAYMENT_ROUTE = '/payment' // оплата
export const PRIVACY_POLICY_ROUTE = '/privacy_policy' // политика конфиденциальности
export const RETURNS_POLICY_ROUTE = '/returns_policy' // условия возврата
export const TERMS_OF_USE_ROUTE = '/terms_of_use' // пользовательское соглашение
export const WARRANTY_ROUTE = '/warranty' // гарантия и сервис
export const CONTACTS_ROUTE = '/contacts' // контакты
export const SPECIALS_ROUTE = '/specials' // акции

// странный юмор программиста
export const DELETE_ROUTE = '/delete' // удаление сайта


export const API_URL = 
        process.env.REACT_APP_ENV === 'production' 
    ? 
        process.env.REACT_APP_API_URL_PRODUCTION 
    : 
        process.env.REACT_APP_API_URL