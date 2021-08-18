import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../../utils/consts'
import './InfoPage.css'


const InfoPage = (props) => {
    return (
        <Container 
            className="InfoPage"
        >            
            <Card className="InfoPageCard">
                <div className="InfoPageCardBody">
                    {props?.children}
                </div>
                <div className="InfoPageCardFooter">
                    Поcетить &nbsp;
                    <NavLink
                        className="NavLink"
                        to={SHOP_ROUTE}
                    >
                        магазин!
                    </NavLink>
                </div>
            </Card>
        </Container>
    )
}

export default InfoPage
