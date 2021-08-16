import React, { useState, useContext, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import Category from '../components/admin/Category'
import Brand from '../components/admin/Brand'
import Product from '../components/admin/Product'
import DeleteSite from '../components/admin/DeleteSite'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import {fetchProducts} from '../http/productAPI'

import '../styles/Admin.css';


const Admin = observer(() => {
    const {product, category, brand} = useContext(Context)

    useEffect(() => {
        fetchProducts(null, null, 1, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
            category.setSelectedCategory({})
            brand.setSelectedBrand({})
        })
    },[])

    // useEffect(() => {
    //     if (product.allProducts.length) console.log("admin product.allProducts",product.allProducts.length)
    // },[product.allProducts])

    // useEffect(() => {
    //     if (category.categories.length) console.log("admin category.categories",category.categories.length)
    // },[category.categories])

    // useEffect(() => {
    //     if (brand.brands.length) console.log("admin brand.brands",brand.brands.length)
    // },[brand.brands])

    const [categoryVisible, setCategoryVisible] = useState(false)
    const [brandVisible, setBrandVisible] =  useState(false)
    const [productVisible, setProductVisible] = useState(false)
    
    const [deleteSiteVisible, setDeleteSiteVisible] = useState(false)

    return (
        <Container className="Content d-flex flex-column Admin Mobile">
            <Button 
                variant={"outline-dark"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setProductVisible(true)}
            >
                Редактор продукции
            </Button>

            <Button 
                variant={"outline-dark"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setCategoryVisible(true)}
            >
                Редактор категорий
            </Button>

            <Button 
                variant={"outline-dark"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setBrandVisible(true)}
            >
                Редактор брендов
            </Button>

            <hr/>

            <Button 
                variant={"outline-danger"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setDeleteSiteVisible(true)}
            >
                Удалить САЙТ!!!
            </Button>
            
            <Product show={productVisible} onHide={() => setProductVisible(false)}/>
            <Category show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <Brand show={brandVisible} onHide={() => setBrandVisible(false)}/>

            <DeleteSite show={deleteSiteVisible} onHide={() => setDeleteSiteVisible(false)}/>
            
        </Container>
    )
})

export default Admin
