import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import BrandService from '../../service/BrandService'


const Brand = observer(({show, onHide}) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактор брендов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <BrandService />                

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>                
            </Modal.Footer>
        </Modal>
    )
})

export default Brand
 