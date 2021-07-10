import React from 'react'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../../utils/consts'
import './End.css'

const End = () => {
    return (
        <div
            className="End"
        >
            <NavLink className="NavLink FooterEnd_NavLink"
                to={SHOP_ROUTE}
            >
                © ООО "ЛеидТоги" 2020-{(new Date()).getFullYear()}
            </NavLink>
        </div>
    )
}

export default End
