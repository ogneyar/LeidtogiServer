import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchCategories, deleteCategory, createCategory, updateCategory } from '../http/categoryAPI'


const CategoryService = observer(({information, idName, offset, sub_id}) => {
    
    const { category } = useContext(Context)
    const [info, setInfo] = useState(information)
    const [value, setValue] = useState('')

    // useEffect(() => {
    //     setInfo(information)
    // },[])
    

    const addCategory = (sub = 0) => {
        createCategory(value, sub).then(data => {
            setValue('')

            // let array = info
            // if (sub === 0)  {
            //     category.setCategories(array.push(data[0]))
            // }else {
            //     category.setCategories(array.map(i => {
            //         if (i.sub !== undefined) {
            //             return funcMap(i, sub, data)
            //         }else return i
            //     }))
            // }

            // setInfo(category.categories)

            setTimeout(()=>{console.log(info)},1000)

            // onHide()
        })        
    }
    
    function funcMap(array, sub, data) {
        if (array.sub.sub_category_id === sub) {
            return array.sub.push(data[0])
        }else {
            return array.map(i => {
                if (i.sub !== undefined) {
                    return funcMap(i, sub, data)
                }else return i
            })
        }
    }
    
    const delCategory = async (id, name) => {
        let yes = window.confirm(`Вы уверены, что хотите удалить категорию ${name}?`)
        if (yes) {
            await deleteCategory(id)
            
            // category.setCategories(funcFilter(category.categories, id))

            // setInfo(category.categories)

            setTimeout(()=>{console.log(info)},1000)
        }
        // onHide()
    }

    function funcFilter(array, id) {
        
        return array.filter(i => {
            if (i.sub !== undefined) {
                this.func(i.sub, id)
            }else if (i.id !== id){
                return true
            }
            return false
        })
        
    }
    

    const editCategory = (id) => {

        let elementCategory = document.getElementById(idName + id)
        elementCategory.readOnly = false
        elementCategory.style.cursor = "text"

        let elementButton = document.getElementById("button_" + id)
        elementButton.style.display = "none"

        let elementWarningButton = document.getElementById("button_warning_" + id)
        elementWarningButton.style.display = "flex"

    }

    const editCategoryApply = async (id) => {

        let elementCategory = document.getElementById(idName + id)
        let newName = elementCategory.value
        elementCategory.style.cursor = "pointer"
        elementCategory.readOnly = true


        let elementButton = document.getElementById("button_" + id)
        elementButton.style.display = "flex"

        let elementWarningButton = document.getElementById("button_warning_" + id)
        elementWarningButton.style.display = "none"

        
        await updateCategory(id, newName)
    }

    const openSubCategory = async (id) => {
        fetchCategories(id).then(data => {
            if (data.length > 0) {
                category.setCategories(category.categories.map(i => i.id === id ? {...i, sub:data} : i))
                setInfo(category.categories)
            }
        })
    }

    const toggleSubCategory = async (id) => {
        let element = document.getElementById("sub_" + idName + id)
        if (element.style.display === "flex") {
            element.style.display = "none"
        }else if (element.style.display === "none"){
            openSubCategory(id)
            element.style.display = "flex"
        }
    }

    
    return (
    <div
        className={offset === null ? "" : "ml-4"}
    >
        <div>
            {info && info.map(i => 
                <Row
                    className='mt-4'
                    key={i.id}
                >
                    <Col md={5}>
                        <Form.Control 
                            className='mt-1'
                            style={{cursor:'pointer'}}
                            value={i.name}
                            // disabled={true}
                            readOnly={true}
                            id={idName + i.id}
                            onChange={e => {
                                setInfo(info.map(k => i.id === k.id ? {...k, name:e.target.value} : k))
                            }}
                            onClick={e => {
                                toggleSubCategory(i.id)
                            }}
                            title="Показать подкатегории"
                        />
                    </Col>
                    
                    <Col md={3}>
                        <Button
                            variant="outline-primary"
                            onClick={() => editCategory(i.id)}
                            className='mt-1'
                            id={"button_" + i.id}
                        >
                            Изменить...
                        </Button>

                        <Button
                            variant="outline-warning"
                            onClick={() => editCategoryApply(i.id)}
                            style={{display:"none"}}
                            className='mt-1'
                            id={"button_warning_" + i.id}
                        >
                            Применить
                        </Button>
                    </Col>

                    <Col md={3}>
                        <Button
                            variant="outline-danger"
                            onClick={() => delCategory(i.id, i.name)}
                            className='mt-1'
                        >
                            Удалить
                        </Button>
                    </Col>


                    {/* изначально не видимая форма для добавления подкатегории */}
                    <div 
                        id={"sub_"+ idName + i.id}
                        style={{display:"none"}}
                        className="flex-column "
                    >
                        {i.sub !== undefined 
                        ?
                            <CategoryService information={i.sub} idName={"sub_"+idName} sub_id={i.id} />
                        : 
                            // <div />
                            // <CategoryService information={[]} idName={"sub_"+idName} sub_id={i.id} />

                            <Form
                                className="ml-4"
                            >
                                <Form.Control 
                                    className='mt-4'
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                    placeholder={'Введите название новой категории'}
                                />
                                <Button 
                                    variant="outline-success" 
                                    onClick={() => addCategory(i.id)}
                                    className='mt-4'
                                >
                                    Добавить категорию
                                </Button>
                            </Form>
                        }
                    </div>

                </Row>

            )}
        </div>

        <Form>
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

    </div>
                
    )
})

export default CategoryService
