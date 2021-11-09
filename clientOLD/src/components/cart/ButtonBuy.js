import React, { useState } from 'react'

import { onClickButtonBuy } from '../../service/cart/CartBuyService'
import Notification from '../myBootstrap/Notification'
import { Button, NavLink } from '../myBootstrap'
import { CART_ROUTE } from '../../utils/consts'
import './ButtonBuy.css'


const ButtonBuy = (props) => {

    const [notificationVisible, setNotificationVisible] = useState(false)

    let className
    if (props?.className) className = props?.className

    return (
        <>
        <Button
            className={"ButtonBuy "+className}
            variant="outline-warning"
            onClick={e => {
                setNotificationVisible(true)
                onClickButtonBuy(e, props?.product)
            }}
        >
            {props.children}
        </Button>

        <Notification 
            show={notificationVisible} 
            onHide={() => setNotificationVisible(false)}
        >
            <div
                className="d-flex justify-content-center m-4"
            >
                Товар добавлен в&nbsp;<NavLink to={CART_ROUTE}>корзину</NavLink>!
            </div>
        </Notification>
        </>
    )
}

export default ButtonBuy
