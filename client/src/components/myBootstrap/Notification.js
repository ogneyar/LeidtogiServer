import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'


const Notification = (props) => {
 
    useEffect(() => {
        if (props.show) {
            setTimeout(()=> {
                props.onHide()
            },1500)
        }
    },[props.show])


    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Уведомление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {props.children ? props.children : props?.message}

            </Modal.Body>
        </Modal>
    )
}

export default Notification
