import axios from 'axios'

let API_URL

if (process.env.REACT_APP_ENV === 'production') {
    API_URL = process.env.REACT_APP_API_URL_PRODUCTION
}else if (process.env.REACT_APP_ENV === 'develop') {
    console.log("development mode run")
    API_URL = process.env.REACT_APP_API_URL
}else console.log("NOTE USE CROSS-ENV")


const $host = axios.create({
    baseURL: API_URL
})

const $authHost = axios.create({
    baseURL: API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)


export {
    $host,
    $authHost
}