// eslint-disable-next-line
import { $host, $authHost } from './index'


export const createOrder = async (props) => {
    const {data} = await $host.post('api/order', props) 
    return data  
}

export const getOrder = async (id) => {
    const {data} = await $host.get('api/order/' + id) 
    return data  
}
