import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import CategoryModal from './CategoryModal'
import CategoryItem from './CategoryItem'
import { SHOP_ROUTE } from '../../utils/consts'
// import { NavLink } from '../myBootstrap'

import { Context } from '../..'
import './Category.css'
import CategoryBar from './CategoryBar'


const Category = observer(() => {

    const [categoryVisible, setCategoryVisible] = useState(false)


    return (
        <div
            className="Category"
        >
            <div
                className="CategoryBarPC"
                id="CategoryBarPC"
            >
                <CategoryBar />
            </div>
            

            <div
                className="CategoryBarMobile"
                id="CategoryBarMobile"
            >
                <label
                    onClick={() => setCategoryVisible(true)}
                >
                    Категории <i className="fa fa-bars" aria-hidden="true"></i>
                </label>
                
                <CategoryModal show={categoryVisible} onHide={() => setCategoryVisible(false)}/>

            </div>
        </div>
    )
})

export default Category
