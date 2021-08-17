import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import CategoryItemService from './CategoryItemService'
import { SHOP_ROUTE } from '../../utils/consts'
// import { NavLink } from '../myBootstrap'

import { Context } from '../..'
import './CategoryService.css'


const CategoryService = observer((props) => {
    
    const { product, category } = useContext(Context)

    const onClickSelectedCategory = (id) => {
        category.setSelectedCategory(id)
        product.setPage(1)
    }

    return (
        <ListGroup 
            className="CategoryService"
        >
            <NavLink className="CategoryNavLink"
                to={SHOP_ROUTE}
            >
                <ListGroup.Item 
                    active={props?.search ? false : category.selectedCategory.id === undefined}
                    onClick={() => onClickSelectedCategory({})}
                    key={0}
                >
                    Все категории
                </ListGroup.Item>
            </NavLink>

            {category.categories && Array.isArray(category.categories) && category.categories.map(i => {
                if (i.sub_category_id === 0)
                    return <CategoryItemService key={i.id} item={i} onHide={props?.onHide} funcOnClick={onClickSelectedCategory} />
                return null
            })}
        </ListGroup>
    )
})

export default CategoryService