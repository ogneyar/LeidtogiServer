const path = require('path')
const fs = require('fs')


module.exports = function (brand,article) {
    try {
        let files
        const dir = fs.readdirSync(path.resolve(__dirname, '..', 'static', brand, article))

        if (dir) {
            try {
                files = fs.readdirSync(path.resolve(__dirname, '..', 'static', brand, article, 'big'))  
                if (files) {             
                    files.forEach(i => {
                        try {
                            fs.unlinkSync(path.resolve(__dirname, '..', 'static', brand, article, 'big', i))
                        }catch(e) {
                            console.log(`Удаляемый файл ${i} не найден.`);
                        }
                    })
                }
            }catch(e) {
                try {
                    fs.mkdirSync(path.resolve(__dirname, '..', 'static', brand, article, 'big'))
                }catch(e) {
                    console.log(`Создать папку big не удалось.`);
                }
            }
        
            try {
                files = fs.readdirSync(path.resolve(__dirname, '..', 'static', brand, article, 'small'))
                if (files) {
                    files.forEach(i => {
                        try {
                            fs.unlinkSync(path.resolve(__dirname, '..', 'static', brand, article, 'small', i))
                        }catch(e) {
                            console.log(`Удаляемый файл ${i} не найден.`);
                        }
                    })
                }
            }catch(e) {
                try {
                    fs.mkdirSync(path.resolve(__dirname, '..', 'static', brand, article, 'small'))
                }catch(e) {
                    console.log(`Создать папку small не удалось.`);
                }
            }
        }else {
            try {
                fs.mkdirSync(path.resolve(__dirname, '..', 'static', brand, article, 'big'))
            }catch(e) {
                console.log(`Создать папку big не удалось.`);
            }
            try {
                fs.mkdirSync(path.resolve(__dirname, '..', 'static', brand, article, 'small'))
            }catch(e) {
                console.log(`Создать папку small не удалось.`);
            }
        }
        
    } catch (error) {
        console.error(error)
    }
}