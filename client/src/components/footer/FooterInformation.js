import React from 'react'
import { NavLink } from 'react-router-dom'

import {    
    ABOUT_US_ROUTE, DELIVERY_ROUTE, PAYMENT_ROUTE, PRIVACY_POLICY_ROUTE, RETURNS_POLICY_ROUTE,
    TERMS_OF_USE_ROUTE, WARRANTY_ROUTE
} from '../../utils/consts'

import './FooterInformation.css'

const FooterInformation = () => {
    return (
        <div
            className="FooterInformation"
        >
            <div className="footer-title">
				<h3>Информация</h3>
			</div>
            <div className="footer-static-content">
                <ul className="togle-footer">
                    <li>   
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={ABOUT_US_ROUTE}
                        >
                            О нас
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={DELIVERY_ROUTE}
                        >
                            Доставка
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={PAYMENT_ROUTE}
                        >
                            Оплата
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={PRIVACY_POLICY_ROUTE}
                        >
                            Политика конфиденциальности
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={RETURNS_POLICY_ROUTE}
                        >
                            Условия возврата
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={TERMS_OF_USE_ROUTE}
                        >
                            Пользовательское соглашение
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={WARRANTY_ROUTE}
                        >
                            Гарантия и Сервисы
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterInformation
