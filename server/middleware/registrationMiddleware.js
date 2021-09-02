const ApiError = require('../error/apiError')


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    const {
        surname, 
        name,
        patronymic,
        phone,
        email,
        address,
        password,
        role,
        isActivated,
        activationLink,

        companyName,
        INN,
        KPP,
        OGRN,
        OKVED,
        juridicalAddress,
        bank,
        BIK,
        corAccount,
        payAccount,
        post
    } = req.body

    try { 
        // проверка фамилии
        if (!surname) {
            return next(ApiError.badRequest('Отсутствует фамилия!'))
        }
        if (surname.length < 2) {
            return next(ApiError.badRequest('Слишком короткая фамилия!'))
        }
        if (surname.length > 255) {
            return next(ApiError.badRequest('Слишком длинная фамилия!'))
        }
        // проверка имени
        if (!name) {
            return next(ApiError.badRequest('Отсутствует имя!'))
        }
        if (name.length < 2) {
            return next(ApiError.badRequest('Слишком короткое имя!'))
        }
        if (name.length > 255) {
            return next(ApiError.badRequest('Слишком длинное имя!'))
        }
        // проверка номера телефона
        if (!phone) {
            return next(ApiError.badRequest('Отсутствует номер телефона!'))
        }
        if (!Number(phone)) {
            return next(ApiError.badRequest('Некорректный ввод номера телефона!'))
        }
        if (phone.length < 11) {
            return next(ApiError.badRequest('Слишком короткий номера телефона!'))
        }
        if (phone.length > 11) {
            return next(ApiError.badRequest('Слишком длинный номера телефона!'))
        }
        // проверка email
        if (!email) {
            return next(ApiError.badRequest('Отсутствует email!'))
        }
        if (!email.includes("@") || !email.includes(".")) { // если нет @ или .
            return next(ApiError.badRequest('Некорректный ввод email!'))
        }
        if (email.indexOf("@") === 0 || email.indexOf("@") === email.length - 1) { // если @ в начале или в конце строки
            return next(ApiError.badRequest('Некорректный ввод email!'))
        }
        if (email.indexOf(".") === 0 || email.indexOf(".") === email.length - 1) { // если . в начале или в конце строки
            return next(ApiError.badRequest('Некорректный ввод email!'))
        }
        let number = email.indexOf("@")
        let string = email.substring(number + 1, email.length)
        if (string.indexOf(".") < 1) { // если между @ и . нет символов или они поменяны местами
            return next(ApiError.badRequest('Некорректный ввод email!'))
        }
        if (email.length < 5) {
            return next(ApiError.badRequest('Слишком короткий email!'))
        }
        if (email.length > 255) {
            return next(ApiError.badRequest('Слишком длинный email!'))
        }
        // проверка адреса
        if (!address) {
            return next(ApiError.badRequest('Отсутствует адресная строка!'))
        }
        if (address.length > 1024) {
            return next(ApiError.badRequest('Слишком длинная адресная строка!'))
        }
        if (address.length < 10) {
            return next(ApiError.badRequest('Слишком короткая адресная строка!'))
        }
        // проверка пароля
        if (!password) {
            return next(ApiError.badRequest('Отсутствует пароль!'))
        }
        if (password.length > 255) {
            return next(ApiError.badRequest('Слишком длинный пароль!'))
        }
        if (password.length < 4) {
            return next(ApiError.badRequest('Слишком короткий пароль!'))
        }

        if (role === "CORP") {
            // проверка наименования организации
            if (!companyName) {
                return next(ApiError.badRequest('Отсутствует наименование организации!'))
            }
            if (companyName.length > 255) {
                return next(ApiError.badRequest('Слишком длинное наименование организации!'))
            }
            if (companyName.length < 4) {
                return next(ApiError.badRequest('Слишком короткое наименование организации!'))
            }
            // проверка ИНН
            if (!INN) {
                return next(ApiError.badRequest('Отсутствует ИНН!'))
            }
            if (!Number(INN)) {
                return next(ApiError.badRequest('Некорректный ввод ИНН!'))
            }
            if (INN.length > 10) {
                return next(ApiError.badRequest('Слишком длинный ИНН!'))
            }
            if (INN.length < 10) {
                return next(ApiError.badRequest('Слишком короткий ИНН!'))
            }
            // проверка кода причины постановки 
            if (!KPP) {
                return next(ApiError.badRequest('Отсутствует КПП!'))
            }
            if (!Number(KPP)) {
                return next(ApiError.badRequest('Некорректный ввод КПП!'))
            }
            if (KPP.length > 9) {
                return next(ApiError.badRequest('Слишком длинный КПП!'))
            }
            if (KPP.length < 9) {
                return next(ApiError.badRequest('Слишком короткий КПП!'))
            }
            // проверка основного государственного регистрационного номера (необязательный параметр)
            if (OGRN) {
                if (!Number(OGRN)) {
                    return next(ApiError.badRequest('Некорректный ввод ОГРН!'))
                }
                if (OGRN.length > 15) {
                    return next(ApiError.badRequest('Слишком длинный ОГРН!'))
                }
                if (OGRN.length < 13) {
                    return next(ApiError.badRequest('Слишком короткий ОГРН!'))
                }
            }
            // проверка общероссийского классификатора видов экономической деятельности (необязательный параметр)
            if (OKVED) {
                if (!Number(OKVED)) {
                    return next(ApiError.badRequest('Некорректный ввод ОКВЭД!'))
                }
                if (OKVED.length > 6) {
                    return next(ApiError.badRequest('Слишком длинный ОКВЭД!'))
                }
                if (OKVED.length < 6) {
                    return next(ApiError.badRequest('Слишком короткий ОКВЭД!'))
                }
            }
            // проверка юридического адреса
            if (!juridicalAddress) {
                return next(ApiError.badRequest('Отсутствует юридический адрес!'))
            }
            if (juridicalAddress.length > 1024) {
                return next(ApiError.badRequest('Слишком длинный юридический адрес!'))
            }
            if (juridicalAddress.length < 10) {
                return next(ApiError.badRequest('Слишком короткий юридический адрес!'))
            }
            // проверка наименования банка
            if (!bank) {
                return next(ApiError.badRequest('Отсутствует наименование банка!'))
            }
            if (bank.length > 255) {
                return next(ApiError.badRequest('Слишком длинноенаименование банка!'))
            }
            if (bank.length < 3) {
                return next(ApiError.badRequest('Слишком короткое наименование банка!'))
            }
            // проверка банковского идентификационного кода
            if (!BIK) {
                return next(ApiError.badRequest('Отсутствует БИК!'))
            }
            if (!Number(BIK)) {
                return next(ApiError.badRequest('Некорректный ввод БИК!'))
            }
            if (BIK.length > 9) {
                return next(ApiError.badRequest('Слишком длинный БИК!'))
            }
            if (BIK.length < 9) {
                return next(ApiError.badRequest('Слишком короткий БИК!'))
            }
            // проверка корреспондентского счёта
            if (!corAccount) {
                return next(ApiError.badRequest('Отсутствует корреспондентский счёт!'))
            }
            if (!Number(corAccount)) {
                return next(ApiError.badRequest('Некорректный ввод корреспондентского счёта!'))
            }
            if (corAccount.length > 20) {
                return next(ApiError.badRequest('Слишком длинный корреспондентский счёт!'))
            }
            if (corAccount.length < 20) {
                return next(ApiError.badRequest('Слишком короткий корреспондентский счёт!'))
            }
            // проверка расчётного счёта
            if (!payAccount) {
                return next(ApiError.badRequest('Отсутствует расчётный счёт!'))
            }
            if (!Number(payAccount)) {
                return next(ApiError.badRequest('Некорректный ввод расчётного счёта!'))
            }
            if (payAccount.length > 20) {
                return next(ApiError.badRequest('Слишком длинный расчётный счёт!'))
            }
            if (payAccount.length < 20) {
                return next(ApiError.badRequest('Слишком короткий расчётный счёт!'))
            }
            // проверка должности
            if (!post) {
                return next(ApiError.badRequest('Отсутствует строка должности!'))
            }
            if (post.length > 255) {
                return next(ApiError.badRequest('Слишком длинная строка должности!'))
            }
            if (post.length < 4) {
                return next(ApiError.badRequest('Слишком короткая строка должности!'))
            }
        }

        next()
    }catch (e) {
        return next(ApiError.badRequest('Ошибка регистрации!'))
    }
}