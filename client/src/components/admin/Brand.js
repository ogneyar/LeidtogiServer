import React, { useState, useContext, useEffect } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { fetchBrands } from '../../http/brandAPI'
import BrandService from '../../service/BrandService'
import { Context } from '../../index'


const Brand = observer(({show, onHide}) => {

    const { brand } = useContext(Context)
    // const [ info, setInfo ] = useState([])

    useEffect(() => {
        fetchBrands().then(data => {
            brand.setBrands(data)
            // setInfo(brand.brands)
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
                    Редактор брендов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <BrandService information={brand.brands} />                

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>                
            </Modal.Footer>
        </Modal>
    )
})

export default Brand
 