import axios from 'axios'
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

export const fetchParserMailRu = async (email) => {
    const {data} = await $host.get('api/parser/mail.ru', {params: {email}})
    return data
}