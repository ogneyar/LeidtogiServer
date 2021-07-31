import React, { useState, useContext, useEffect } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { fetchBrands } from '../../http/brandAPI'
import CategoryService from '../../service/category/CategoryService'
import { Context } from '../../index'


const CategoryModal = observer(({show, onHide}) => {

    const { category } = useContext(Context)
    // const [ info, setInfo ] = useState([])

    useEffect(() => {
    },[])

    
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

                <CategoryService information={category.categories} />

            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer> */}
        </Modal>
    )
})

export default CategoryModal
 