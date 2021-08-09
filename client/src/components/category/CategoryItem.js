import React, { useState, useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'

import { Context } from '../..'
// import { NavLink } from '../myBootstrap'
import './Category.css'


const CategoryItem = observer(({ funcOnClick, item, onHide }) => {
    
    const { category } = useContext(Context)

    const [open, setOpen] = useState(item?.open)
    
    const onClickListItem = () => {
        category.setCategories(category.categories.map(i => {
            if (i.id === item.id) {
                if (open) {
                    setOpen(false)
                    return {...i,open:false}
                }else {
                    setOpen(true)
                    return {...i,open:true}
                }
            }
            return i
        }))
    }

    return (
        <>
            <NavLink className="CategoryNavLink"
                to={item.url}
            >
                <ListGroup.Item 
                    active={item.id === category.selectedCategory.id}
                    onClick={() => {
                        funcOnClick(item)
                        onClickListItem()
                        if (item.is_product) {
                            if (window.innerWidth > 991) {
                                // window.scrollTo(0,260)
                                $('html, body').animate(
                                    {
                                        scrollTop: 260
                                    }, 
                                    700, 
                                    function(){}
                                )
                            }else onHide()
                        }
                    }}
                    key={item.id}
                >
                    
                    {item.is_product 
                    ? item.name 
                    : <div
                        className="d-flex justify-content-between"
                    >
                        <div>{item.name}</div>
                        <div>
                            {item.open 
                            ? <i className="fa fa-minus-circle" aria-hidden="true"></i> 
                            : <i className="fa fa-plus-circle" aria-hidden="true"></i>}
                        </div>
                        
                    </div>}

                    
                </ListGroup.Item>
            </NavLink>

            <div
                className="ml-2"
            >
                {open && category.categories.map(i => {
                    if (i.sub_category_id === item.id) 
                        return <CategoryItem key={i.id} item={i} onHide={onHide} funcOnClick={funcOnClick}  />
                    return null
                })}
            </div>
        </>
    )
})

export default CategoryItem
