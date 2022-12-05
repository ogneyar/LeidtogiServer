
const axios = require('axios')


async function getPriceFromCMC(coin) {
	
	// 'RUB'='2806' 
	// 'PZM'='1681'
	// 'ETH'='2'   // отключён
	// 'BTC'='1'   // отключён 

	if (coin.toLowerCase() === 'pzm') coin = '1681'
	if (coin.toLowerCase() === 'rub') coin = '2806'
	
	let url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
	url += `?id=${coin}`

	const instance = axios.create({
		headers: {
			'Accepts': 'application/json',
			'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY
		}
	})

	let response
	await instance.get(url)
		.then(res => response = res.data)
		.catch(error => response = error)
	
	if (response && response.data) {
		response = response.data[`${coin}`].quote.USD.price
		// console.log("response", response)
	}

	// return response
	return response

}

module.exports = getPriceFromCMC