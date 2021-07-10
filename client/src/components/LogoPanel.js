import React from 'react'
import { Container, Image} from 'react-bootstrap'
import logo from '../assets/logo.png'
import '../styles/LogoPanel.css';


const LogoPanel = () => {
    return (
        <Container 
            className="mt-2 p-3 LogoPanel Mobile"
        >
            <Image width={150} src={logo} />
        </Container>
    )
}

export default LogoPanel
