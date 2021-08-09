import React, { useState, useContext, useEffect } from 'react'
import {Modal, ListGroup} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import CategoryService from '../../service/category/CategoryService'
import { SHOP_ROUTE } from '../../utils/consts'
import { Context } from '../../index'
import CategoryItem from './CategoryItem'
import CategoryBar from './CategoryBar'


const CategoryModal = observer(({show, onHide}) => {
    
    const { category } = useContext(Context)

    
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

                {/* <CategoryService information={category.categories} /> */}
                
                <CategoryBar onHide={onHide} />

            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer> */}
        </Modal>
    )
})

export default CategoryModal
 