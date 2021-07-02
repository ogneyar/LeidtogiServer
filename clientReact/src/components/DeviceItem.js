import React from 'react'
import { Col, Card, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col 
            md={3} 
            className="mt-3"
            onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
        >
            <Card 
                style={{width: 150, cursor: 'pointer'}} 
                border={'light'}
            >
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                <div className="text-black-50 d-flex justify-content-between align-items-center mt-1">
                    <div>Описание &#9734; товара</div>
                    <div className="d-flex mt-0">
                        <div>{device.rating}</div>
                        <Image className="mt-1 ml-1" width={15} height={15} src={star} />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    )
}

export default DeviceItem
