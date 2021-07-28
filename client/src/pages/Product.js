import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row, Button } from 'react-bootstrap'
import star from '../assets/star.png'
import {useParams} from 'react-router-dom'
import { fetchOneProduct } from '../http/productAPI'
import { API_URL } from '../utils/consts'
import Error from '../components/Error'
import Loading from '../components/Loading'

const Product = () => {
    const [product, setProduct] = useState({info: []})
    const {id} = useParams()        
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchOneProduct(id)
            .then(data => {
                setProduct(data)
            },err => {
                setError(true)
            })            
            .finally(() => setLoading(false))
    },[])
    

    if (loading) return <Loading />

    if (error) return <Error />

    return ( 
        <Container className="Content mt-3 Mobile">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={API_URL + product.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{product.name}</h2>
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
                            {product.rating}
                        </div>                        
                    </Row>
                </Col>
                <Col md={4}>
                    <Card 
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От {product.price} руб.</h3>
                        <Button variant={'outline-dark'}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {product.info.map((info, index) =>
                    <Row 
                        key={info.id}
                        style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                    >
                        {info.title}: {info.description}
                    </Row>    
                )}
            </Row>
        </Container>
    )
}

export default Product
