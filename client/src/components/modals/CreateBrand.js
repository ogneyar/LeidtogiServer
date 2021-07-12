import React, { useState, useContext } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { createBrand, fetchBrands } from '../../http/brandAPI'
import { Context } from '../..'


const CreateBrand = observer(({show, onHide}) => {

    const {product} = useContext(Context)

    const [value, setValue] = useState('')
    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('')
            onHide()
        })
        fetchBrands().then(data => {
            product.setBrands(data)
        })
    }

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
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={'Введите название бренда'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateBrand
 