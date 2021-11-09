import React, { useContext, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import $ from 'jquery'

import { fetchProductInfos, fetchProductSizes } from '../../../http/productAPI'
import Loading from '../../../components/Loading';
import { Context } from '../../..'
import ProductService from './ProductService';
import { API_URL } from '../../../utils/consts';


const SearchAdminService = observer((props) => {

    const {product, category} = useContext(Context)

    const [article, setArticle] = useState("")
    const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(true)

    const [visibleProductService, setVisibleProductService] = useState(false)

    const [productSearch, setProductSearch] = useState({})

    const [info, setInfo] = useState([])
    const [size, setSize] = useState({})

    
    useEffect(() => {
        if (product.allProducts.length) {
            setLoading(false)
        }
    },[product.allProducts])

    useEffect(() => {
        if (!loading && article !== "") {
            setSearch(product.allProducts.filter(i => i.article.includes(article)))
        }else setSearch([])
        // eslint-disable-next-line
    },[article])

    
    const onClickDivArticle = (item) => {
        if (props?.action === "edit") {
            fetchProductInfos(item.id).then(data => {
                if (data[0]?.title !== undefined) setInfo(data)
            })
            fetchProductSizes(item.id).then(data => {
                if (data) setSize(data)
            })
        }
        setSearch([])
        setArticle("")
        category.allCategories.forEach(i => {
            if (item.categoryId === i.id) category.setSelectedCategory(i)
        })
        setProductSearch(item)

        setVisibleProductService(true)
        $('.modal').animate(
            {
                scrollTop: 0
            }, 
            700, 
            function(){}
        )
    }


    return (
        <div>
            {loading 
            ? 
                <Loading /> 
            : 
                !visibleProductService
                ?
                    <div 
                        className="inputBox" // этот класс из index.css
                    >
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
                            className={"divArticle"} // этот класс из index.css
                            key={i.id}
                        >
                            <div
                                className="SearchListItem" // этот класс из компонента Search
                                onClick={() => onClickDivArticle(i)}
                            >
                                <img 
                                    className="SearchListItemImg" // этот класс из компонента Search
                                    src={Array.isArray(i.img)  && i.img[0]?.small !== undefined
                                    ? API_URL + i.img[0].small
                                    : API_URL + "unknown.jpg"
                                    } 
                                    alt={i.name}
                                />
                                <div
                                    className="SearchListItemBody" // этот класс из компонента Search
                                >
                                    <div
                                        className="SearchListItemBodyBoxTitle" // этот класс из компонента Search
                                    >
                                        <div
                                            className="SearchListItemBodyName" // этот класс из компонента Search
                                        >
                                            {i.name}
                                        </div>
                                        <div
                                            className="SearchListItemBodyArticle" // этот класс из компонента Search
                                        >
                                            артикул: {i.article}
                                        </div>
                                    </div>

                                    <div
                                        className="SearchListItemBodyPrice" // этот класс из компонента Search
                                    >
                                        <div>
                                            {i.price} р.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) 
            : 
                null
            }

            {visibleProductService && productSearch?.id
            ? 
                <ProductService 
                    action={props?.action}
                    back={props?.back}
                    id={productSearch?.id}
                    name={productSearch?.name}
                    price={productSearch?.price}
                    file={Array.isArray(productSearch?.img)  && productSearch?.img[0]?.small !== undefined
                    ? API_URL + productSearch.img[0].small
                    : API_URL + "unknown.jpg"}
                    have={productSearch?.have}
                    article={productSearch?.article}
                    promo={productSearch?.promo}
                    country={productSearch?.country}
                    info={props?.action === "edit" ? info : null}
                    size={props?.action === "edit" ? size : null}
                /> 

            : null}
        </div>
    );
})

export default SearchAdminService;
