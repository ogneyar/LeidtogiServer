import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'


const Notification = (props) => {

    let time = props?.time
    if (!time) time = 1500
 
    useEffect(() => {
        if (props.show) {
            setTimeout(()=> {
                props.onHide()
            },time)
        }
    },[props.show])


    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            // className="d-flex justify-content-center align-items-center"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Уведомление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                className="pl-4"
            >

                {props.children ? props.children : props?.message}

            </Modal.Body>
        </Modal>
    )
}

export default Notification
