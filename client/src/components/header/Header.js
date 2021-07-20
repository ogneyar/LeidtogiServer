import React from 'react'
import Top from './Top'
import NavBar from './NavBar'
import Aside from './Aside'
import Banner from './Banner'

import './Header.css'


const Header = () => {
    return (
        <header
            className="Header"
        >
            <Top />
            <NavBar />
            <Aside />
            {/* <Banner /> */}
        </header>
    )
}

export default Header
