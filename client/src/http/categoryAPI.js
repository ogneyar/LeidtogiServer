import {$host,$authHost} from './index'
import translite from '../utils/translite'


export const createCategory = async (name, sub_category_id = 0) => {
    let url = translite(name)
    const {data} = await $authHost.post('api/category', {name, url, sub_category_id}) 
    return data  
}

export const fetchAllCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}

export const fetchCategories = async (sub_id = 0) => {
    const {data} = await $host.get('api/category/' + sub_id)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete('api/category/' + id)
    return data
}

export const updateCategory = async (id, body) => {
    if (body.name) body = {...body, url:translite(body.name)}
    const {data} = await $authHost.put('api/category/' + id, body)
    return data
}