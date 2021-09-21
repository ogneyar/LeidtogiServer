
module.exports = class Location {
    address

    // необязательные поля
    code = undefined // Код населенного пункта СДЭК
    fias_guid = undefined // Уникальный идентификатор ФИАС
    postal_code = undefined // Почтовый индекс
    longitude = undefined // Долгота
    latitude = undefined // Широта
    country_code = undefined // Код страны в формате  ISO_3166-1_alpha-2
    region = undefined // Название региона
    region_code = undefined // Код региона СДЭК
    sub_region = undefined // Название района региона
    city = undefined // Название города
    kladr_code = undefined // Код КЛАДР
    // Устаревшее поле


    constructor(data) {
        this.address = data.address

        if (data.code !== undefined) this.code = data.code
        if (data.fias_guid !== undefined) this.fias_guid = data.fias_guid
        if (data.postal_code !== undefined) this.postal_code = data.postal_code
        if (data.longitude !== undefined) this.longitude = data.longitude
        if (data.latitude !== undefined) this.latitude = data.latitude
        if (data.country_code !== undefined) this.country_code = data.country_code
        if (data.region !== undefined) this.region = data.region
        if (data.region_code !== undefined) this.region_code = data.region_code
        if (data.sub_region !== undefined) this.sub_region = data.sub_region
        if (data.city !== undefined) this.city = data.city
        if (data.kladr_code !== undefined) this.kladr_code = data.kladr_code
    }
}

