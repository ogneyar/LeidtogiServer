import React from 'react'
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import FooterLogo from './FooterLogo'
import FooterInformation from './FooterInformation'
import FooterSocialNetwork from './FooterSocialNetwork'
import FooterContacts from './FooterContacts'
import End from './End'

import './Footer.css'


const Footer = observer(() => {

    return (
        <>
            <Navbar 
                bg="secondary" 
                variant="secondary" 
                className="Footer" 
                id="Footer"
            >      
                <Container
                    className="Container text-center border-secondary"
                >
                    <Row className="Row mt-4">
                        <Col className="Col mb-4" >
                            <FooterLogo />
                        </Col>    
                        <Col className="Col mb-4" md={3}>
                            <FooterInformation />
                        </Col>
                        <Col className="Col mb-4" md={3}>
                            <FooterSocialNetwork />
                        </Col>
                        <Col className="Col mb-4" md={3}>
                            <FooterContacts />
                        </Col>
                    </Row>
                </Container>
            </Navbar>

            <End />
        </>
    )
})

export default Footer
