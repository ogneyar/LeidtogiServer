import React, { useState, useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import $ from 'jquery'

import { SCROLL_TOP } from '../../utils/consts'
import { Context } from '../..'

import './CategoryService.css'


const CategoryItemService = observer((props) => {
    
    const { category } = useContext(Context)
    const history = useHistory()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(props.item.open)
    },[props?.item?.open])
    
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
        >
            <ListGroup.Item 
                active={props?.item?.id === category.selectedCategory.id}
                onClick={(e) => {
                    // console.log(e);
                    props.funcOnClick(props?.item)
                    history.push(props?.item?.url)
                    onClickListItem()
                    if (window.innerWidth > 991) {
                        // window.scrollTo(0,260)
                        $('html, body').animate(
                            {
                                scrollTop: SCROLL_TOP
                            }, 
                            700, 
                            function(){}
                        )
                    }else if (props?.item?.is_product) props?.onHide()
                }}
                key={props?.item?.id}
            >
                
                {props?.item?.is_product 
                ? props.item.name 
                : <div
                    className="d-flex justify-content-between"
                >
                    <div>{props?.item?.name}</div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            onClickListItem()
                        }}
                    >
                        {props?.item?.open 
                        ? <i className="fa fa-minus-circle" aria-hidden="true"></i> 
                        : <i className="fa fa-plus-circle" aria-hidden="true"></i>}
                    </div>
                    
                </div>}
            </ListGroup.Item>

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
