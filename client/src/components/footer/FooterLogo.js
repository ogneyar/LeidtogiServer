import React from 'react'
import { Image } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import './FooterLogo.css'


const FooterLogo = () => {
    return (
        <div
            className="FooterLogo"
        >
            <Image width={150} src={logo} />
        </div>
    )
}

export default FooterLogo
