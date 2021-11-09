import {$host,$authHost} from './index'


export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProducts = async (categoryId, brandId, page, limit) => {
    const {data} = await $host.get('api/product', {params: {
        categoryId, brandId, page, limit
    }})    
    return data.map(i => { 
        let img
        try {
            img = JSON.parse(i.img)
        }catch(e) {
            img = [{}]
        }
        return {...i, img} 
    })
}

export const fetchAllProducts = async () => {
    const {data} = await $host.get('api/product', {params: {
        limit: "-1"
    }})
    return data.map(i => { 
        let img
        try {
            img = JSON.parse(i.img)
        }catch(e) {
            img = [{}]
        }
        return {...i, img} 
    })
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    let img
    try {
        img = JSON.parse(data.img)
    }catch(e) {
        img = [{}]
    }
    return {...data, img}
}

export const fetchProductInfos = async (id) => {
    const {data} = await $host.get('api/product/info/' + id)
    return data
}

export const fetchProductSizes = async (id) => {
    const {data} = await $host.get('api/product/size/' + id)
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

export const updateProductOnArticle = async (article, body) => {
    const {data} = await $authHost.put('api/product/edit_on_article/' + article, body)
    return data
}

export const updateProductSizes = async (id, body) => {
    const {data} = await $authHost.put('api/product/edit_sizes/' + id, body)
    return data
}

export const updateAllProduct = async (id, body) => {   
    const {data} = await $authHost.put('api/product/edit_all/' + id, body)
    return data
}

export const updateRatingProduct = async (id, rating) => {
    const {data} = await $authHost.put('api/product/rating/' + id, {rating})
    return data
}