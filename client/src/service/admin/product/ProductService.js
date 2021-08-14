import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, Dropdown, Row, Col, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { createProduct, fetchProducts, updateAllProduct } from '../../../http/productAPI'
import { fetchAllCategories } from '../../../http/categoryAPI'
import { fetchBrands } from '../../../http/brandAPI'
import { Context } from '../../..'

import './ProductService.css'


const ProductService = observer((props) => {
    
    const {product, category, brand} = useContext(Context)

    const action = props?.action // add or edit
    
    const [name, setName] = useState(props?.name || '')
    const [price, setPrice] = useState(props?.price || "")
    const [file, setFile] = useState(null)
    const [fileReader, setFileReader] = useState(props?.file || null)
    
    const [have, setHave] = useState(props?.have || 1)
    const [article, setArticle] = useState(props?.article || "")
    const [description, setDescription] = useState(props?.description || "")
    const [promo, setPromo] = useState(props?.promo || "")
    const [country, setCountry] = useState(props?.country || "")

    const [size, setSize] = useState({})
    const [info, setInfo] = useState([])

    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        // fetchCategories().then(data => {
        //     category.setCategories(data)
        // })
        fetchAllCategories().then(data => {
            setAllCategories(data)
        })
        fetchBrands().then(data => {
            brand.setBrands(data)
            brand.setSelectedBrand(data[0])
        })
    },[])

    useEffect(() => {
        setInfo(props?.info)
    },[props?.info])

    useEffect(() => {
        setSize(props?.size)
    },[props?.size])

    const openSize = () => {
        setSize({weight: "", volume: "", width: "", height: "", length: ""}) 
    }
    const changeSize = (key, value) => {
        // console.log({...size, [key]: value});
        setSize({...size, [key]: value}) 
    }

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
        let reader = new FileReader()
        reader.onload = function(e) {
              setFileReader(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
        setFile(e.target.files[0])
    }

    const addProduct = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)

        formData.append('have', have)
        formData.append('article', article)
        formData.append('description', description)
        formData.append('promo', promo)
        formData.append('country', country)
        formData.append('size', JSON.stringify(size))

        formData.append('brandId', brand.selectedBrand.id)
        formData.append('categoryId', category.selectedCategory.id)
        formData.append('info', JSON.stringify(info))

        await createProduct(formData).then(data => props?.back())

        fetchProducts().then(data => product.setProducts(data))
        category.setSelectedCategory({})
        // brand.setSelectedBrand({})
    }

    const editProduct = async (id) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)

        formData.append('have', have)
        formData.append('article', article)
        formData.append('description', description)
        formData.append('promo', promo)
        formData.append('country', country)
        formData.append('size', JSON.stringify(size))

        formData.append('brandId', brand.selectedBrand.id)
        formData.append('categoryId', category.selectedCategory.id)
        formData.append('info', JSON.stringify(info))

        await updateAllProduct(id, formData).then(data => props?.back())

        fetchProducts().then(data => product.setProducts(data))
        category.setSelectedCategory({})
    }


    const reItemCategory = (sub = 0, offset = "") => { // рекурсивная функция, для получения списка категорий
        return  allCategories.map(i => {
            if (i.sub_category_id === sub)
                return (
                    <>
                    <Dropdown.Item 
                        onClick={() =>  category.setSelectedCategory(i)} 
                        disabled={i.is_product ? false : true}
                        key={i.id}
                    >
                        {offset + i.name}
                    </Dropdown.Item>
                    {reItemCategory(i.id, offset + "-- ")}
                    </>
                )
        })
    }


    return (
        <Form  className="mb-2">
            <div className="inputBox d-flex">
                <div className=''>
                    <label>Категория:</label>
                    <Dropdown >
                        <Dropdown.Toggle>{category.selectedCategory.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {allCategories !== undefined 
                            ? reItemCategory()
                            : null}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='ml-2'>
                    <label>Бренд:</label>
                    <Dropdown >
                        <Dropdown.Toggle>{brand.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brand.brands.map((br, index) => 
                                <Dropdown.Item 
                                    onClick={() => brand.setSelectedBrand(br)} 
                                    key={br.id}
                                    active={br.id === brand.selectedBrand.id}
                                >
                                    {br.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="inputBox">
                <label>Название инструмента: (модель)</label>
                <Form.Control 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className=''
                    placeholder={'Введите название инструмента'}
                />
            </div>
            <div className="inputBox">
                <label>Стоимость инструмента:</label>
                <Form.Control 
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className=''
                    placeholder={'Введите стоимость инструмента'}
                    type="number"
                />
            </div>
            <div className="inputBox fileBox">
                <div>
                    <label>Изображение инструмента:</label>
                    <Form.Control 
                        className=''
                        type="file"
                        onChange={selectFile}
                    />
                </div>
                <div>
                    {fileReader ? <Image src={fileReader} width="100" height="100" /> : null}
                </div>
                
            </div>
            <div className="inputBox">
                <label>В наличие: </label>
                <Dropdown className=''>
                    <Dropdown.Toggle>{have ? "Есть" : "Нет"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item 
                            onClick={() => setHave(1)} 
                            active={have}
                            key={have}
                        >
                            Есть
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setHave(0)} 
                            active={!have}
                            key={!have}
                        >
                            Нет
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="inputBox">
                <label>Артикул инструмента:</label>
                <Form.Control 
                    value={article}
                    onChange={e => setArticle(e.target.value)}
                    className=''
                    placeholder={'Введите артикул инструмента'}
                />
            </div>
            <div className="inputBox">
                <label>Описание инструмента: (не обязательно)</label>
                <Form.Control 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className=''
                    placeholder={'Введите описание инструмента'}
                />
            </div>
            <div className="inputBox">
                <label>Акционное предложение:</label>
                <Form.Control 
                    value={promo}
                    onChange={e => setPromo(e.target.value)}
                    className=''
                    placeholder={'Введите акционное предложение'}
                />
            </div>
            <div className="inputBox">
                <label>Страна производителя:</label>
                <Form.Control 
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className=''
                    placeholder={'Введите страну производителя'}
                />
            </div>
            {size?.weight || size?.weight === "" 
            ?
                <Row
                    className='mt-4'
                >
                    <Col md={4} className='mb-4'>
                        <Form.Control    
                            value={size.weight}
                            onChange={(e) => changeSize('weight', e.target.value)}
                            placeholder={'Введите вес'}
                            type="number"
                            min="0"
                            step="0.1"
                        />
                    </Col>
                    <Col md={4} className='mb-4'>
                        <Form.Control    
                            value={size.volume}
                            onChange={(e) => changeSize('volume', e.target.value)}
                            placeholder={'Введите объём'}
                            type="number"
                            min="0"
                            step="0.1"
                        />
                    </Col>
                    <Col md={4} className='mb-4'>
                        <Form.Control    
                            value={size.width}
                            onChange={(e) => changeSize('width', e.target.value)}
                            placeholder={'Введите ширину'}
                            type="number"
                            min="0"
                            step="0.1"
                        />
                    </Col>
                    <Col md={4} className='mb-4'>
                        <Form.Control    
                            value={size.height}
                            onChange={(e) => changeSize('height', e.target.value)}
                            placeholder={'Введите высоту'}
                            type="number"
                            min="0"
                            step="0.1"
                        />
                    </Col>
                    <Col md={4} className='mb-4'>
                        <Form.Control   
                            value={size.length}    
                            onChange={(e) => changeSize('length', e.target.value)}
                            placeholder={'Введите длину'}
                            type="number"
                            min="0"
                            step="0.1"
                        />
                    </Col>
                    <Col md={4} className='mb-4'>
                        <Button
                            variant="outline-danger"
                            onClick={() => setSize({})}
                        >
                            Отменить
                        </Button>
                    </Col>
                </Row>   
            :
                <Button
                    className='mt-4'
                    variant="outline-dark"
                    onClick={openSize}
                >
                    Задать габариты
                </Button>
            }

            <hr />

            <Button
                variant="outline-dark"
                onClick={addInfo}
            >
                Добавить характеристику
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

            <hr />

            <div className='d-flex justify-content-end mb-4'>
                {action === "add" 
                ?
                    <Button variant="outline-success" onClick={addProduct}>Добавить продукцию</Button>
                :
                    <Button variant="outline-success" onClick={() => editProduct(props?.id)}>Изменить продукцию</Button>
                }
            </div>

           

            {/* <div className='d-flex justify-content-end'>                
                    <Button variant="outline-warning" onClick={props?.back}>
                        {action === "add" 
                        ?
                            "Отменить добавление"
                        :
                            "Отменить изменения"
                        }
                    </Button>
                
            </div> */}

            <hr />

        </Form>
    );
})

export default ProductService;
