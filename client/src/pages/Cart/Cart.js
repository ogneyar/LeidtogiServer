import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../../utils/consts'
import { Button } from '../../components/myBootstrap'
import './Cart.css'


const Cart = () => {

    const [state, setState] = useState([])

    let cart

    useEffect(() => {
        cart = localStorage.getItem('cart')
        setState(JSON.parse(cart))
    }, [])

    const onClickButtonPlus = (record) => {
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        cart = cart.map(i => {
            if (i.id === record.id) {
                return {...i, value:i.value+1}
            }else return i
        })
        setState(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const onClickButtonMinus = (record) => {
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        cart = cart.map(i => {
            if (i.id === record.id) {
                if (i.value > 1)
                    return {...i, value:i.value-1}
                else return i
            }else return i
        })
        setState(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    
    const onClickButtonDelete = (record) => {
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        if (cart.length === 1) {
            localStorage.removeItem('cart')
            setState(null)
        }else {
            cart = cart.filter(i => i.id !== record.id)
            setState(cart)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }

    if (state) {
        // localStorage.removeItem('cart')

        return (
            <Container 
                className="Cart"
            >
                <Card 
                    className="Cart-card"
                >
                    <Card.Title className="Cart-card-title">
                        Корзина / Оформление товара
                    </Card.Title>

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Номер:
                                </th>
                                <th>
                                    Наименование товара:
                                </th>
                                <th>
                                    Артикул:
                                </th>
                                <th>
                                    Количество:
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(state) && state.map(i => {
                                return (
                                    <tr
                                        key={i.id}
                                    >
                                        <th>
                                            {i.id}
                                        </th>
                                        <th>
                                            {i.name}
                                        </th>
                                        <th>
                                            {i.article}
                                        </th>
                                        <th>
                                            <Button
                                                // className="pl-2 pr-2"
                                                style={{width:"30px"}}
                                                onClick={() => onClickButtonMinus(i)}
                                            >
                                                -
                                            </Button>

                                            {/* <div
                                                className="pl-2 pr-2"
                                            > */}
                                                &nbsp;&nbsp;
                                                {i.value}
                                                &nbsp;
                                            {/* </div> */}

                                            <Button
                                                // className="pl-2 pr-2"
                                                style={{width:"30px"}}
                                                onClick={() => onClickButtonPlus(i)}
                                            >
                                                +
                                            </Button>
                                            <Button
                                                className="ml-4"
                                                onClick={() => onClickButtonDelete(i)}
                                                variant="danger"
                                            >
                                                Удалить
                                            </Button>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </Card>
            </Container>
        )



    }else return (
        <Container 
            className="Cart"
        >
            <Card className="Cart-card">
                <Card.Title>
                        Корзина / Оформление товара
                </Card.Title>

                <Row>
                    <Col
                        className="Card_title d-flex justify-content-center align-items-center"
                    >
                        <strong>Ваша корзина пуста.</strong>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className="Card_body d-flex justify-content-center align-items-center"
                    >
                        
                            Поищите товар &nbsp;
                            <NavLink
                                className="NavLink"
                                to={SHOP_ROUTE}
                            >
                                здесь!
                            </NavLink>
                        
                    </Col>
                </Row>
                
            </Card>
           
        </Container>
    )
}

export default Cart