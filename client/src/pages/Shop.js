import React, { useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import CategoryBar from '../components/CategoryBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/product/ProductList'
import Pages from '../components/Pagination'
import Filter from '../components/filter/Filter'

import { fetchProducts } from '../http/productAPI'
import { fetchCategories } from '../http/categoryAPI'
import { fetchBrands } from '../http/brandAPI'

import { Context } from '..'
import { LIMIT } from '../utils/consts'

const Shop = observer(() => {
    const { product, category, brand } = useContext(Context)


    useEffect(() => {
        let limit = localStorage.getItem('limit') || LIMIT
        // console.log(limit);
        if (limit !== product.limit) product.setLimit(limit)
        else {
            fetchProducts(null, null, 1, product.limit).then(data => {
                product.setProducts(data.rows)
                product.setTotalCount(data.count)
            })
        }
        fetchCategories().then(data => category.setCategories(data))
        fetchBrands().then(data => brand.setBrands(data))        
    },[])

    useEffect(() => {
        fetchProducts(category.selectedCategory.id, brand.selectedBrand.id, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    },[product.page, product.limit, category.selectedCategory, brand.selectedBrand])

    return (
        <Container
            className="Content Mobile"
        >
            <Row className="mt-2">
                <Col md={3}>
                    <CategoryBar />
                </Col>
                <Col md={9}>
                    <BrandBar />

                    <Filter />

                    <ProductList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop
