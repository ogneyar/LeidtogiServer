import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row, Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'

// import star from '../../public/assets/star.png'
import { fetchOneDevice } from '../../http/deviceAPI'
import { API_URL, HOST_URL } from '../../utils/consts'

const star = HOST_URL + 'assets/star.png'

const Device = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()    

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    },[])
    
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={API_URL + device.img} />                
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div 
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${star}) no-repeat center center`, 
                                width: 240,
                                height: 240,
                                backgroundSize: 'cover',
                                fontSize: 64,
                                color: 'green'
                            }}
                        >
                            {device.rating}
                        </div>                        
                    </Row>
                </Col>
                <Col md={4}>
                    <Card 
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От {device.price} руб.</h3>
                        <Button variant={'outline-dark'}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row 
                        key={info.id}
                        style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                    >
                        {info.title}: {info.description}
                    </Row>    
                )}
            </Row>
            <div className="App">{device.name}</div>
        </Container>
    )
}

export default Device
