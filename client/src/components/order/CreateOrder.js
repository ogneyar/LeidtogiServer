import React, { useState, useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import DeliverySdek from '../delivery/DeliverySdek'
import Payment from '../payment/Payment'
import {Context} from '../..'
import './CreateOrder.css'
import { Input } from '../myBootstrap'


const CreateOrder = observer((props) => {

    const { user } = useContext(Context)

    const [ choiseDelivery, setСhoiseDelivery ] = useState(true)
    const [ payment, setPayment ] = useState(false)
    const [ visibleModal, setVisibleModal ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ newEmail, setNewEmail ] = useState("")

    const onHideModal = () => {
        let alfaPaymentButton = document.getElementById("alfa-payment-button")
        alfaPaymentButton.style.display = "none"
        setVisibleModal(false)
    }

    useEffect(() => {
        if (user?.user) {
            // console.log(user.user.id);
            setEmail(user.user?.email)
        }
    }, [user?.user])

    return (
        <div
            className="CreateOrder"
        >
            <Button
                onClick={() => {setVisibleModal(true);setСhoiseDelivery(true)}}
                className="CreateOrderButton"
                size="lg"
                variant="success"
            >
                Оформить заказ
            </Button>

            <Modal 
                show={visibleModal} 
                onHide={onHideModal}
                centered
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Формирование заказа
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!email
                    ?
                        <div className="CreateOrderInputEmail" >
                            <label>Нам нужен Ваш Email</label>
                            <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                            <span>чтобы мы могли отправить на него чек, как того требует ФЗ №54</span>
                            <Button size="lg" onClick={()=>{newEmail && setEmail(newEmail)}}>Далее</Button>
                        </div>
                    :
                        choiseDelivery 
                        ?
                            <div className="CreateOrderChoiseDelivery" >
                                <lable style={{position:"relative"}}>
                                    <p style={{position:"absolute",bottom:"-40px",left:"10px"}}>Из города Курск</p>
                                    <Button size="lg" onClick={()=>{setСhoiseDelivery(false);setPayment(true)}}>Самовывоз</Button>
                                </lable>
                                <Button size="lg" onClick={()=>{setСhoiseDelivery(false);setPayment(false)}}>С доставкой</Button>
                            </div>
                        :
                            payment
                            ? 
                                <div className="CreateOrderPayment" >
                                    <Payment amount={props?.amount} email={email} />
                                </div>
                            : 
                                <div className="CreateOrderDeliverySdek" >
                                    <DeliverySdek />
                                </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onHideModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
})

export default CreateOrder
