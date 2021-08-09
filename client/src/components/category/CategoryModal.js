import React from 'react'
import { Modal } from 'react-bootstrap'

import CategoryService from '../../service/category/CategoryService'


const CategoryModal = ({show, onHide}) => {
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
                    Категории
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <CategoryService onHide={onHide} />

            </Modal.Body>
        </Modal>
    )
}

export default CategoryModal
 