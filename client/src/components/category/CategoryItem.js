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
            {/* {item.is_product ? "- " + item.name : "+ " + item.name} */}
            {item.name}
        </ListGroup.Item>

            <div
                className="ml-2"
            >
                {state && category.categories.map(i => {
                    if (i.sub_category_id === item.id) return (
                        <ListGroup.Item 
                            // active={sub_cat.id === category.selectedCategory.id}
                            // onClick={() => onClickSelectedCategory(sub_cat)}
                            key={i.id}
                        >
                            {i.name}
                        </ListGroup.Item>
                    )
                    return null
                })}
            </div>
        </>
    )
}

export default CategoryItem
