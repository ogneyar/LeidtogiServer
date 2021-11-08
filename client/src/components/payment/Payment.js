// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import uuid from 'react-uuid'

// import Button from '../myBootstrap/Button'
import { createOrder } from '../../http/orderAPI'
import { URL } from '../../utils/consts'
import Loading from '../Loading'
import './Payment.css'


const Payment = (props) => {
    
    // eslint-disable-next-line
    // const [ uId, setUId ] = useState(uuid())

    const [ response, setResponse ] = useState(null)
    const [ loading, setLoading ] = useState(false)
   
    useEffect(() => {

    // eslint-disable-next-line
    },[])

    const onClickButtonPay = async () => {
        setLoading(true)
        let cart = localStorage.getItem("cart")
        createOrder({uuid: uuid(), cart, email: props?.email, url: URL})
            .then(
                data => {
                    if (data?.error) setResponse(data.error)
                    else if (data.formUrl) {
                        window.open(data.formUrl);
                    }
                    else setResponse("Не предвиденная ошибка!")
                },
                error => setResponse(error.message)
            ).finally(data => setLoading(false))
    }

    return (
        <div className="Payment" id="Payment">

            {response ? <label>{response}</label> : null}

            {loading
            ?
                <Loading />
            :
                <Button 
                    variant="outline-danger"
                    size="lg"
                    onClick={onClickButtonPay}
                >
                    Оплатить картой
                </Button>
            }
            

        </div>
    )
}

export default Payment
