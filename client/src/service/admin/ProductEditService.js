import React, { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { fetchAllProducts } from '../../http/productAPI'
import { Context } from '../..'
import Loading from '../../components/Loading';


const ProductEditService = observer((props) => {

    const {product, category, brand} = useContext(Context)

    const [article, setArticle] = useState("")
    const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAllProducts().then(data => {
            // console.log(data.length);
            product.setProducts(data)
            product.setTotalCount(data.length)
            // setSearch(data)
            setLoading(false)
        })
    },[])

    useEffect(() => {
        if (!loading && article !== "") {
            setSearch(product.products.filter(i => i.article.includes(article)))
            // console.log(product.products.filter(i => i.article.includes(article)));
        }
    },[article])

    return (
        <Form className='mt-4'>
            <hr />

            {loading 
            ? 
                <Loading /> 
            : 
                <div className="inputBox">
                    <label>Поиск по артикулу: </label>
                    <Form.Control    
                        value={article}
                        onChange={e => setArticle(e.target.value.toString())}
                        placeholder={'Введите артикул'}
                    />
                </div>
            }

            {search 
            ? 
                search.map(i => {
                    return <div className="pt-3" key={i.id}>{i.article}</div>
                }) 
            : 
                null
            }

            <div className='d-flex justify-content-end mt-4'>
                <Button variant="outline-warning" onClick={props?.back}>Отменить редактирование</Button>
            </div>

            <hr />
        </Form>
    );
})

export default ProductEditService;
