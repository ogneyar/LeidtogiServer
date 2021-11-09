import {$host,$authHost} from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (body) => {
    const {data} = await $host.post('api/user/registration', body)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const logout = async () => {
    localStorage.removeItem('token')
    const {data} = await $host.post('api/user/logout')
    return data
}

export const auth = async () => {
    // const {data}  = await $authHost.get('api/user/auth') 
    const {data}  = await $authHost.get('api/user/refresh') 
    if (data?.token) {
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }else {
        return data?.message
    }
}

export const getUserInfo = async () => {
    const {data}  = await $authHost.get('api/user/info')
    return data
}

export const updateUser = async (id, body) => {
    const {data}  = await $authHost.put('api/user/update/'+ id, body)
    return data
}

export const activate = async (id, link) => {
    const {data}  = await $authHost.get('api/user/activate/'+ link, {id})
    return data
}


