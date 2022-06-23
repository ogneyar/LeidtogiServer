
// добавление товаров без изображений в конец списка
function sortProductsWithOutImage(data) {

    let withImage = data.filter(i => {
		if (i.img === "[{}]") return false
		let img
		if (typeof(i.img) === "string") img = JSON.parse(i.img)
		if (img[0] && img[0].big !== undefined) return true
		return false
	})
    let withOutImage = data.filter(i => {
		if (i.img === "[{}]") return true
		let img
		if (typeof(i.img) === "string") img = JSON.parse(i.img)
		if (img[0] && img[0].big !== undefined) return false
		return true
	})

    return [ ...withImage, ...withOutImage ]
    
}

module.exports = sortProductsWithOutImage