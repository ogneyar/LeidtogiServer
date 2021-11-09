import React from 'react'
import { Image } from 'react-bootstrap'

import { SHOP_ROUTE } from '../../utils/consts'
import { NavLink } from '../myBootstrap'
import logo from '../../assets/logo.png'
import './FooterLogo.css'


const FooterLogo = () => {
    
    return (
        <div
            className="FooterLogo"
        >
            <NavLink className="NavLink"
                to={SHOP_ROUTE}
            >
                <Image className="FooterLogoImage" src={logo} />
            </NavLink>
        </div> 
    )
}

export default FooterLogo
