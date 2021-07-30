import React from 'react'
import {  Image } from 'react-bootstrap'
import { Card, Button } from '../myBootstrap'
import { useHistory } from 'react-router-dom'
import star from '../../assets/star.png'
import { PRODUCT_ROUTE, API_URL } from '../../utils/consts'
import './Product.css'


const ProductItem = ({product}) => {

    const history = useHistory()

    const oClickButtonBuy = (e) => {
        e.stopPropagation()
        e.preventDefault()
        let cart = localStorage.getItem('cart')
        if (cart) {

            cart = JSON.parse(cart)
            let yes 
            cart = cart.map(i => {
                if (i.id === product.id) {
                    yes = "yes"
                    // let number = i.value
                    // number++
                    return {...i, value:i.value+1}
                } else return i
            })
            if (!yes) {
                cart = [...cart, {id:product.id,value:1,name:product.name,article:null}]
            }
            
        }else {
            cart = [{id:product.id,value:1,name:product.name,article:null}]
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        alert("Товар добавлен в корзину.")
    }


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
                            7000
                        </div>

                        <div className="product-rating">
                            <div>{product.rating}</div>
                            <Image className="mt-1 ml-1" width={15} height={15} src={star} />
                        </div>

                    </div>

                    
                    
                    <Button 
                        className="product-button"
                        variant="outline-warning"
                        onClick={e => oClickButtonBuy(e)}
                    >
                        КУПИТЬ
                    </Button>

                </div>

            </Card>
        </div>
    )
}

export default ProductItem
