import React from 'react'
import {  Image } from 'react-bootstrap'
import { Card, Button } from '../myBootstrap'
import { useHistory } from 'react-router-dom'
import star from '../../assets/star.png'
import { PRODUCT_ROUTE, API_URL } from '../../utils/consts'
import ButtonBuy from '../cart/ButtonBuy'
import './Product.css'

const ProductItem = ({product}) => {

    const history = useHistory()

    


    return (
        <div
            className="ProductItem"
            onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}
        >
            <Card 
                className="product-card"
            >

                <Image 
                    className="product-image" 
                    src={API_URL + product.img} 
                />

                <div className="product-body">

                    <div className="product-name">
                        {product.name}
                    </div>

                    <div className="product-text">

                        {/* <div className="product-description">
                            Описание &#9734; товара
                        </div> */}

                        <div className="product-price">
                            {product.price}
                        </div>

                        {product.rating 
                        ? 
                            <div className="product-rating">
                                <div>{product.rating}</div>
                                <Image className="mt-1 ml-1" width={15} height={15} src={star} />
                            </div>
                        : null}

                    </div>

                    
                    
                    <ButtonBuy product={product}>
                        КУПИТЬ
                    </ButtonBuy>

                </div>

            </Card>
        </div>
    )
}

export default ProductItem
