import React, { useContext, useState, useEffect } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { Context } from '../..'
import { fetchCategories } from '../../http/categoryAPI'
import { observer } from 'mobx-react-lite'
import CategoryService from '../../service/CategoryService'


const Category = observer(({show, onHide}) => {

    const { category } = useContext(Context)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchCategories().then(data => {
            category.setCategories(data)
            setInfo(category.categories)
        })
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
                    Редактирование категорий
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <CategoryService information={info} idName={"category_"} offset={null} sub_id={0} />

            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>

            
        </Modal>
    )
})

export default Category
