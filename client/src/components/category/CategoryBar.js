import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'

import CategoryModal from './CategoryModal'
import CategoryItem from './CategoryItem'
import { SHOP_ROUTE } from '../../utils/consts'
import { NavLink } from '../myBootstrap'

import { Context } from '../..'
import './Category.css'


const CategoryBar = observer(() => {
    
    const { brand, category } = useContext(Context)

    const [categoryVisible, setCategoryVisible] = useState(false)

    useEffect(() => {
    },[])


    const onClickSelectedCategory = (id) => {
        // brand.setSelectedBrand({})
        category.setSelectedCategory(id)
    }

    return (
        <div
            className="CategoryBar"
        >
        <ListGroup 
            className="CategoryBarPC"
            id="CategoryBarPC"
        >
            <NavLink className="CategoryNavLink"
                to={SHOP_ROUTE}
            >
                <ListGroup.Item 
                    active={undefined === category.selectedCategory.id}
                    onClick={() => onClickSelectedCategory({})}
                    key={0}
                >
                    Все категории
                </ListGroup.Item>
            </NavLink>

            {category.categories && Array.isArray(category.categories) && category.categories.map(i => {
                if (i.sub_category_id === 0)
                    return <CategoryItem key={i.id} item={i} funcOnClick={onClickSelectedCategory} />
                return null
            })}
        </ListGroup>

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

export default CategoryBar
