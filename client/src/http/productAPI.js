import {$host,$authHost} from './index'


export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProducts = async (categoryId, brandId, page, limit) => {
    const {data} = await $host.get('api/product', {params: {
        categoryId, brandId, page, limit
    }})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $authHost.delete('api/product/' + id)
    return data
}

export const updateProduct = async (id, body) => {
    const {data} = await $authHost.put('api/product/edit/' + id, body)
    return data
}

export const updateRatingProduct = async (id, rating) => {
    const {data} = await $authHost.put('api/product/rating/' + id, {rating})
    return data
}