import React, { useEffect, useState } from 'react'
import {  Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import $ from 'jquery'

import star from '../../assets/star.png'
import { Card } from '../myBootstrap'
import { PRODUCT_ROUTE, API_URL } from '../../utils/consts'
import ButtonBuy from '../cart/ButtonBuy'
import './Product.css'

const ProductItem = ({product}) => {

    const history = useHistory()

    const [image, setImage] = useState(null)

    useEffect(() => {
        try {
            setImage(JSON.parse(product.img))
        }catch (e) {
            setImage(product.img)
        }
        // if (typeof(image) === "object") console.log(image);
    },[])


    return (
        <div
            className="ProductItem"
            onClick={() => {
                history.push(PRODUCT_ROUTE + '/' + product.id)
                $('html, body').animate(
                    {
                        scrollTop: 0
                    }, 
                    700, 
                    function(){}
                )
            }}
        >
            <Card 
                className="product-card"
            >

                <Image 
                    className="product-image" 
                    src={API_URL + image[0].big} 
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
