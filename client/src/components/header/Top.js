import React from 'react'
import { Row, Col } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'

import { Container, NavLink } from '../myBootstrap'
import { ABOUT_US_ROUTE, DELIVERY_ROUTE, PAYMENT_ROUTE, CONTACTS_ROUTE, SPECIALS_ROUTE, WARRANTY_ROUTE } from '../../utils/consts'

import './Top.css'
import Search from '../search/Search'


const Top = () => {
    return (
        <div id="top" className="Top">
            <Container className="TopContainer">
                <div className="TopRow">
                    <div 
                        className="TopCol TopColLink hidden-mobile" 
                        md={8}
                    >
                        <div className="TopDivLink">
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={ABOUT_US_ROUTE}
                                >
                                    О компании
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={DELIVERY_ROUTE}
                                >
                                    Доставка
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={PAYMENT_ROUTE}
                                >
                                    Оплата
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={WARRANTY_ROUTE}
                                >
                                    Гарантия и сервис
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    to={CONTACTS_ROUTE}
                                >
                                    Контакты
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top_Specials"
                                    to={SPECIALS_ROUTE}
                                >
                                    Акции
                                </NavLink>
                            </strong>
					    </div>
				    </div>

					<div 
                        className="TopCol TopColSearch" 
                    >
                        <Search />
			        </div>
		        </div>
	        </Container>
	    </div>
    )
}

export default Top
