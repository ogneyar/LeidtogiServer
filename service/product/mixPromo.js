
function mixPromo(data) {

    let startOne = Math.floor( 0 + Math.random() * (2 + 1 - 0) )
    let start = startOne
    
    for (let i = 0; i < data.length; i++) {
        if (data[i].promo) {
            if (JSON.parse(data[i].promo).old_price !== undefined) {
                if (startOne === 0) {
                    [data[i], data[startOne + 1]] = [data[startOne + 1], data[i]]
                }else {
                    [data[i], data[startOne - 1]] = [data[startOne - 1], data[i]]
                }
            }else {
                [data[i], data[start]] = [data[start], data[i]]
                if ((start+1) % 3 === 0) 
                    start += 1
                else 
                    start += 4
            }
        }
    }

}

module.exports = mixPromo