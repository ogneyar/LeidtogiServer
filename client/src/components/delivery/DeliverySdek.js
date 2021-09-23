import React, { useEffect, useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { sdekCalculate, sdekOrder } from '../../http/delivery/sdekAPI'
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
    
    const onClickButtonCalculate = async () => {
        let cart
        cart = localStorage.getItem('cart')
        if (cart && index.length === 6) {
            cart = JSON.parse(cart)

            let weight = 0

            cart.forEach(i => {
                weight += (Number(i.value) * Number(i.size.weight))
            })

            weight = weight * 1000
            weight = Math.ceil(weight)

            setInfo({
                total_sum:"", period_min:"", period_max:"", weight_calc:"", currency:"", delivery_sum:""
            })

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

        }else if (index.length < 6) alert("Введите правильный индекс!")
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
                    phones: [
                        {
                            number: "+79998887766"
                        }
                    ]
                },
                from_location: {
                    postal_code: "101000",
                    address: "г.Москва, ул.Садовая, д.26"
                },
                to_location: { 
                    address: user?.user?.address
                },
                packages: [
                    {
                        number: "1", 
                        weight,
                        length: 10,
                        width: 8,
                        height: 6,
                        items: [
                            {
                                name: "Название товара",
                                ware_key: "44552854655",
                                payment: { 
                                    "value": 0
                                },
                                cost: 0,
                                weight,
                                amount: 1, 
                                url: "leidtogi.ru"
                            }
                        ]
                    }
                ]
            })
            if (response?.id) {
                // alert(`Номер вашего заказа: ${response?.id} (uuid=${response?.uuid})`)
                Alert(`Номер вашего заказа: ${response?.id} (uuid=${response?.uuid})`)
            }else {
                // console.log("Неудалось оформить заказ. Ответ сервера: ",response);
                // alert(`Неудалось оформить заказ. Ответ сервера: ${response}`)
                Alert(`Неудалось оформить заказ. Ответ сервера: ${response}`)
            }
        }else {
            // alert(`Для заказа Вам необходимо зарегестрироваться (или войти со своим логином)`)
            Alert(`Для заказа Вам необходимо зарегестрироваться (или войти со своим логином)`)
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
                        style={{"display":user?.user?.id === undefined ? "none" : "block"}}
                        variant="success"
                        onClick={onClickButtonOrder}
                    >
                        Заказать товар с доставкой
                    </Button>
                </div>

            </div>
            
        </div>
    )
})

export default DeliverySdek
