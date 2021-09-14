import React, { useState } from 'react'
import DeliveryPochta from './DeliveryPochta'
import DeliverySdek from './DeliverySdek'
import DeliveryBusinessLines from './DeliveryBusinessLines'
import DeliveryPek from './DeliveryPek'
import DeliveryBoxberry from './DeliveryBoxberry'

import './Delivery.css'


export default function Delivery(props) {

    const [delivery, setDelivery] = useState("pochta")

    return (
        <div 
            className="Delivery"
        >

            <header className="DeliveryHeader">
                <h4>Расчёт доставки&nbsp;
                    {delivery === "pochta" && `"Почтой России"`}
                    {delivery === "sdek" && `"Службой Доставки Экспресс Курьер"`}
                    {delivery === "businessLines" && `"Деловыми Линиями"`}
                    {delivery === "pek" && `"Первой Экспедиционной Компанией"`}
                    {delivery === "boxberry" && `"Боксберри"`}
                </h4>
            </header>

            <div
                className="DeliveryChoise"
            >
                <button
                    className={delivery === "pochta"  ? "DeliveryActionButton" : "DeliveryButton"}
                    disabled={delivery === "pochta"}
                    onClick={() => setDelivery("pochta")}
                >
                    Почта России
                </button>
                <button
                    className={delivery === "sdek" ? "DeliveryActionButton" : "DeliveryButton"}
                    disabled={delivery === "sdek"}
                    onClick={() => setDelivery("sdek")}
                >
                    СДЭК
                </button>
                <button
                    className={delivery === "businessLines" ? "DeliveryActionButton" : "DeliveryButton"}
                    disabled={delivery === "businessLines"}
                    onClick={() => setDelivery("businessLines")}
                >
                    Деловые Линии
                </button>
                <button
                    className={delivery === "pek" ? "DeliveryActionButton" : "DeliveryButton"}
                    disabled={delivery === "pek"}
                    onClick={() => setDelivery("pek")}
                >
                    ПЭК
                </button>
                <button
                    className={delivery === "boxberry" ? "DeliveryActionButton" : "DeliveryButton"}
                    disabled={delivery === "boxberry"}
                    onClick={() => setDelivery("boxberry")}
                >
                    Боксберри
                </button>
            </div>

            <div
                className="DeliveryCalculation"
            >
                {delivery === "pochta" 
                ? 
                    <DeliveryPochta />
                : null}

                {delivery === "sdek" 
                ? 
                    <DeliverySdek />
                : null}

                {delivery === "businessLines" 
                ? 
                    <DeliveryBusinessLines />
                : null}

                {delivery === "pek" 
                ? 
                    <DeliveryPek />
                : null}

                {delivery === "boxberry" 
                ? 
                    <DeliveryBoxberry />
                : null}
            </div>

        </div>
    )
}
