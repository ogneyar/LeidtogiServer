import React, { useEffect, useState, useContext } from 'react'
import { Card, Col, Container, Image, Row, Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { fetchOneProduct } from '../http/productAPI'
import { fetchAllRating } from '../http/ratingAPI'

import { API_URL } from '../utils/consts'
import Error from '../components/Error'
import Loading from '../components/Loading'
import ButtonBuy from '../components/cart/ButtonBuy'
import Rating from '../components/rating/Rating'
import { Context } from '..'
import '../styles/Product.css'


const Product =  observer(() => {

    const { rating } = useContext(Context)

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
        fetchAllRating(id).then(data => {
            let rate = 0
            data.forEach(i => {
                if (i.rate !== undefined) rate = rate + i.rate
            })
            if (rate !== 0) {
                if( rate % data.length === 0 ) {
                    rate = rate / data.length
                }else {
                    rate = (rate / data.length).toFixed(1)
                }
            }
            rating.setRate(rate)
        })
    },[])
    

    if (loading) return <Loading />

    if (error) return <Error />

    return ( 
        <Container className="Content mt-3 Mobile">
            <Row>
                <Col md={4} className="d-flex flex-column align-items-center">
                    <Image width={300} height={300} src={API_URL + product.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>Наименование: {product.name}</h2>

                        <Rating product={product} rating={rating.rate} />

                    </Row>
                </Col>
                <Col md={4} className="d-flex flex-column align-items-center">
                    <Card 
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От {product.price} руб.</h3>

                        <div
                            className="p-3"
                        >
                            <ButtonBuy product={product}>
                                Добавить в корзину
                            </ButtonBuy>
                        </div>

                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                {product.info && product.info.length > 0
                ?
                <>
                    <h1>Характеристики</h1>
                    {product.info.map((info, index) =>
                        <Row 
                            key={info.id}
                            style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                        >
                            {info.title}: {info.description}
                        </Row>    
                    )}
                </>
                : null}
                
            </Row>
        </Container>
    )
})

export default Product
