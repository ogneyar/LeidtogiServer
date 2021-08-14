import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, Dropdown, Row, Col, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { createProduct, fetchProducts, updateAllProduct } from '../../../http/productAPI'
import { fetchAllCategories } from '../../../http/categoryAPI'
import { fetchBrands } from '../../../http/brandAPI'
import { Context } from '../../..'

import Characteristic from './Characteristic'
import Size from './Size'

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
    const [country, setCountry] = useState(props?.country || "Германия")

    const [size, setSize] = useState({weight: "", volume: "", width: "", height: "", length: ""})
    const [info, setInfo] = useState({title: "Характеристики", description: ""})

    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        fetchAllCategories().then(data => {
            setAllCategories(data)
        })
        fetchBrands().then(data => {
            brand.setBrands(data)
            brand.setSelectedBrand(data[0])
        })
    },[])

    useEffect(() => {
        if (props.info?.title) setInfo(props?.info)
    },[props?.info])

    useEffect(() => {
        if (props.size?.title) setSize(props?.size)
    },[props?.size])

    const selectFile = e => {
        let reader = new FileReader()
        reader.onload = function(e) {
            setFileReader(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
        setFile(e.target.files[0])
    }

    const addProduct = async () => {
        const formData = getFormData()
        await createProduct(formData).then(data => props?.back())
        fetchProducts().then(data => product.setProducts(data))
        category.setSelectedCategory({})
    }

    const editProduct = async (id) => {
        const formData = getFormData()
        await updateAllProduct(id, formData).then(data => props?.back())
        fetchProducts().then(data => product.setProducts(data))
        category.setSelectedCategory({})
    }

    const getFormData = () => {
        const formData = new FormData()
        formData.append('name', name.trim())
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('have', have)
        formData.append('article', article.trim())
        formData.append('description', description.trim())
        formData.append('promo', promo.trim())
        formData.append('country', country.trim())
        formData.append('size', JSON.stringify(size))
        formData.append('brandId', brand.selectedBrand.id)
        formData.append('categoryId', category.selectedCategory.id)
        formData.append('info', JSON.stringify(info))
        return formData
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
                            key={1}
                        >
                            Есть
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setHave(0)} 
                            active={!have}
                            key={2}
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

            <div className="inputBox">
                <Size size={size} setSize={setSize} />
            </div>

            <hr />

            <div className="inputBox">
                <Characteristic info={info} setInfo={setInfo} />
            </div>

            <hr />

            <div className='d-flex justify-content-end mb-4'>
                {action === "add" 
                ?
                    <Button variant="outline-success" onClick={addProduct}>Добавить продукцию</Button>
                :
                    <Button variant="outline-success" onClick={() => editProduct(props?.id)}>Изменить продукцию</Button>
                }
            </div>
           
            <hr />

        </Form>
    );
})

export default ProductService;
