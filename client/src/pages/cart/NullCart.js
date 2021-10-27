import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { SHOP_ROUTE } from '../../utils/consts'
import { Container } from '../../components/myBootstrap'


const NullCart = () => {
    return (
        <Container 
            className="CartPage"
        >
            <Card className="CartCard">
                <Card.Title>
                    Корзина / Оформление товара
                </Card.Title>
                <Row>
                    <Col
                        className="CardTitle"
                    >
                        <strong>Ваша корзина пуста.</strong>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className="CardBody"
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

export default NullCart

        