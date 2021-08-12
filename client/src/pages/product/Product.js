import React, { useEffect, useState, useContext } from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { fetchOneProduct } from '../../http/productAPI'

import { API_URL } from '../../utils/consts'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import ButtonBuy from '../../components/cart/ButtonBuy'
import Rating from '../../components/rating/Rating'
import { Context } from '../..'
import './Product.css'


const Product =  observer(() => {

    const { rating } = useContext(Context)

    const { id } = useParams()
    
    const [product, setProduct] = useState({info: []})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchOneProduct(id)
            .then(data => {
                setProduct(data)
                rating.setRate(data.rating)
            },err => {
                setError(true)
            })
            .finally(() => setLoading(false))
    },[])
    

    if (loading) return <Loading />

    if (error) return <Error />

    return ( 
        <Container className="Product">
            <Row className="ProductName">
                <h3>{product.name}</h3> 
                <p>Артикул: {product.article}</p> 
            </Row>
            <Row>
                <Col md={4} className="ProductImage">
                    <Image width={300} height={300} src={API_URL + product.img} />
                </Col>
                <Col md={4}>
                    <Row className="ProductRating">
                        <Rating product={product} rating={rating.rate} />
                    </Row>
                </Col>
                <Col md={4} className="ProductColCard">
                    <Card className="ProductCard">
                        <h3>Цена: {product.price} руб.</h3>
                        <div
                            className="ProductCardDivButtonBuy"
                        >
                            <ButtonBuy className="ProductCardButtonBuy" product={product}>
                                Добавить в корзину
                            </ButtonBuy>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row className="ProductDescription">
                {product.description
                ?
                <div className="ProductDescriptionDiv">
                    <label>
                        Описание: {product.description}
                    </label>
                </div>
                : null}
            </Row>
            <Row className="ProductInfo">
                {product.info && product.info.length > 0
                ?
                <>
                    <h2>Характеристики</h2>
                    {product.info.map((info, index) =>
                        <Row 
                            className={index % 2 === 0 ? "ProductInfoRowLight" : "ProductInfoRowtTansparent"}
                            key={info.id}
                        >
                            {info.title && info.description 
                            ? info.title+": "+info.description 
                            : info.title 
                                ? info.title
                                : info.description}
                        </Row>    
                    )}
                </>
                : null}
            </Row>
        </Container>
    )
})

export default Product
