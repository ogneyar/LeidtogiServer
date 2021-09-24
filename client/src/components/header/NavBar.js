import React, { useContext } from 'react'
import { Navbar, Nav, Button, Container, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

import { NavLink } from '../myBootstrap'
import { Context } from '../..'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE, LK_ROUTE } from '../../utils/consts'
import logo from '../../assets/logo.png'
import cart from '../../assets/cart.png'
import { logout } from '../../http/userAPI'

import './NavBar.css';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        // localStorage.removeItem('token')
        console.log(logout());
        history.push(LOGIN_ROUTE)
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
                        className="NavBar_Col_Logo"
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
                        className="NavBar_Col_Buttons"
                    >
                        

                            <NavLink className="NavLink NavBar_Cart"
                                to={CART_ROUTE}
                            >
                                <Image className="NavBar_Cart_Image" src={cart} />
                            </NavLink>
                        <Nav>
                            {user.isAuth ?
                            
                                <>
                                    {user.user?.role === 'ADMIN' ?
                                    <>
                                        <Button 
                                            variant={'outline-light'} 
                                            onClick={() => history.push(ADMIN_ROUTE)}
                                        >
                                            АП
                                        </Button>
                                        <Button 
                                            variant={'outline-light'} 
                                            onClick={() => history.push(LK_ROUTE)}
                                            className="ml-2"
                                        >
                                            ЛК
                                        </Button>
                                    </>
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
