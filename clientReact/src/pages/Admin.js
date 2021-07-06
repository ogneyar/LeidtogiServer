import React, { useState, useContext, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateProduct from '../components/modals/CreateProduct'
import CreateCategory from '../components/modals/CreateCategory'
import DeleteCategory from '../components/modals/DeleteCategory'
import DeleteBrand from '../components/modals/DeleteBrand'
import DeleteProduct from '../components/modals/DeleteProduct'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import {fetchProducts} from '../http/productAPI'

import '../styles/Admin.css';


const Admin = observer(() => {
    const {product, category} = useContext(Context)

    useEffect(() => {        
        fetchProducts(null, null, 1, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
            category.setSelectedCategory({})
            product.setSelectedBrand({})
        })
    },[])

    const [categoryVisible, setCategoryVisible] = useState(false)
    const [brandVisible, setBrandVisible] =  useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [deleteCategoryVisible, setDeleteCategoryVisible] = useState(false)
    const [deleteBrandVisible, setDeleteBrandVisible] = useState(false)
    const [deleteProductVisible, setDeleteProductVisible] = useState(false)

    return (
        <Container className="d-flex flex-column Admin">
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setCategoryVisible(true)}
            >
                Добавить категорию
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Добавить устройство
            </Button>
            <hr/>
            <Button 
                variant={"outline-danger"} 
                className="mt-4 p-2"
                onClick={() => setDeleteCategoryVisible(true)}
            >
                Удалить категорию
            </Button>
            <Button 
                variant={"outline-danger"} 
                className="mt-4 p-2"
                onClick={() => setDeleteBrandVisible(true)}
            >
                Удалить бренд
            </Button>
            <Button 
                variant={"outline-danger"} 
                className="mt-4 p-2"
                onClick={() => setDeleteProductVisible(true)}
            >
                Удалить устройство
            </Button>
            
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <DeleteCategory show={deleteCategoryVisible} onHide={() => setDeleteCategoryVisible(false)}/>
            <DeleteBrand show={deleteBrandVisible} onHide={() => setDeleteBrandVisible(false)}/>
            <DeleteProduct show={deleteProductVisible} onHide={() => setDeleteProductVisible(false)}/>
            
        </Container>
    )
})

export default Admin
