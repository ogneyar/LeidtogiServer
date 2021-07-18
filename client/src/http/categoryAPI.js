import {$host,$authHost} from './index'

export const createCategory = async (name, sub_category_id = 0) => {
    const {data} = await $authHost.post('api/category', {name, sub_category_id}) 
    return data
}

// export const fetchCategories = async () => {
//     const {data} = await $host.get('api/category')    
//     // return data
//     return data.map(i => i === i ? {...i, sub:[{}]} : i)
// }

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


export const updateCategory = async (id, newName) => {
    const {data} = await $authHost.put('api/category/' + id, {name: newName})
    return data
}