import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
import { Context } from '..'



const CategoryBar = observer(() => {
    const {category} = useContext(Context)

    let subCategory = () => {
        category.categoryes.map(cat => 
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
            {category.categoryes.map(cat => 
                <ListGroup.Item 
                    active={cat.id === category.selectedCategory.id}
                    onClick={() => category.setSelectedCategory(cat)}
                    key={cat.id}
                >
                    {cat.name}


                    {category.sub_categoryes.map(sub_cat => 
                        <ListGroup.Item 
                            active={sub_cat.id === category.selectedCategory.id}
                            onClick={() => category.setSelectedCategory(cat)}
                            key={sub_cat.id}
                        >
                            {sub_cat.name}
                            {/* {subCategory()} */}
                        </ListGroup.Item>
                    )}


                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default CategoryBar
