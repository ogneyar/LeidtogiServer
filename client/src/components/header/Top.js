import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'

import { NavLink } from '../myBootstrap'
import { ABOUT_US_ROUTE, DELIVERY_ROUTE, PAYMENT_ROUTE, CONTACTS_ROUTE, SPECIALS_ROUTE, WARRANTY_ROUTE } from '../../utils/consts'

import './Top.css'


const Top = () => {
    return (
        <div id="top" className="Top">
            <Container className="Container">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col 
                        className="hidden-mobile" 
                        md={8}
                    >
                        <div className="d-flex justify-content-around align-items-center w-100">
                            <strong className="">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={ABOUT_US_ROUTE}
                                >
                                    О компании
                                </NavLink>
                            </strong>
                            <strong className="">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={DELIVERY_ROUTE}
                                >
                                    Доставка
                                </NavLink>
                            </strong>
                            <strong className="">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={PAYMENT_ROUTE}
                                >
                                    Оплата
                                </NavLink>
                            </strong>
                            <strong className="">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={WARRANTY_ROUTE}
                                >
                                    Гарантия и сервис
                                </NavLink>
                            </strong>
                            <strong className="">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={CONTACTS_ROUTE}
                                >
                                    Контакты
                                </NavLink>
                            </strong>
                            <strong className="">
                                <NavLink
                                    className="NavLink NavLink_Top_Specials"
                                    to={SPECIALS_ROUTE}
                                >
                                    Акции
                                </NavLink>
                            </strong>
					    </div>
				    </Col>
					<Col 
                        className="d-flex justify-content-center align-items-center m-0 pt-1 pb-1" 
                    >
                        <div className="header-search d-flex justify-content-center align-items-center">
                            <div className="autosearch-wrapper input-group">
                                <form method="GET" id="form-search" action="/search">

                                    <div id="search" className="search d-flex justify-content-center align-items-center">
                                        <input className="autosearch-input pl-2 pr-2" type="text" size="35" autoComplete="off" name="search" id="search" placeholder="Поиск" />
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-default button-search"><i className="fa fa-search " /></button>
                                        </span>
                                    </div>
                                    
                                </form>
	                            <div className="clear clr" />
                            </div>
                        </div>
			        </Col>
		        </Row>
	        </Container>
	    </div>
    )
}

export default Top
