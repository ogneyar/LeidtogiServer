
import React, { useContext, useState, useEffect } from 'react'
import {Modal, Button, Form, Dropdown, Row, Col} from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import { createProduct, fetchProducts } from '../../http/productAPI'
import {fetchCategories} from '../../http/categoryAPI'
import { fetchBrands } from '../../http/brandAPI'


const Product = observer(({show, onHide}) => {
    const {product, category, brand} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    // const [brand, setBrand] = useState(null)
    // const [type, setType] = useState(null)

    const [info, setInfo] = useState([])
    const [infoCategory, setInfoCategory] = useState([])

    useEffect(() => {
        fetchCategories().then(data => {
            category.setCategories(data)
            setInfoCategory(category.categories)
        })
        fetchBrands().then(data => brand.setBrands(data))
    },[])


    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]) 
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]:value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const addProduct = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', brand.selectedBrand.id)
        formData.append('categoryId', category.selectedCategory.id)
        formData.append('info', JSON.stringify(info))

        await createProduct(formData).then(data => onHide())

        fetchProducts().then(data => product.setProducts(data))
        category.setSelectedCategory({})
        brand.setSelectedBrand({})
    }

    const onClickSelectedCategory = (cat) => {
        if (cat.is_product) category.setSelectedCategory(cat)
        else {
            fetchCategories(cat.id).then(data => {
                setInfoCategory([{id:0, name:"Назад..."}, ...data])
            })
        }
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
                    Добавить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{category.selectedCategory.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {infoCategory !== undefined 
                            ?
                                infoCategory.map(cat =>
                                    <Dropdown.Item 
                                        onClick={() => onClickSelectedCategory(cat)} 
                                        key={cat.id}
                                    >
                                        {cat.name}
                                    </Dropdown.Item>
                                )
                            : null}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{brand.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brand.brands.map(br =>
                                <Dropdown.Item 
                                    onClick={() => brand.setSelectedBrand(br)} 
                                    key={br.id}
                                >
                                    {br.name}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-3'
                        placeholder={'Введите название устройства'}
                    />
                    <Form.Control 
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className='mt-3'
                        placeholder={'Введите стоимость устройства'}
                        type="number"
                    />
                    <Form.Control 
                        className='mt-3'
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row
                            className='mt-4'
                            key={i.number}
                        >
                            <Col md={4}>
                                <Form.Control    
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder={'Введите название свойства'}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control   
                                    value={i.description}    
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder={'Введите описание свойства'}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>   
                    )}
                </Form>            
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default Product
