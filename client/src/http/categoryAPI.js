import {$host,$authHost} from './index'

export const createCategory = async (value) => {
    const {data} = await $authHost.post('api/category', {name: value})
    return data
}

export const fetchCategoryes = async () => {
    const {data} = await $host.get('api/category')
    return data
}

export const fetchSubCategoryes = async (id) => {
    const {data} = await $host.get('api/category/sub/' + id)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete('api/category/' + id)
    return data
}


export const updateCategory = async (id, newName) => {
    const {data} = await $authHost.put('api/category/' + id, {name: newName})
    return data
}