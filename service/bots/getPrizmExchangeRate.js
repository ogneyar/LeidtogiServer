
const getMessagePriceFromFile = require("./coinMarketCap/getMessagePriceFromFile")
const getPriceFromCMC = require("./coinMarketCap/getPriceFromCMC")
const setMessagePriceToFile = require("./coinMarketCap/setMessagePriceToFile")


async function getPrizmExchangeRate() {
    
    let message = await getMessagePriceFromFile()

    if (! message) {
        
        let priceRUB_in_USD = await getPriceFromCMC('RUB')
        let pricePZM_in_USD = await getPriceFromCMC('PZM')
        
        let pricePZM_in_RUB = 1 / priceRUB_in_USD * pricePZM_in_USD
        let date = new Date()
        let milliseconds = date.getTime() // время в милисекундах
        // let unixdate = Math.floor(milliseconds / 1000) // время в секундах

        let datePZM
        let day = date.getDate() // день
        if (day < 10) datePZM = `0${day}.`
        else datePZM = day + "."
        let month = date.getMonth() + 1
        if (month < 10) datePZM += `0${month}.`
        else datePZM += month + "."
        let year = date.getFullYear()
        datePZM += year + " "
        let hours = date.getHours()
        if (hours < 10) datePZM += `0${hours}:`
        else datePZM += hours + ":"
        let minutes = date.getMinutes()
        if (minutes < 10) datePZM += `0${minutes}`
        else datePZM += minutes
        // date.getSeconds()
        
        if (pricePZM_in_USD && pricePZM_in_RUB) {

            message = "Курс PRIZM на [CoinMarketCap](https://coinmarketcap.com/ru/currencies/prizm/)\n\n\t\t" + 
                "1PZM = " + pricePZM_in_USD.toFixed(4) + " $\n\t\t" + 
                "1PZM = " + pricePZM_in_RUB.toFixed(4) + " ₽\n\n" +
                "на " + datePZM + " МСК"
                
            setMessagePriceToFile(milliseconds, message)
            
        }
                
    }

    if (! message) message = "Нет информации.\n\nПовторите запрос, если ошибка появится снова обратитесь в тех.поддержку.\n\nТех. поддержка - @Prizm\_market\_supportbot"


    return message

}

module.exports = getPrizmExchangeRate
