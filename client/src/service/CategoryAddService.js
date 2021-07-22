import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { createCategory } from '../http/categoryAPI'


const CategoryAddService = observer(({
        sub_id,     // номер подкатегории
        offset,     // отступ margin или обозначение вложенности сервиса
        updateInfo  // передаваемая функция для применения изменений
    }) => {
    
    const [value, setValue] = useState('')


    const addCategory = () => {
        createCategory(value, sub_id).then(data => { 
            setValue('')

            updateInfo(sub_id, data, "context", offset) 

            updateInfo(sub_id, data, "state", offset)
        })        
    }
       
    
    return (
        <Form
            className={offset === "null" ? "" : "ml-4"}
        >
            <Form.Control 
                className='mt-4'
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={'Введите название новой категории'}
            />
            <Button 
                variant="outline-success" 
                onClick={addCategory}
                className='mt-4'
            >
                Добавить категорию
            </Button>
        </Form>                
    )
})

export default CategoryAddService
