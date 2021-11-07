// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

import { createOrder } from '../../http/orderAPI'
import './Payment.css'


const Payment = (props) => {
    
    // const [ state, setState ] = useState(true)
    const [ orderNumber, setOrderNumber ] = useState(0)
    // const [ email, setEmail ] = useState("")

    function functionOnScroll() {
        let alfaPaymentButton = document.getElementById("alfa-payment-button")
        let boxForButton = document.getElementById("boxForButtonAlfaBank")
        if (boxForButton) {
            let bound = boxForButton.getBoundingClientRect()
            alfaPaymentButton.style.top = bound.top + "px"
            alfaPaymentButton.style.left = bound.left + "px"
        }else {
            alfaPaymentButton.style.display = "none"
            document.removeEventListener("scroll", functionOnScroll)
        }
    }

    // function functionOnClick() {
    //     let alfaPaymentButton = document.getElementById("alfa-payment-button")
    //     alfaPaymentButton.style.zIndex = 8000;
    // }

    useEffect(() => {
        let alfaPaymentButton = document.getElementById("alfa-payment-button")
        alfaPaymentButton.setAttribute("data-order-number", orderNumber)
    },[orderNumber])

    useEffect(() => {
        // setEmail(props?.email)
        let cart = localStorage.getItem("cart")
        // let number
        createOrder({cart,email:props?.email}).then(data => {
            // number = data?.id
            setOrderNumber(data?.id)
        })
        let alfaPaymentButton = document.getElementById("alfa-payment-button")
        // alfaPaymentButton.addEventListener("click", functionOnClick)
        alfaPaymentButton.setAttribute("data-token", "a3rd28arc978uabudoqr0c164h")
        if (process.env.REACT_APP_ENV === "production") {
            alfaPaymentButton.setAttribute("data-return-url", process.env.REACT_APP_URL_PRODUCTION + "success")
            alfaPaymentButton.setAttribute("data-fail-url", process.env.REACT_APP_URL_PRODUCTION + "error")
        }else {
            alfaPaymentButton.setAttribute("data-return-url", process.env.REACT_APP_URL + "success")
            alfaPaymentButton.setAttribute("data-fail-url", process.env.REACT_APP_URL + "error")
        }
        alfaPaymentButton.setAttribute("data-redirect", "true")
        alfaPaymentButton.setAttribute("data-language", "ru")
        alfaPaymentButton.setAttribute("data-stages", "1")
        alfaPaymentButton.setAttribute("data-amount-format", "rubli")
        // alfaPaymentButton.setAttribute("data-amount-selector", ".amount")
        alfaPaymentButton.setAttribute("data-amount", props?.amount)
        // alfaPaymentButton.setAttribute("data-order-number-selector", ".order")
        if (orderNumber) alfaPaymentButton.setAttribute("data-order-number", orderNumber)
        // alfaPaymentButton.setAttribute("data-description-selector", ".description")
        alfaPaymentButton.setAttribute("data-description", "Товар с сайта leidtogi.ru")
        alfaPaymentButton.setAttribute("data-button-text", "Оплатить картой")
        // alfaPaymentButton.setAttribute("data-client-info-selector", ".clientInfo")
        // alfaPaymentButton.setAttribute("data-email-selector", ".clientEmail")
        alfaPaymentButton.setAttribute("data-email", props?.email)

        let boxForButton = document.getElementById("boxForButtonAlfaBank")
        if (boxForButton) {
            let bound = boxForButton.getBoundingClientRect()
            if (alfaPaymentButton) {
                alfaPaymentButton.style.display = "block"
                alfaPaymentButton.style.position = "fixed"
                alfaPaymentButton.style.top = bound.top + "px"
                alfaPaymentButton.style.left = bound.left + "px"

                document.addEventListener("scroll", functionOnScroll)
            }
        }

    // eslint-disable-next-line
    },[])


    return (
        <div className="Payment" >

            {/* <input type="hidden" value="0013" className="order" /> */}
            {/* <input type="hidden" value={props?.amount} className="amount" /> */}
            {/* <input type="hidden" value="Товар с сайта leidtogi.ru" className="description" /> */}
            {/* <input type="hidden" value="информация о клиенте" className="clientInfo" />
            <input type="hidden" value="client@leidtogi.ru" className="clientEmail" /> */}

            <div id="boxForButtonAlfaBank" />

        </div>
    )
}

export default Payment
