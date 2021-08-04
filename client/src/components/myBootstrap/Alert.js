import React from 'react'
import {Modal, Button} from 'react-bootstrap'


const Alert = ({children, show, onHide, message}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Внимание
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {children ? children : message}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Alert
