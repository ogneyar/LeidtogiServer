import React from 'react'
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import '../styles/Footer.css';


const Footer = observer(() => {

    return (
        <Navbar 
            bg="secondary" 
            variant="secondary" 
            className="Footer Footer_NavBar Mobile"
        >            
            <Container>
                <Row 
                    className="mt-4 Row"
                >
                    <Col 
                        md={12}
                        className="mb-4"
                    >
                        <NavLink className="NavLink Footer_NavLink"
                            to={SHOP_ROUTE}
                        >
                            © ООО "ЛеидТоги" 2020-{(new Date()).getFullYear()}
                        </NavLink>
                    </Col>
                    <Col 
                        md={12}
                        className="mb-2"
                    >
                        Контакты
                    </Col>
                    <Col 
                        md={12}                            
                        className="mb-2"
                    >
                        Информация
                    </Col>
                    <Col 
                        className="mb-2"
                        md={12}
                    >
                        Мы в сети
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
})

export default Footer
