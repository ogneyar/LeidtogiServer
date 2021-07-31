import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
import { Context } from '../..'
// import { Button } from '../myBootstrap'
import './CategoryBar.css'
import CategoryModal from './CategoryModal'
// import { fetchCategories } from '../../http/categoryAPI'
import CategoryItem from './CategoryItem'


const CategoryBar = observer(() => {
    const { brand, category } = useContext(Context)
    // const [ info, setInfo ] = useState(category.categories)

    const [categoryVisible, setCategoryVisible] = useState(false)

    useEffect(() => {
    },[])


    const onClickSelectedCategory = (id) => {
        brand.setSelectedBrand({})
        category.setSelectedCategory(id)
    }

    return (
        <>
        <ListGroup 
            className="CategoryBar"
            id="CategoryBarFull"
        >
            <ListGroup.Item 
                active={undefined === category.selectedCategory.id}
                onClick={() => onClickSelectedCategory({})}
                key={0}
            >
                Все категории
            </ListGroup.Item>
            
            {category.categories && Array.isArray(category.categories) && category.categories.map(i => {
                if (i.sub_category_id === 0)
                    return <CategoryItem key={i.id} category={category} item={i} funcOnClick={onClickSelectedCategory} />
                return null
            })}
        </ListGroup>

        <div
            className="CategoryBar"
            id="CategoryBarMobile"
        >
            <label
                onClick={() => setCategoryVisible(true)}
            >
                Категории <i className="fa fa-bars" aria-hidden="true"></i>
            </label>
            
            <CategoryModal show={categoryVisible} onHide={() => setCategoryVisible(false)}/>

        </div>
        </>
    )
})

export default CategoryBar
