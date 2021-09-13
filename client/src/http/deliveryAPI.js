import axios from 'axios'


export const fetchPochta = async (from, to, weight, pack, date, time, service, dogovor = "", closed = 1) => {

    let url = "https://delivery.pochta.ru/v2/calculate/tariff" // расчёт тарифа
    let urlDelivery = "https://delivery.pochta.ru/v2/calculate/delivery" // расчёт срока доставки

    let json = true

    let object
    object = 27030 // посылка стандарт
    if (!pack) {
        object = 4030 // посылка не стандарт
    }

    object = 23030 // посылка для организаций онлайн обыкновенная
    pack = 0
    
    let params = { json, object, from, to, weight, date, time, errorcode:0 }

    if (service) params = {...params,service}
    if (dogovor !== "") params = {...params,dogovor}
    if (pack) params = {...params,pack}
    if (object === 4030) params = {...params,closed}

    // console.log("params",params);

    let response

    response = await axios.get(url, {params})

    if (response?.data?.errors) return { errors: response.data.errors }

    let tariff = response.data

    // console.log("tariff",tariff);

    response = await axios.get(urlDelivery, {params})
    
    if (response?.data?.errors) return { errors: response.data.errors }

    let delivery = response?.data?.delivery

    // console.log("delivery",delivery);

    return {
        name: tariff?.name,
        transName: tariff?.transname,
        payNds: tariff?.paynds/100, 
        deliveryMin: delivery?.min,
        deliveryMax: delivery?.max
    }

}
