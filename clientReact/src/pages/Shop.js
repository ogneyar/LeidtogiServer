import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'
import { useEffect } from 'react'
import {fetchBrands, fetchTypes, fetchProducts} from '../http/productAPI'
import Pages from '../components/Pages'


const Shop = observer(() => {
    const {product} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchProducts(null, null, 1, product.limit).then(data => {
            product.setDevices(data.rows)
            product.setTotalCount(data.count)
            product.setSelectedType({})
            product.setSelectedBrand({})
        })
    },[])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, product.limit).then(data => {
            product.setDevices(data.rows)
            product.setTotalCount(data.count)
        })
    },[product.page, product.selectedType, product.selectedBrand])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
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
