import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'


const CategoryItem = ({ category, funcOnClick, item }) => {
    
    const [state, setState] = useState(false)
    
    const onClickListItem = () => {
        if (state) setState(false)
        else setState(true)
    }

    return (
        <>
        <ListGroup.Item 
            active={item.id === category.selectedCategory.id}
            onClick={() => {
                funcOnClick(item)
                onClickListItem()
            }}
            key={item.id}
        >
            <div>
                {item.is_product ? item.name : item.name + " +"}
            </div>
        </ListGroup.Item>

            <div
                className="ml-2"
            >
                {state && category.categories.map(i => {
                    if (i.sub_category_id === item.id) 
                        return <CategoryItem key={i.id} category={category} item={i} funcOnClick={funcOnClick}  />
                    return null
                })}
            </div>
        </>
    )
}

export default CategoryItem
