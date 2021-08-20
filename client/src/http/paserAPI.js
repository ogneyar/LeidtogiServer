import { $host, $authHost } from './index'


export const fetchParserImages = async (brand, article) => {
    const {data} = await $authHost.post('api/parser', {brand, article})
    return data
}
