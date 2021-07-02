import React from 'react'
import { Container, Image } from 'react-bootstrap'
import logo from '../assets/logo.png'
import '../styles/LogoPanel.css';


const LogoPanel = () => {
    return (
        <Container className="LogoPanel">
            <Image width={150} src={logo} />
        </Container>
    )
}

export default LogoPanel
