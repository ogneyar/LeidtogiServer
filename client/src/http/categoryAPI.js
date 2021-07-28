import {$host,$authHost} from './index'

export const createCategory = async (name, sub_category_id = 0) => {
    const {data} = await $authHost.post('api/category', {name, sub_category_id}) 
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
    const {data} = await $authHost.put('api/category/' + id, body)
    return data
}