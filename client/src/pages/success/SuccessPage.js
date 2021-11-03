import React, { useEffect } from 'react'

import InfoPage from '../info/InfoPage'
import './SuccessPage.css'

const SuccessPage = () => {

    useEffect(() => {
        localStorage.removeItem('cart')
    }, [])

    return (
        <InfoPage>
            <div className="SuccessPage">
                <header>Оплата произведена упешно!</header>
                <p>Номер вашего заказа <strong>{"{такой-то}"}</strong></p>
            </div>
        </InfoPage>
    )
}

export default SuccessPage
