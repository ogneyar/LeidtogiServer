import React, { useState } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import { createCategory } from '../../http/categoryAPI'

const CreateCategory = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addCategory = () => {
        createCategory({name: value}).then(data => {
            setValue('')
            onHide()
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
                    Добавить категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={'Введите название категории'}
                    />
                </Form>            
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCategory}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateCategory
