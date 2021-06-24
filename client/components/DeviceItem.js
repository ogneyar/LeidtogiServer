import React from 'react'
import { Col, Card, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

// import star from '../public/assets/star.png'
import { DEVICE_ROUTE, API_URL, HOST_URL } from '../utils/consts'

const star = HOST_URL + 'assets/star.png'

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
                <Image width={150} height={150} src={API_URL + device.img} /> 
                <div className="text-black-50 d-flex justify-content-between align-items-center mt-1">
                    <div>Same &#9734; text...</div>
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
