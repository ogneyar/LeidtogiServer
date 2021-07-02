import React, { useContext } from 'react'
import { Context } from '..'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'


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
                <NavLink 
                    style={{color: 'white'}} 
                    to={SHOP_ROUTE}
                >
                    КупиДевайс
                </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
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
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button 
                            onClick={() => history.push(LOGIN_ROUTE)}
                            variant={'outline-light'}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
})

export default NavBar
