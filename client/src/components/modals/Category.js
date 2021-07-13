import React, { useContext, useState, useEffect } from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap'
import { Context } from '../..'
import { fetchCategories, fetchSubCategories, deleteCategory, createCategory, updateCategory } from '../../http/categoryAPI'
import { observer } from 'mobx-react-lite'
import SubCategory from './SubCategory'



const DeleteCategory = observer(({show, onHide}) => {
    const {category} = useContext(Context)
    const [info, setInfo] = useState([])
    const [subInfo, setSubInfo] = useState([])
    
    const [value, setValue] = useState('')
    const [subValue, setSubValue] = useState('')

    const [toggle, setToggle] = useState(false)


    useEffect(() => {
        fetchCategories().then(data => {
            category.setCategories(data)
            setInfo(category.categories)
        })
    },[])

    const addCategory = () => {
        createCategory(value).then(data => {
            setValue('')
            updateInfo()
            // onHide()
        })        
    }

    
    const delCategory = async (id, name) => {
        let yes = window.confirm(`Вы уверены, что хотите удалить категорию ${name}?`)
        if (yes) {
            await deleteCategory(id)
            updateInfo()
        }
        // onHide()
    }


    const editCategory = (id) => {

        let elementCategory = document.getElementById("category_" + id)
        elementCategory.readOnly = false
        elementCategory.style.cursor = "text"

        let elementButton = document.getElementById("button_" + id)
        elementButton.style.display = "none"

        let elementWarningButton = document.getElementById("button_warning_" + id)
        elementWarningButton.style.display = "flex"

    }


    const editCategoryApply = async (id) => {

        let elementCategory = document.getElementById("category_" + id)
        let newName = elementCategory.value
        elementCategory.style.cursor = "pointer"
        elementCategory.readOnly = true


        let elementButton = document.getElementById("button_" + id)
        elementButton.style.display = "flex"

        let elementWarningButton = document.getElementById("button_warning_" + id)
        elementWarningButton.style.display = "none"

        
        await updateCategory(id, newName)
    }


    const updateInfo = () => {
        fetchCategories().then(data => {
            category.setCategories(data)
            setInfo(category.categories)
        })
    }


    const openSubCategory = (id, target) => {
        setSubInfo([])
        fetchSubCategories(id).then(data => {
            if (data.length > 0) {
                category.setSubCategories(data)
                setSubInfo(category.subCategories)
            }
        })
    }


    const closeSubCategory = (id, target) => {
        setSubInfo([])
    }


    const toggleSubCategory = (id, target) => {
        
        let element = document.getElementById("sub_category_" + id)

        if (element.style.display === "flex") {
            closeSubCategory(id, target)
            element.style.display = "none"
        }else if (element.style.display === "none"){
            element.style.display = "flex"
            openSubCategory(id, target)
        }

    }

    
    const addSubCategory = (id) => {
        createCategory(subValue, id).then(data => {
            setSubValue('')
            updateInfo()
            // onHide()
        })        
    }

    

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактирование категорий
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {info.map(i => 
                        <>
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
                                    id={"category_" + i.id}
                                    onChange={e => {
                                        setInfo(info.map(k => i.id === k.id ? {...k, name:e.target.value} : k))
                                    }}

                                    onClick={e => {
                                        toggleSubCategory(i.id, e.target)
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

                        </Row>


                        {subInfo.map(subI => <SubCategory subInfo={subI} key={subI.id} />)}


                        {/* изначально не видимая форма для добавления подкатегории */}
                        <Form
                            id={"sub_category_" + i.id}
                            style={{display:"none"}}
                        >
                            <Form.Control 
                                className='mt-4 ml-4'
                                value={subValue}
                                onChange={e => setSubValue(e.target.value)}
                                placeholder={'Введите название новой подкатегории'}
                            />
                            <Button 
                                variant="outline-success" 
                                onClick={() => addSubCategory(i.id)}
                                className='mt-4 ml-4'
                            >
                                Добавить
                            </Button>
                        </Form>

                        </>
                    )}
                </Form>

                <Form>
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

            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>

            
        </Modal>
    )
})

export default DeleteCategory
