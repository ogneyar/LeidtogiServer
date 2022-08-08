// class="owl-wrapper"


let https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')
let sharp
if (process.env.URL !== "https://api.leidtogi.site") sharp = require('sharp')
const createFoldersAndDeleteOldFiles = require('../../../createFoldersAndDeleteOldFiles')
const parseHtml = require("../../../html/parseHtml")


async function getFiles(html, article) {
    
    let response
    let brand = "euroboor"
    let arrayImages = []
    
    response = parseHtml(html, {
        entry: `class="image thumbnails-one all-carousel"`,
        start: `<a href="`,
        end: `"`,
        inclusive: false
    })

    arrayImages.push(response)

    // let i = 1, value = 0
    // while (arrayImages.length < 4 && value < 4) {
    //     switch(i) {
    //         case 1:
    //             if (response.includes("-1-")) {
    //                 response = response.replace(/(-1-)/g, `-2-`)
    //                 arrayImages.push(response)
    //                 i = 2
    //                 break
    //             }else {
    //                 value++
    //             }
    //         case 2:
    //             if (response.includes("-2-")) {
    //                 response = response.replace(/(-2-)/g, `-3-`)
    //                 arrayImages.push(response)
    //                 i = 3
    //                 break
    //             }else {
    //                 value++
    //             }
    //         case 3:
    //             if (response.includes("-3-")) {
    //                 response = response.replace(/(-3-)/g, `-`)
    //                 arrayImages.push(response)
    //                 i = 4
    //                 break
    //             }else {
    //                 value++
    //             }
    //         case 4:
    //             if ( ! response.includes("-1-") && ! response.includes("-2-") && ! response.includes("-3-")) {
    //                 if (response.includes("-1000")) {
    //                     response = response.replace(/(-1000)/g, `-1-1000`)
    //                     arrayImages.push(response)
    //                     i = 1
    //                     break
    //                 }
    //             }else {
    //                 value++
    //             }
    //         default: break
    //     }
        
    //     if (i === 4) i = 1
    // }

    response = [] // обнулил ответ

    createFoldersAndDeleteOldFiles(brand, article)

    arrayImages.forEach(async(i, index) => {

        let url, fileName, filePathBig, filePathSmall, fileBig, fileSmall

        url = i
        
        fileName = index+1 + '.jpg'
        
        filePathBig = brand + '/' + article + '/big/' + fileName
        filePathSmall = brand + '/' + article + '/small/' + fileName

        
        if ( ! url.includes("https")) {
            https = http
        }

        // let promise = new Promise((resolve, reject) => {
          
            https.get(url, (res) => {
                if (res.statusCode == 200) {
                    fileBig = fs.createWriteStream(path.resolve(__dirname, '../../../..', 'static', brand, article, 'big', fileName))
                    fileSmall = fs.createWriteStream(path.resolve(__dirname, '../../../..', 'static', brand, article, 'small', fileName))
                    res.pipe(fileBig)
                    if (process.env.URL !== "https://api.leidtogi.site") res.pipe(sharp().resize(100)).pipe(fileSmall)
                    else res.pipe(fileSmall)

                    // resolve("success")

                }
                // else reject("error")
            }).on('error', (e) => {
                console.error(e)
                // reject("error")
            })
        // })

        // await promise.then(() => {
        //     console.log("success :)");
        //     response = [...response, {"big": filePathBig,"small": filePathSmall}]
        //     console.log(JSON.stringify(response));
        // }, () => {
        //     console.log("error (:");
        // })

        response = [...response, {"big": filePathBig,"small": filePathSmall}]
        
    })

    if ( ! response[0] || (response[0] && response[0].big === undefined)) response = [{}]

    return JSON.stringify(response)
}

module.exports = getFiles


/*
<div class="owl-wrapper" style="width: 872px; left: 0px; display: block;">

    <div class="owl-item" style="width: 109px;">
        <a href="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-2-1000x1000.jpg" title="Универсальный адаптер для труб Euroboor PAK.250" data-fancybox="images" data-index="0" data-main-img="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-2-720x720.jpg" data-main-popup="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-2-1000x1000.jpg" class="cloud-zoom-gallery selected-thumb" data-rel="useZoom: 'mainimage', smallImage: 'https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-2-720x720.jpg'">
            <img src="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-2-200x200.jpg" data-index="0" title="Универсальный адаптер для труб Euroboor PAK.250" alt="Универсальный адаптер для труб Euroboor PAK.250">
        </a>
    </div>
    
    <div class="owl-item" style="width: 109px;">
        <a href="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-1000x1000.jpg" title="Универсальный адаптер для труб Euroboor PAK.250" data-fancybox="images" data-index="1" data-main-img="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-720x720.jpg" data-main-popup="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-1000x1000.jpg" class="cloud-zoom-gallery " data-rel="useZoom: 'mainimage', smallImage: 'https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-720x720.jpg'">
            <img src="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-200x200.jpg" data-index="1" title="Универсальный адаптер для труб Euroboor PAK.250" alt="Универсальный адаптер для труб Euroboor PAK.250">
        </a>
    </div>
    
    <div class="owl-item" style="width: 109px;">
        <a href="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-1-1000x1000.jpg" title="Универсальный адаптер для труб Euroboor PAK.250" data-fancybox="images" data-index="2" data-main-img="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-1-720x720.jpg" data-main-popup="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-1-1000x1000.jpg" class="cloud-zoom-gallery " data-rel="useZoom: 'mainimage', smallImage: 'https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-1-720x720.jpg'">
            <img src="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-1-200x200.jpg" data-index="2" title="Универсальный адаптер для труб Euroboor PAK.250" alt="Универсальный адаптер для труб Euroboor PAK.250">
        </a>
    </div>
    
    <div class="owl-item" style="width: 109px;">
        <a href="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-3-1000x1000.jpg" title="Универсальный адаптер для труб Euroboor PAK.250" data-fancybox="images" data-index="3" data-main-img="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-3-720x720.jpg" data-main-popup="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-3-1000x1000.jpg" class="cloud-zoom-gallery " data-rel="useZoom: 'mainimage', smallImage: 'https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-3-720x720.jpg'">
            <img src="https://euroboor-rus.ru/image/cache/catalog/raznoe/pak.250-3-200x200.jpg" data-index="3" title="Универсальный адаптер для труб Euroboor PAK.250" alt="Универсальный адаптер для труб Euroboor PAK.250">
        </a>
    </div>

</div>
*/