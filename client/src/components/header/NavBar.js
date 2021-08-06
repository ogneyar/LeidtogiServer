import React, { useContext } from 'react'
import { Navbar, Nav, Button, Container, Image, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

import { NavLink } from '../myBootstrap'
import { Context } from '../..'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE, LK_ROUTE } from '../../utils/consts'
import logo from '../../assets/logo.png'
import cart from '../../assets/cart.png'

import './NavBar.css';

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
                            {/* <div className="NavBar_Brand">
                                LeidTogi
                            </div> */}

                            <Image width={150} src={logo} className="NavBar_Logo" />

                            <div>
                            Стройте с нами, экономьте время
                            </div>
                            
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
                                    {user.user.role === 'ADMIN' ?
                                        <Button 
                                            variant={'outline-light'} 
                                            onClick={() => history.push(ADMIN_ROUTE)}
                                        >
                                            Админ панель
                                        </Button>
                                    : 
                                        <Button 
                                            variant={'outline-light'} 
                                            onClick={() => history.push(LK_ROUTE)}
                                        >
                                            Личный Кабинет
                                        </Button>
                                    }
                                    
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
