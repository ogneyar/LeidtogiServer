import React, { useState, useEffect, useContext } from 'react'
import { Button } from '../../components/myBootstrap'
import { Context } from '../..'

import './CategoryService.css'


const CategoryService = () => {

    const { category } = useContext(Context)

    const [ info, setInfo ] = useState([])

    useEffect(() => {
        setInfo(category.categories)
    },[])

    const onClikButtonCategory = () => {

    }

    
    return (
        <div
            className="CategoryService"
        >
            {info.map(i => {

                return (
                    <Button
                        key={i.id}
                        onClik={() => onClikButtonCategory(i.id)}
                    >
                        {i.name}
                    </Button>
                )

            })}
        </div>
    )
}

export default CategoryService
