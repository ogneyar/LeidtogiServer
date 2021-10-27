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
        let boxForButton = document.getElementById("boxForButtonAlfaBank")
        if (boxForButton) {
            let bound = boxForButton.getBoundingClientRect()
            if (alfaPaymentButton) {
                alfaPaymentButton.style.display = "block"
                alfaPaymentButton.style.position = "fixed"
                alfaPaymentButton.style.top = bound.top + "px"
                alfaPaymentButton.style.left = bound.left + "px"
                // alfaPaymentButton.style.backgroundColor = "green"
                // alfaPaymentButton.style.color = "green"

                document.addEventListener("scroll", functionOnScroll)

            }
        }

        
    },[])


    return (
        <div
            className="Payment"
        >

            <div id="boxForButtonAlfaBank" />

            <br />
            <br />
            <br />

            {/* Это всё перенесено в index.html */}

            {/* <input type="hidden" value="9897,35" className="amount" />
            <input type="hidden" value="0002" className="order" />
            <input type="hidden" value="описание" className="description" />
            <input type="hidden" value="информация о клиенте" className="clientInfo" />
            <input type="hidden" value="client@leidtogi.ru" className="clientEmail" />
            <input type="hidden" value="тест" className="test" />
            <div
                id="alfa-payment-button"
                data-token="a3rd28arc978uabudoqr0c164h"
                data-return-url="https://leidtogi.site"
                data-fail-url="https://leidtogi.site/error"
                data-redirect="true"
                data-language="ru"
                data-stages="1"
                data-amount-format="rubli"
                data-amount-selector=".amount" 
                data-order-number-selector='.order'
                data-description-selector='.description'
                // data-button-text='текст на кнопке'
                data-client-info-selector='.clientInfo'
                data-email-selector='.clientEmail'
                // data-version= '1.0'
                data-add-test-selector='.test'
            ></div> */}

            {/* <div>
                <script
                    id="alfa-payment-script"
                    type="text/javascript"
                    src="https://testpay.alfabank.ru/assets/alfa-payment.js">
                </script>
            </div> */}

        </div>
    )
}

export default Payment
