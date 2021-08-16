import React, { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { fetchAllProducts, fetchProductInfos, fetchProductSizes } from '../../../http/productAPI'
import { fetchAllCategories } from '../../../http/categoryAPI'
import Loading from '../../../components/Loading';
import { Context } from '../../..'

import './ProductEditService.css'
import ProductService from './ProductService';
import { API_URL } from '../../../utils/consts';


const ProductEditService = observer((props) => {

    const {product, category, brand} = useContext(Context)

    const [article, setArticle] = useState("")
    const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(true)

    const [visibleProductService, setVisibleProductService] = useState(false)

    const [productEdit, setProductEdit] = useState({})

    const [info, setInfo] = useState({})
    const [size, setSize] = useState({})
    

    useEffect(() => {
        // fetchAllProducts().then(data => {
        //     product.setProducts(data)
        //     product.setTotalCount(data.length)
        //     setLoading(false)
        // })
        fetchAllCategories().then(data => {
            category.setCategories(data)
        })
    },[])

    useEffect(() => {
        if (product.allProducts.length) {
            setLoading(false)
            // console.log(product.allProducts);
        }
    },[product.allProducts])

    useEffect(() => {
        if (!loading && article !== "") {
            setSearch(product.allProducts.filter(i => i.article.includes(article)))
        }
    },[article])

    const onClickDivArticle = (item) => {
        fetchProductInfos(item.id).then(data => {
            if (data) setInfo(data)
        })
        fetchProductSizes(item.id).then(data => {
            if (data) setSize(data)
        })
        setSearch([])
        setArticle("")
        category.categories.forEach(i => {
            if (item.categoryId === i.id) category.setSelectedCategory(i)
        })
        setProductEdit(item)
        setVisibleProductService(true)
    }


    return (
        <div className='mt-4'>
            <hr />

            {loading 
            ? 
                <Loading /> 
            : 
                !visibleProductService
                ?
                    <div className="inputBox">
                        <label>Поиск по артикулу: </label>
                        <Form.Control    
                            value={article}
                            onChange={e => setArticle(e.target.value.toString())}
                            placeholder={'Введите артикул'}
                        />
                    </div>
                : null
            }

            {search 
            ? 
                search.map(i => {
                    return (
                        <div 
                            className={"divArticle"}
                            key={i.article}
                            onClick={() => onClickDivArticle(i)}
                        >
                            {i.article}
                        </div>
                    )
                }) 
            : 
                null
            }

            {visibleProductService && productEdit?.id
            ? 
                <ProductService
                    action="edit"
                    back={props?.back}
                    id={productEdit?.id}
                    name={productEdit.name}
                    price={productEdit.price}
                    file={API_URL + productEdit.img}
                    have={productEdit.have}
                    article={productEdit.article}
                    description={productEdit.description}
                    promo={productEdit.promo}
                    country={productEdit.country}
                    info={info}
                    size={size}
                /> 

            : null}

            <div className='DivButtonBack'>
                <Button variant="outline-warning" onClick={props?.back}>Отменить редактирование</Button>
            </div>

            <hr />
        </div>
    );
})

export default ProductEditService;
