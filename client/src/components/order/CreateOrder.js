import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import DeliverySdek from '../delivery/DeliverySdek'
import Payment from '../payment/Payment'
import './CreateOrder.css'


const CreateOrder = () => {

    const [ choiseDelivery, setСhoiseDelivery ] = useState(true)
    const [ payment, setPayment ] = useState(false)
    const [ visibleModal, setVisibleModal ] = useState(false)

    const onHideModal = () => {
        let alfaPaymentButton = document.getElementById("alfa-payment-button")
        alfaPaymentButton.style.display = "none"
        setVisibleModal(false)
    }

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

                    {choiseDelivery 
                    ?
                        <div
                            className="mt-3 d-flex flex-row align-items-end justify-content-around flex-wrap"
                        >
                            <Button size="lg" onClick={()=>{setСhoiseDelivery(false);setPayment(true)}}>Самовывоз</Button>
                            <Button size="lg" onClick={()=>{setСhoiseDelivery(false);setPayment(false)}}>С доставкой</Button>
                        </div>
                    :
                        payment
                        ? 
                            <div
                                // className="d-flex justify-content-center"
                            >
                                <Payment />
                            </div>
                        : 
                            <div
                                className="mt-3 d-flex flex-row justify-content-center flex-wrap"
                            >
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
}

export default CreateOrder
