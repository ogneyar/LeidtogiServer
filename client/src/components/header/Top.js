import React from 'react'
import { Row, Col } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'

import { Container, NavLink } from '../myBootstrap'
import { ABOUT_US_ROUTE, DELIVERY_ROUTE, PAYMENT_ROUTE, CONTACTS_ROUTE, SPECIALS_ROUTE, WARRANTY_ROUTE } from '../../utils/consts'

import './Top.css'


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
                        <div className="header-search d-flex justify-content-center align-items-center">
                            <div className="autosearch-wrapper input-group">
                                <form method="GET" id="form-search" action="/search">

                                    <div id="search" className="Search">
                                        <input className="SearchInput" type="text" autoComplete="off" name="search" id="search" placeholder="Поиск" />
                                        <span className="input-group-btn">
                                            <button type="submit" className="btn btn-default button-search"><i className="fa fa-search " /></button>
                                        </span>
                                    </div>
                                    
                                </form>
	                            <div className="clear clr" />
                            </div>
                        </div>
			        </div>
		        </div>
	        </Container>
	    </div>
    )
}

export default Top
