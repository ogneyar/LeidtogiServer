import React, { useState, useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE, API_URL } from '../../utils/consts'
import { Container, Button } from '../../components/myBootstrap'
import './Cart.css'


const Cart = () => {

    const [state, setState] = useState([])
    const [total, setTotal] = useState(0)

    let cart

    useEffect(() => {
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        setState(cart)
        let totalValue = 0
        cart.forEach(i => totalValue += i.total)
        setTotal(totalValue)
    }, [])

    const onClickButtonPlus = (record) => {
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        let totalValue = 0
        cart = cart.map(i => {
            if (i.id === record.id) {
                let newValue = i.value + 1
                let newTotal = newValue * i.price
                totalValue += newTotal
                return {...i, value: newValue, total: newTotal}
            }
            totalValue += i.total
            return i
        })
        setState(cart)
        setTotal(totalValue)
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const onClickButtonMinus = (record) => {
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        let totalValue = 0
        cart = cart.map(i => {
            if (i.id === record.id) {
                if (i.value > 1) {
                    let newValue = i.value - 1
                    let newTotal = newValue * i.price
                    totalValue += newTotal
                    return {...i, value: newValue, total: newTotal}
                }
            }
            totalValue += i.total
            return i
        })
        setState(cart)
        setTotal(totalValue)
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    
    const onClickButtonDelete = (record) => {
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        if (cart.length === 1) {
            localStorage.removeItem('cart')
            setState(null)
            setTotal(0)
        }else {
            let totalValue = 0
            cart = cart.filter(i => {
                if (i.id !== record.id) {
                    totalValue += i.total
                    return true
                }
                return false
            })
            setState(cart)
            setTotal(totalValue)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }

    if (state) {

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
                                <th>№:</th>
                                <th>Наим. товара:</th>
                                <th>Фото:</th>
                                <th>Цена:</th>
                                <th>Кол-во:</th>
                                <th>Итого:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(state) && state.map((i,index) => {
                                return (
                                    <tr
                                        key={i.id}
                                    >
                                        <th>
                                            <div
                                                className="CartThDivRow"
                                            >
                                                {index+1}
                                            </div>
                                        </th>
                                        <th>
                                            <div
                                                className="CartThDivRow"
                                            >
                                                {i.name}
                                            </div>
                                        </th>
                                        <th>
                                            <div
                                                className="CartThDivRow"
                                            >
                                                <img src={API_URL + i.img} width="50" height="50" alt={i.name} />
                                            </div>
                                        </th>
                                        <th>
                                            <div
                                                className="CartThDivRow"
                                            >
                                                {i.price}
                                            </div>
                                        </th>
                                        <th>
                                            <div
                                                className="d-flex flex-column"
                                            >
                                                <div
                                                    className="CartThDivRow"
                                                >
                                                    <Button
                                                        className="CartButtonValue"
                                                        onClick={() => onClickButtonMinus(i)}
                                                    >
                                                        -
                                                    </Button>
                                                    <div
                                                        className="CartValue"
                                                    >
                                                        {i.value}
                                                    </div>

                                                    <Button
                                                        className="CartButtonValue"
                                                        onClick={() => onClickButtonPlus(i)}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <Button
                                                    className="CartButtonDelete"
                                                    onClick={() => onClickButtonDelete(i)}
                                                    variant="danger"
                                                >
                                                    Удалить
                                            </Button>
                                            </div>
                                        </th>
                                        <th>
                                            <div
                                                className="CartThDivRow"
                                            >
                                                {i.total}
                                            </div>
                                        </th>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Итого:</th>
                                <th>
                                    <div
                                        className="CartThDivRow"
                                    >
                                        {total}
                                    </div>
                                    
                                </th>
                            </tr>
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