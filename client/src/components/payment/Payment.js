// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'

import { createOrder } from '../../http/orderAPI'
import './Payment.css'


const Payment = (props) => {
    
    const [ orderNumber, setOrderNumber ] = useState(0)
    // eslint-disable-next-line
    const [ uId, setUId ] = useState(uuid())

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
        alfaPaymentButton.setAttribute("data-order-number", orderNumber)
        if (process.env.REACT_APP_ENV === "production") {
            alfaPaymentButton.setAttribute("data-return-url", process.env.REACT_APP_URL_PRODUCTION + "success/" + uId + "/" + orderNumber)
        }else {
            alfaPaymentButton.setAttribute("data-return-url", process.env.REACT_APP_URL + "success/" + uId + "/" + orderNumber)
        }
    },[orderNumber, uId])

    useEffect(() => {
        let cart = localStorage.getItem("cart")
        createOrder({uuid:uId, cart, email:props?.email}).then(data => {
            setOrderNumber(data?.id)
        })
        let alfaPaymentButton = document.getElementById("alfa-payment-button")
        alfaPaymentButton.setAttribute("data-token", "a3rd28arc978uabudoqr0c164h")
        if (process.env.REACT_APP_ENV === "production") {
            if (orderNumber) alfaPaymentButton.setAttribute("data-return-url", process.env.REACT_APP_URL_PRODUCTION + "success/" + uId + "/" + orderNumber)
            alfaPaymentButton.setAttribute("data-fail-url", process.env.REACT_APP_URL_PRODUCTION + "error")
        }else {
            if (orderNumber) alfaPaymentButton.setAttribute("data-return-url", process.env.REACT_APP_URL + "success/" + uId + "/" + orderNumber)
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
        // alfaPaymentButton.setAttribute("data-client-info", "clientInfo")
        // alfaPaymentButton.setAttribute("data-email-selector", ".clientEmail")
        alfaPaymentButton.setAttribute("data-email", props?.email)


        let bundle = { 
            "orderCreationDate":"2013-07-12T13:51:00",  
            
            "customerDetails": { 
                "email":"email@email.com", 
                "phone":"79851231234", 
                "contact": "Mega  Tester",
                "deliveryInfo": { 
                    "deliveryType":"courier", 
                    "country":"RU",  
                    "city":"Moscow",
                    "postAddress":"Земляной Вал 50А стр.2" 
                }
            },  
            
            "cartItems": { 
                "items": [ 
                    { 
                        "positionId": "1",
                        "name": "Metzeler Enduro 3 Sahara", 
                        "itemDetails": { 
                            "itemDetailsParams": [
                                { 
                                    "value": "Metzeler ", 
                                    "name": "brand" 
                                }, 
                                { 
                                    "value": "17inch", 
                                    "name": "radius" 
                                }
                            ]
                        },
                        "quantity": { 
                            "value": 0.71, 
                            "measure": "штук" 
                        }, 
                        "itemAmount": 8000, 
                        "itemCurrency": "643",
                        "itemCode": "NM-15", 
                        "discount": { 
                            "discountType": "percent", 
                            "discountValue": "5" 
                        },
                        "agentInterest": { 
                            "interestType": "agentPercent", 
                            "interestValue": "7" 
                        }, 
                        "tax": {
                            "taxType": 1,
                            "taxSum": 111
                        }, 
                        "itemPrice": 11267
                    },
            
                    { 
                        "positionId": "2", 
                        "name": "Universal Mirror Enduro", 
                        "itemDetails": { 
                            "itemDetailsParams":[
                                { 
                                    "value": "Noname", 
                                    "name": "brand" 
                                },
                                { 
                                    "value": "12mm", 
                                    "name": "diameter" 
                                }
                            ]
                        },
                        "quantity": { 
                            "value": 1.0, 
                            "measure": "штук" 
                        }, 
                        "itemAmount": 8000, 
                        "itemCurrency": "643",
                        "itemCode": "NM-15", 
                        "discount": { 
                            "discountType": "percent", 
                            "discountValue": "5" 
                        },
                        "agentInterest": { 
                            "interestType": " agentPercent ", 
                            "interestValue": "7" 
                        }, 
                        "tax": {
                            "taxType": 1,
                            "taxSum": 111
                        }, 
                        "itemPrice": 8000 
                    },
                    
                    { 
                        "positionId": "3", 
                        "name": "Warm Grips", 
                        "itemDetails": { 
                            "itemDetailsParams":[ 
                                { 
                                    "value": "Noname", 
                                    "name": "brand" 
                                }
                            ]
                        },  
                        "quantity": { 
                            "value": 1.0, 
                            "measure": "штук" 
                        },
                        "itemAmount": 8000, 
                        "itemCurrency": 643, 
                        "itemCode": "G-16",
                        "discount": { 
                            "discountType": 
                            "percent", "discountValue": "5" 
                        },
                        "agentInterest": { 
                            "interestType": " agentPercent ", 
                            "interestValue": "7" 
                        }, 
                        "tax": {
                            "taxType": 1,
                            "taxSum": 111
                        }, 
                        "itemPrice": 8000 
                    }
                ] 
            
            } 
            
        }
            
        alfaPaymentButton.setAttribute("data-order-bundle", JSON.stringify(bundle))



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

            <div id="boxForButtonAlfaBank" />

        </div>
    )
}

export default Payment
