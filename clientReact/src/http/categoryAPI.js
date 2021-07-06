import {$host,$authHost} from './index'

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
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
