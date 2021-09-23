import { $host, $authHost } from '../index'


export const sdekCalculate = async (body) => {
    // ожидается объект, минимум с тремя параметрами: from_location, to_location, packages 
    // (по умолчанию tariff_code = 139 от Двери до Двери)
    const {data} = await $host.post('api/delivery/sdek/calculate',body)
    return data
}

export const sdekOrder = async (id, body) => {
    // id - номер зарегистрированного пользователя
    // body - ожидается объект, минимум с четырьмя параметрами: recipient, from_location, to_location, packages 
    // (по умолчанию tariff_code = 139 от Двери до Двери)
    const {data} = await $authHost.post('api/delivery/sdek/new_order/' + id, body)
    return data
}