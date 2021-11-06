// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

import './Payment.css'


const Payment = (props) => {
    
    // const [ state, setState ] = useState(true)

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

    useEffect(() => {
        let alfaPaymentButton = document.getElementById("alfa-payment-button")
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
        alfaPaymentButton.setAttribute("data-amount-selector", ".amount")
        alfaPaymentButton.setAttribute("data-order-number-selector", ".order")
        alfaPaymentButton.setAttribute("data-description-selector", ".description")
        alfaPaymentButton.setAttribute("data-button-text", "Оплатить картой")
        // alfaPaymentButton.setAttribute("data-client-info-selector", ".clientInfo")
        // alfaPaymentButton.setAttribute("data-email-selector", ".clientEmail")

        let boxForButton = document.getElementById("boxForButtonAlfaBank")
        if (boxForButton) {
            let bound = boxForButton.getBoundingClientRect()
            if (alfaPaymentButton) {
                // boxForButton.style.width = alfaPaymentButton.offsetWidth
                // boxForButton.style.width = getComputedStyle(alfaPaymentButton).width
                alfaPaymentButton.style.display = "block"
                alfaPaymentButton.style.position = "fixed"
                alfaPaymentButton.style.top = bound.top + "px"
                alfaPaymentButton.style.left = bound.left + "px"
                // alfaPaymentButton.style.backgroundColor = "green"
                // alfaPaymentButton.style.color = "green"

                document.addEventListener("scroll", functionOnScroll)

            }
        }

    // eslint-disable-next-line
    },[])


    return (
        <div className="Payment">

            <input type="hidden" value="0008" className="order" />
            <input type="hidden" value={props?.amount} className="amount" />
            <input type="hidden" value="описание" className="description" />
            {/* <input type="hidden" value="информация о клиенте" className="clientInfo" />
            <input type="hidden" value="client@leidtogi.ru" className="clientEmail" /> */}

            <br />
            <br />

            <div id="boxForButtonAlfaBank" />

            <br />
            <br />
            <br />

        </div>
    )
}

export default Payment
