import { $host, $authHost } from './index'


export const fetchParserImages = async (brand, article) => {
    const {data} = await $authHost.get('api/parser/images', {params: {
        brand, article
    }})
    return data
}

export const fetchParserSizes = async (article) => {
    const {data} = await $authHost.get('api/parser/sizes', {params: {
        article
    }})
    return data
}

export const fetchParserAll = async (brand, article) => {
    const {data} = await $authHost.get('api/parser/all', {params: {
        brand, article
    }})
    return data
}