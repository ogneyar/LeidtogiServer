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
            className="NavBar"
        >
            <Container 
                className="NavBar_Container"
            >
                <div
                    className="NavBar_Row"
                >
                    <div 
                        className="NavBar_Col"
                        md="auto"
                    >
                        <NavLink className="NavLink NavBar_NavLink"
                            to={SHOP_ROUTE}
                        >

                            <Image src={logo} className="NavBar_Logo" />

                            <div 
                                className="hidden-mobile"
                            >
                                Стройте с нами, экономьте время
                            </div>
                            
                        </NavLink>
                    </div>

                    <div 
                        className="NavBar_Col"
                        md="auto"
                    >
                        <Nav>

                            <NavLink className="NavLink NavBar_Cart"
                                to={CART_ROUTE}
                            >
                                <Image className="NavBar_Cart_Image" src={cart} />
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
                    </div>
                </div>
            </Container>
        </Navbar>
    )
})

export default NavBar
