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
export const TESTER_ROUTE = '/tester' // парсер HTML
export const CONFIRM_ROUTE = '/confirmation' // подтверждение почты пользователя
export const SUPPORT_ROUTE = '/support' // тех.поддержка

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


// прокрутка страницы при нажатии на категорию
export const SCROLL_TOP = 205 // до aside
export const SCROLL_TOP_MOBILE = 160 // для мобильной версии сайта


export const MAIL = `<a href="mailto:info@leidtogi.ru">info@leidtogi.ru</a>` // основной почтовый ящик
export const ADDRESS = "г. Курск, ул. Соловьиная, д. 51, оф. 2" // адресс нахождения офиса
export const PHONE_ONE = `<a href="tel:+79312607792">+7 (931) 260-77-92</a>` // основной телефон
export const TIME_TO_WORK = `<div><p>пн - пт: 09:00 - 18:00</p><p>сб - вс: выходной</p></div>` // время работы