import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import '../styles/Footer.css';


const Footer = observer(() => {

    return (
        <div className="Footer">
            <Navbar bg="dark" variant="dark" className="Footer_First_NavBar">
                <Container>
                    <NavLink className="NavLink Footer_NavLink"
                        style={{color: 'white'}}
                        to={SHOP_ROUTE}
                    >
                        © ООО "ЛеидТоги" 2020-{(new Date()).getFullYear()}
                    </NavLink>
                </Container>
            </Navbar>

            <Navbar bg="dark" variant="dark" className="Footer_NavBar">
                <Container>
                    ...какой-то текст
                </Container>
            </Navbar>
        </div>
    )
})

export default Footer
