import React, { useContext, useState, useEffect } from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import { Context } from '../../pages/_app'
import { fetchBrands, deleteBrand } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'


const DeleteBrand = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchBrands().then(data => {
            device.setBrands(data)
            setInfo(device.brands)
        })
    },[])

    const removeInfo = (number) => setInfo(info.filter(i => i.number !== number))

    const hideAndDelete = (id) => {
        deleteBrand(id)
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
                    Удалить бренд
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

export default DeleteBrand
