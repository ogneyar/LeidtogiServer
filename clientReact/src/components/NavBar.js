import React, { useContext } from 'react'
import { Context } from '..'
import { Navbar, Nav, Button, Container, Image } from 'react-bootstrap'
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
        <Navbar bg="dark" variant="dark" className="NavBar">
            <Container>
                <NavLink className="NavLink"
                    style={{color: 'white', textDecoration: 'none'}} 
                    to={SHOP_ROUTE}
                >
                    <div className="NavBar_Brand">
                        LeidTogi
                    </div>
                    
                    Стройте с нами, экономьте время
                    
                </NavLink>

                <Nav className="ml-auto">

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
                
            </Container>
            
        </Navbar>
    )
})

export default NavBar
