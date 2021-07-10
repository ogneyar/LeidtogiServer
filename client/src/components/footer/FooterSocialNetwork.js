import React from 'react'
import { NavLink } from 'react-router-dom'

import {    
    ABOUT_US_ROUTE, DELIVERY_ROUTE, PAYMENT_ROUTE, PRIVACY_POLICY_ROUTE, RETURNS_POLICY_ROUTE,
    TERMS_OF_USE_ROUTE, WARRANTY_ROUTE
} from '../../utils/consts'

import './FooterSocialNetwork.css'

const FooterSocialNetwork = () => {
    return (
        <div
            className="FooterSocialNetwork"
        >
            <div className="footer-title">
				<h3>Мы в сети</h3>
			</div>
            <div className="footer-static-content">
                <ul className="togle-footer">
                    <li>   
                        <a
                            className="NavLink Footer_NavLink Footer_NavLink_SocialNetwork"
                            href="https://vk.com"
                        >
                            Мы в ВК
                        </a>
                    </li>
                    <li>
                        <a
                            className="NavLink Footer_NavLink Footer_NavLink_SocialNetwork"
                            href="https://ok.com"
                        >
                            Мы в ОК
                        </a>
                    </li>
                    <li>
                        <a
                            className="NavLink Footer_NavLink Footer_NavLink_SocialNetwork"
                            href="https://youtube.com"
                        >
                            Мы на YouTube
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterSocialNetwork
