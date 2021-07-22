import React, { useState, useContext, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateBrand from '../components/admin/Brand'
import CreateProduct from '../components/admin/CreateProduct'
import Category from '../components/admin/Category'
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

    const [categoryVisible, setCategoryVisible] = useState(false)
    const [brandVisible, setBrandVisible] =  useState(false)
    const [productVisible, setProductVisible] = useState(false)
    
    const [deleteSiteVisible, setDeleteSiteVisible] = useState(false)

    return (
        <Container className="Content d-flex flex-column Admin Mobile">
            <Button 
                variant={"outline-dark"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setCategoryVisible(true)}
            >
                Редактор категорий
            </Button>

            <Button 
                variant={"outline-dark"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setBrandVisible(true)}
            >
                Редактор брендов
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setProductVisible(true)}
            >
                Редактор устройств
            </Button>

            <hr/>

            <Button 
                variant={"outline-danger"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setDeleteSiteVisible(true)}
            >
                Удалить САЙТ!!!
            </Button>
            
            <Category show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>

            <DeleteSite show={deleteSiteVisible} onHide={() => setDeleteSiteVisible(false)}/>
            
        </Container>
    )
})

export default Admin
