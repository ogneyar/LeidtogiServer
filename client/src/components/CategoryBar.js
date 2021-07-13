import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
import { Context } from '..'



const CategoryBar = observer(() => {
    const {category} = useContext(Context)

    let subCategory = () => {
        category.categories.map(cat => 
            <>
            <ListGroup.Item 
                active={cat.id === category.selectedCategory.id}
                onClick={() => category.setSelectedCategory(cat)}
                key={cat.id}
            >
                {cat.name}
            </ListGroup.Item>
            {/* {cat.id === category.selectedCategory.id && !cat.isProduct
            ?
            <ListGroup.Item 
                active={cat.id === category.selectedCategory.id}
                onClick={() => category.setSelectedCategory(cat)}
                key={cat.id}
            >
                hfghfghf
            </ListGroup.Item>
            :
            <ListGroup.Item />
            } */}
            </>
        )
    }

    return (
        <ListGroup style={{cursor: "pointer"}}>
            <ListGroup.Item 
                active={undefined === category.selectedCategory.id}
                onClick={() => category.setSelectedCategory({})}
                key={0}
            >
                Все категории
            </ListGroup.Item>

            {/* {category.categories.map(i =>console.log(i))} */}
            
            {category.categories !== undefined && category.categories.map(i => 
                <ListGroup.Item 
                    active={i.id === category.selectedCategory.id}
                    onClick={() => category.setSelectedCategory(i)}
                    key={i.id}
                >
                    {i.name}


                    {category.sub_categories !== undefined && category.sub_categories.map(sub_cat => 
                        <ListGroup.Item 
                            active={sub_cat.id === category.selectedCategory.id}
                            onClick={() => category.setSelectedCategory(sub_cat)}
                            key={sub_cat.id}
                        >
                            {sub_cat.name}
                        </ListGroup.Item>
                    )}


                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default CategoryBar
