import React, { useContext, useState, useEffect } from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import { Context } from '../../pages/_app'
import { fetchTypes, deleteType } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'


const DeleteType = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => {
            device.setDevices(data)
            setInfo(device.types)
            // console.log(data);
        })
    },[])

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const hideAndDelete = (id) => {
        deleteType(id)
        removeInfo(id)
        onHide()
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
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {info.map(i =>
                        <Row
                            className='mt-4'
                            key={i.id}
                        >
                            <Col md={4}>
                                {i.name}
                            </Col>
                            
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => hideAndDelete(i.id)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>   
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DeleteType
