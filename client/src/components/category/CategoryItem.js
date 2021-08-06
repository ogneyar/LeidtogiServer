import React, { useState, useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
// import { NavLink } from 'react-router-dom'

import { Context } from '../..'

import { NavLink } from '../myBootstrap'
import './Category.css'


const CategoryItem = observer(({ funcOnClick, item }) => {
    
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
        // if (open) setOpen(false)
        // else setOpen(true)
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
                        // window.scrollTo(0,0);
                    }}
                    key={item.id}
                >
                    
                    {item.is_product ? item.name : item.name + " +"}

                    
                </ListGroup.Item>
            </NavLink>

            <div
                className="ml-2"
            >
                {open && category.categories.map(i => {
                    if (i.sub_category_id === item.id) 
                        return <CategoryItem key={i.id} item={i} funcOnClick={funcOnClick}  />
                    return null
                })}
            </div>
        </>
    )
})

export default CategoryItem
