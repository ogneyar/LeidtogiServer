import React from 'react'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'
import {fetchBrands, fetchProducts} from '../http/productAPI'
import {fetchCategoryes} from '../http/categoryAPI.js'
import Pages from '../components/Pages'


const Shop = observer(() => {
    const {product, category} = useContext(Context)

    useEffect(() => {
        fetchCategoryes().then(data => category.setCategoryes(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchProducts(null, null, 1, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
            // category.setSelectedCategory({})
            // product.setSelectedBrand({})
        })
    },[])

    useEffect(() => {
        fetchProducts(category.selectedCategory.id, product.selectedBrand.id, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    },[product.page, category.selectedCategory, product.selectedBrand])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    {/* <TypeBar /> */}
                    <CategoryBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <ProductList />
                    <Pages />
                </Col>
            </Row>            
        </Container>
    )
})

export default Shop
