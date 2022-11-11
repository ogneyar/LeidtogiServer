
// добавление товаров без изображений в конец списка
function sortProductsWithOutImage(data) {

    let withImage = data.filter(i => {
		if (i.img === "[{}]" || i.img === "[]" || i.img === "") return false
		let img
		if (typeof(i.img) === "string") {
			try {
				img = JSON.parse(i.img)
			}catch(e) {
				console.log(i)
				img = []
			}
		}
		if (img[0] && img[0].big !== undefined) return true
		return false
	})
    let withOutImage = data.filter(i => {
		if (i.img === "[{}]" || i.img === "[]" || i.img === "") return true
		let img
		if (typeof(i.img) === "string") {
			try {
				img = JSON.parse(i.img)
			}catch(e) {
				console.log(i)
				img = []
			}
		}
		if (img[0] && img[0].big !== undefined) return false
		return true
	})

    data = [ ...withImage, ...withOutImage ]
    
}

module.exports = sortProductsWithOutImage