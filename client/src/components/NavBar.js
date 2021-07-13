import React, { useContext } from 'react'
import { Context } from '..'
import { Navbar, Nav, Button, Container, Image, Row, Col } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import cart from '../assets/cart.png'

import '../styles/NavBar.css';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', {})
    }

    return (
        <Navbar 
            bg="secondary" 
            variant="secondary" 
            className="NavBar Mobile"            
        >
            <Container>
                <Row
                    className="mt-2 mb-2 Row"
                >
                    <Col 
                        className="d-flex align-items-center mt-2 mb-2"
                        md="auto"
                    >
                        <NavLink className="NavLink NavBar_NavLink"
                            to={SHOP_ROUTE}
                        >
                            <div className="NavBar_Brand">
                                LeidTogi
                            </div>                    
                            Стройте с нами, экономьте время                    
                        </NavLink>
                    </Col>

                    <Col 
                        className="ml-auto d-flex align-items-center justify-content-end mt-2 mb-2"
                        md="auto"
                    >
                        <Nav >

                            <NavLink className="NavLink"
                                to={CART_ROUTE}
                            >
                                <Image className="NavBar_Image" src={cart} />
                            </NavLink>

                            {user.isAuth ?
                            
                                <>
                                    <Button 
                                        variant={'outline-light'} 
                                        onClick={() => history.push(ADMIN_ROUTE)}
                                    >
                                        Админ панель
                                    </Button>
                                    <Button 
                                        variant={'outline-light'} 
                                        onClick={logOut} 
                                        className="ml-2"
                                    >
                                        Выйти
                                    </Button>
                                </>
                            :
                            

                                <Button 
                                    onClick={() => history.push(LOGIN_ROUTE)}
                                    variant={'outline-light'}
                                >
                                    Авторизация
                                </Button>
                            
                            }

                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
})

export default NavBar
