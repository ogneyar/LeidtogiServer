import React, { useState, useContext, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateProduct from '../components/modals/CreateProduct'
import Category from '../components/modals/Category'
import DeleteBrand from '../components/modals/DeleteBrand'
import DeleteProduct from '../components/modals/DeleteProduct'
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
    
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false)
    const [deleteProductVisible, setDeleteProductVisible] = useState(false)

    return (
        <Container className="Content d-flex flex-column Admin Mobile">
            <Button 
                variant={"outline-dark"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setCategoryVisible(true)}
            >
                Редактирование категорий
            </Button>

            <Button 
                variant={"outline-dark"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setProductVisible(true)}
            >
                Добавить устройство
            </Button>

            <hr/>

            <Button 
                variant={"outline-danger"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setDeleteBrandVisible(true)}
            >
                Удалить бренд
            </Button>
            <Button 
                variant={"outline-danger"} 
                className="m-2 p-2 Admin_button"
                onClick={() => setDeleteProductVisible(true)}
            >
                Удалить устройство
            </Button>
            
            <Category show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <DeleteBrand show={deleteBrandVisible} onHide={() => setDeleteBrandVisible(false)}/>
            <DeleteProduct show={deleteProductVisible} onHide={() => setDeleteProductVisible(false)}/>
            
        </Container>
    )
})

export default Admin
