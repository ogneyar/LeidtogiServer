import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../../utils/consts'
import './Lk.css'


const Lk = () => {
    return (
        <Container 
         className="d-flex justify-content-center align-items-center"
     >            
         <Card style={{width: 600}} className="p-5 m-5">

            <Row>
                <Col
                    className="Lk_title d-flex justify-content-center align-items-center"
                >
                    <strong>Добро пожаловать!</strong>
                </Col>
            </Row>
            <Row>
                <Col
                    className="Lk_body d-flex justify-content-center align-items-center"
                >
                        Поcетить &nbsp;
                        <NavLink
                            className="NavLink"
                            to={SHOP_ROUTE}
                        >
                            магазин!
                        </NavLink>
                </Col>
            </Row>
            
         </Card>
        
     </Container>
    )
}

export default Lk
