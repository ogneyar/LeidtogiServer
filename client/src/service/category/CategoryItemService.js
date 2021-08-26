import React, { useState, useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'

import { Context } from '../..'
// import { NavLink } from '../myBootstrap'
import './CategoryService.css'


const CategoryItemService = observer((props) => {
    
    const { category } = useContext(Context)

    const [open, setOpen] = useState(props?.item?.open)
    
    const onClickListItem = () => {
        category.setCategories(category.categories.map(i => {
            if (i.id === props?.item?.id) {
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
        <div
            className="CategoryItemService"
            // style={{borderLeft:"1px solid var(--main-white-color)"}}
        >
            <NavLink className="CategoryNavLink"
                to={props?.item?.url}
                >
                <ListGroup.Item 
                    active={props?.item?.id === category.selectedCategory.id}
                    onClick={() => {
                        props.funcOnClick(props?.item)
                        onClickListItem()
                        if (props?.item?.is_product) {
                            if (window.innerWidth > 991) {
                                // window.scrollTo(0,260)
                                $('html, body').animate(
                                    {
                                        scrollTop: 240
                                    }, 
                                    700, 
                                    function(){}
                                )
                            }else props?.onHide()
                        }
                    }}
                    key={props?.item?.id}
                >
                    
                    {props?.item?.is_product 
                    ? props.item.name 
                    : <div
                        className="d-flex justify-content-between"
                    >
                        <div>{props?.item?.name}</div>
                        <div>
                            {props?.item?.open 
                            ? <i className="fa fa-minus-circle" aria-hidden="true"></i> 
                            : <i className="fa fa-plus-circle" aria-hidden="true"></i>}
                        </div>
                        
                    </div>}

                    
                </ListGroup.Item>
            </NavLink>

            <div
                className="ml-3"
            >
                {open && category.categories.map(i => {
                    if (i.sub_category_id === props?.item.id) 
                        return <CategoryItemService key={i.id} item={i} onHide={props?.onHide} funcOnClick={props?.funcOnClick}  />
                    return null
                })}
            </div>
        </div>
    )
})

export default CategoryItemService
