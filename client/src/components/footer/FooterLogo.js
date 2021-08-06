import React from 'react'
import { Image } from 'react-bootstrap'

import { SHOP_ROUTE } from '../../utils/consts'
import { NavLink } from '../myBootstrap'
import logo from '../../assets/logo.png'
import './FooterLogo.css'


const FooterLogo = () => {
    
    return (
        <NavLink className="NavLink"
            to={SHOP_ROUTE}
        >
            <div
                className="FooterLogo"
            >
                <Image width={150} src={logo} />
            </div> 
        </NavLink>
    )
}

export default FooterLogo
