import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { createCategory } from '../http/categoryAPI'


const CategoryAddService = observer((
    {
        sub_id,     // номер подкатегории
        offset,     // отступ margin
        updateInfo  // передаваемая функция для применения изменений
    }
    ) => {
    
    const { category } = useContext(Context)
    const [value, setValue] = useState('')


    const addCategory = (sub = 0) => {
        createCategory(value, sub).then(data => {
            setValue('')

            updateInfo(sub, data, category.categories)

            // updateInfo(sub, data)
        })        
    }
       
    
    return (
        <Form
            className={offset === null ? "" : "ml-4"}
        >
            <Form.Control 
                className='mt-4'
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={'Введите название новой категории'}
            />
            <Button 
                variant="outline-success" 
                onClick={() => addCategory(sub_id)}
                className='mt-4'
            >
                Добавить категорию
            </Button>
        </Form>                
    )
})

export default CategoryAddService
