import React, { useEffect, useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import ReactHtmlParser from 'react-html-parser'

import { 
    sdekCalculate, 
    sdekOrder, 
    sdekGetOrder, 
    sdekEditOrder, 
    sdekDeleteOrder, 
    sdekRefusalOrder, 
    sdekNewIntakes,
    sdekPrintOrders,
    sdekGetPrintOrders
} from '../../http/delivery/sdekAPI'

import { Context } from '../..'
import { Alert } from '../myBootstrap'


const DeliverySdek = observer((props) => {
    
    const { user } = useContext(Context)

    useEffect(() => {
        if (user.user.address) {
            let address = user.user.address
            let result = address.match(/\d\d\d\d\d\d/)
            if (result.index !== -1) {
                setIndex(address.substring(result.index, result.index + 6))
            }
        }
    },[user?.user?.address])

    const [tariff, setTariff] = useState("139")

    const [info, setInfo] = useState({
        total_sum:"", period_min:"", period_max:"", weight_calc:"", currency:"", delivery_sum:""
    })
    const [index, setIndex] = useState("")

    const [alertVisible, setAlertVisible] = useState(false)
    const [textAlert, setTextAlert] = useState("")
    
    const onClickButtonCalculate = async () => {
        let cart
        cart = localStorage.getItem('cart')
        if (cart && index.length === 6) {
            cart = JSON.parse(cart)
            let weight = 0
            cart.forEach( i => weight += (Number(i.value) * Number(i.size.weight)) )
            weight = weight * 1000
            weight = Math.ceil(weight)
            setInfo({ total_sum:"", period_min:"", period_max:"", weight_calc:"", currency:"", delivery_sum:"" })
            let indexFrom
            indexFrom = "101000" // Москва
            // indexFrom = "390000" // Рязань
            // indexFrom = "347056" // Углекаменный
            let response = await sdekCalculate({
                tariff_code: tariff,
                from_location: { postal_code: indexFrom }, 
                to_location: { postal_code: index }, 
                packages: [{ weight }] 
            })
            if (response?.error) alert(response.error)
            else setInfo(response)

        }else if (index.length < 6) {
            setTextAlert(`Введите правильный индекс!`)
            setAlertVisible(true)
        }
    }

    const onClickButtonOrder = async () => {
        if (user?.user?.address) {
            let cart, weight
            cart = localStorage.getItem('cart')
            if (cart) {
                cart = JSON.parse(cart)
                weight = 0
                cart.forEach(i => {
                    weight += (Number(i.value) * Number(i.size.weight))
                })
                weight = weight * 1000
                weight = Math.ceil(weight)
            }else return
            let response = await sdekOrder(user?.user?.id, {
                tariff_code: tariff,
                recipient: { 
                    name: "Тестер Петрович",
                    phones: [ { number: "+79998887766" } ]
                },
                from_location: {
                    postal_code: "101000",
                    address: "г.Москва, ул.Садовая, д.26"
                },
                to_location: {  address: user?.user?.address },
                packages: [ {
                    number: "1", weight, length: 10, width: 8, height: 6,
                    items: [ {
                        name: "Название товара", ware_key: "44552854655",
                        payment: {  "value": 0 },
                        cost: 0, weight, amount: 1,  url: "leidtogi.ru"
                    } ]
                } ]
            })
            if (response?.id) {
                localStorage.setItem('id_order',response.id)
                setTextAlert(`Номер вашего заказа: ${response.id} (uuid=${response?.uuid})`)
                setAlertVisible(true)
            }else {
                setTextAlert(`Неудалось оформить заказ. Ответ сервера: ${response}`)
                setAlertVisible(true)
            }
        }else {
            setTextAlert(`Для заказа Вам необходимо зарегестрироваться (или войти со своим логином)`)
            setAlertVisible(true)
        }
    }

    
    const onClickButtonGetOrder = async () => {
        let number = localStorage.getItem('id_order')
        if (number) {
            let response = await sdekGetOrder(number)
            // console.log(response)
            if (response?.entity) {
                setTextAlert(`Данные о заказе: ${JSON.stringify(response?.entity)}`)
                setAlertVisible(true)
            }else if (response?.error) {
                setTextAlert(`Ошибка: ${response?.error}`)
                setAlertVisible(true)
            }else {
                setTextAlert(`Неудалось получить данные о Вашем заказе. Попробуйте позже.`)
                setAlertVisible(true)
            }
        }else {
            setTextAlert(`Заказ номер ${number} не найден.`)
            setAlertVisible(true)
        }
    }
    
    const onClickButtonEditOrder = async () => {
        let number = localStorage.getItem('id_order')
        if (number) {
            let response = await sdekEditOrder(number, {recipient:{name:"НОВОЕ ТЕСТ ИМЯ!"}})
            // console.log(response)
            if (response?.entity) {
                setTextAlert(`Ваш заказ изменён.`)
                setAlertVisible(true)
            }else if (response?.error) {
                setTextAlert(`Ошибка: ${response?.error}`)
                setAlertVisible(true)
            }else {
                setTextAlert(`Неудалось изменить Ваш заказ.`)
                setAlertVisible(true)
            }
        }else {
            setTextAlert(`Заказ номер ${number} не найден.`)
            setAlertVisible(true)
        }
    }
    
    const onClickButtonDeleteOrder = async () => {
        let number = localStorage.getItem('id_order')
        if (number) {
            let response = await sdekDeleteOrder(number)
            // console.log(response)
            if (response?.entity) {
                localStorage.removeItem('id_order')
                setTextAlert(`Ваш заказ удалён.`)
                setAlertVisible(true)
            }else if (response?.error) {
                setTextAlert(`Ошибка: ${response?.error}`)
                setAlertVisible(true)
            }else {
                setTextAlert(`Неудалось удалить Ваш заказ.`)
                setAlertVisible(true)
            }

        }else {
            setTextAlert(`Заказ номер ${number} не найден.`)
            setAlertVisible(true)
        }
    }
    
    const onClickButtonRefusalOrder = async () => {
        let number = localStorage.getItem('id_order')
        if (number) {
            let response = await sdekRefusalOrder(number)

            console.log(response)

            if (response?.entity) {
                setTextAlert(`Ваш заказ помечен как 'отказ'.`)
                setAlertVisible(true)
            }else if (response?.error) {
                setTextAlert(`Ошибка: ${response?.error}`)
                setAlertVisible(true)
            }else {
                setTextAlert(`Неудалось оформить отказ от Вашего заказа.`)
                setAlertVisible(true)
            }

        }else {
            setTextAlert(`Заказ номер ${number} не найден.`)
            setAlertVisible(true)
        }
    }

    const onClickButtonNewIntakes = async () => {
        let number = localStorage.getItem('id_order')
        if (number) {
            let response = await sdekNewIntakes(number, {
                intake_date: "2021-09-28",
                intake_time_from: "09:28",
                intake_time_to: "15:28"
            })
            console.log(response)
            if (response?.entity) {
                setTextAlert(`Регистрация заявки на вызов курьера оформлена. (uuid=${response.entity?.uuid})`)
                setAlertVisible(true)
            }else if (response?.error) {
                setTextAlert(`Ошибка: ${response?.error}`)
                setAlertVisible(true)
            }else {
                setTextAlert(`Неудалось оформить заявку на вызов курьера.`)
                setAlertVisible(true)
            }
        }else {
            setTextAlert(`Заказ номер ${number} не найден.`)
            setAlertVisible(true)
        }
    }
    

    const onClickButtonPrintOrders = async () => {
        let numbers = [localStorage.getItem('id_order') * 1]
        if (numbers[0]) {
            let response = await sdekPrintOrders(numbers, {
                copy_count: 2
            })
            console.log(response)
            // response = await sdekGetPrintOrders(response?.entity?.uuid)
            if (response?.entity) {
                localStorage.setItem('uuid_print',response.entity?.uuid)
                setTextAlert(`Квитанция к заказу оформлена. (uuid = ${response?.entity?.uuid})`)
                setAlertVisible(true)
            }else if (response?.error) {
                let error = response.error?.message || response.error
                setTextAlert(`Ошибка: ${error}`)
                setAlertVisible(true)
            }else {
                setTextAlert(`Неудалось оформить квитанцию к заказу.`)
                setAlertVisible(true)
            }
        }else {
            setTextAlert(`Заказы не найдены.`)
            setAlertVisible(true)
        }
    }
    
    const onClickButtonGetPrintOrders = async () => {

        let uuid = localStorage.getItem('uuid_print')
        if (uuid) {
            let response = await sdekGetPrintOrders(uuid)

            console.log(response)

            if (response?.errors) {
                setTextAlert("Ошибка: " + response.errors)
                setAlertVisible(true)
            }else {

                setTextAlert(`
                <a href="${response}" target="_blank">${uuid}.pdf</a>
                `)
                setAlertVisible(true)
            }
        }else {
            setTextAlert(`Необходимо сначала оформить квитанцию!`)
            setAlertVisible(true)
        }
    }


    return (
        <div className="mt-3 mb-3">
            <div>
                {info?.total_sum
                ?
                    <div className="mt-3 mb-3">
                        <div>Стоимость с НДС:&nbsp;{info.total_sum} р.</div>
                        {info?.period_min 
                        ? 
                            <div>Срок доставки:&nbsp;
                                {info?.period_min === info?.period_max 
                                ? info?.period_min 
                                : 
                                    <>от {info?.period_min} - {info?.period_max}</>
                                } д.</div> 
                        : null}
                        {info?.weight_calc 
                        ? 
                            <div>Общий вес:&nbsp;{info.weight_calc / 1000} кг.</div> 
                        : null}
                    </div>
                :null
                }
                <div className="mb-3">
                    <select className="DeliverySdekTariff"
                        value={tariff} 
                        onChange={e => setTariff(e.target.value)}
                    >
                        <option value="139">Доставка до Двери</option>
                        <option value="138">До склада СДЭК</option>
                        <option value="ххх" disabled>Доставка курьером</option>
                    </select>
                </div>

                <div className="d-flex flex-row align-items-center flex-wrap pb-2">
                    
                    <label className="mr-2">Ваш индекс: </label>
                    <Form.Control 
                        value={index}
                        style={{width:"120px"}}
                        maxLength="6"
                        type="number"
                        onChange={e => setIndex(e.target.value)}
                        className='mb-2' 
                        placeholder="Индекс" 
                    />
                    <label className="ml-2">{info?.adName}</label>
                    
                </div>

                <div className="d-flex flex-row align-items-end justify-content-between flex-wrap">
                    <Button
                        variant="outline-primary"
                        onClick={onClickButtonCalculate}
                    >
                        Расчитать доставку
                    </Button>
                    <Button
                        style={{"display":(user?.user?.id === undefined || user?.user?.id !== 1) ? "none" : "block"}}
                        variant="success"
                        onClick={onClickButtonOrder}
                    >
                        Заказать товар с доставкой
                    </Button>
                </div>
                
                
                <div 
                    style={{"display":(user?.user?.id === undefined || user?.user?.id !== 1) ? "none" : "block"}}
                >

                    <hr />

                    <div 
                        className="mt-3 d-flex flex-row align-items-end justify-content-between flex-wrap"
                    >
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonGetOrder}
                        >
                            Инфо о заказе
                        </Button>
                        <Button
                            variant="success"
                            onClick={onClickButtonEditOrder}
                        >
                            Изменить заказ
                        </Button>
                    </div>

                    <div
                        className="mt-3 d-flex flex-row align-items-end justify-content-between flex-wrap"
                    >
                        <Button
                            variant="warning"
                            onClick={onClickButtonRefusalOrder}
                        >
                            Отказ от заказа
                        </Button>
                        <Button
                            variant="danger"
                            onClick={onClickButtonDeleteOrder}
                        >
                            Удалить заказ
                        </Button>
                    </div>

                    <hr />

                    <div 
                        className="mt-3 d-flex flex-row align-items-end justify-content-between flex-wrap"
                    >
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonNewIntakes}
                        >
                            Заявка на вызов курьера
                        </Button>
                        <div />
                    </div>

                    <hr />

                    <div 
                        className="mt-3 d-flex flex-row align-items-end justify-content-between flex-wrap"
                    >
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonPrintOrders}
                        >
                            Формирование квитанции
                        </Button>
                        <Button
                            variant="primary"
                            onClick={onClickButtonGetPrintOrders}
                        >
                            Получение квитанции
                        </Button>
                    </div>

                </div>

            </div>

            <Alert 
                show={alertVisible} 
                onHide={() => {
                    setAlertVisible(false)
                    setTextAlert("")
                }}
            >
                {ReactHtmlParser(textAlert)}
            </Alert>
        </div>
    )
})

export default DeliverySdek
