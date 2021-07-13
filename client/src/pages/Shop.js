import React from 'react'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'
import { fetchProducts } from '../http/productAPI'
import { fetchCategories } from '../http/categoryAPI'
import { fetchBrands } from '../http/brandAPI'
import Pages from '../components/Pages'


const Shop = observer(() => {
    const {product, category, brand} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => category.setCategories(data))
        fetchBrands().then(data => brand.setBrands(data))
        fetchProducts(null, null, 1, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
            // category.setSelectedCategory({})
            // brand.setSelectedBrand({})
        })
    },[])

    useEffect(() => {
        fetchProducts(category.selectedCategory.id, brand.selectedBrand.id, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    },[product.page, category.selectedCategory, brand.selectedBrand])

    return (
        <Container
            className="Mobile"
        >
            <Row className="mt-2">
                <Col md={3}>
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
