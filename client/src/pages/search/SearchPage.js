import React, { useEffect, useContext, useState, useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

import BrandBar from '../../components/BrandBar'
import CategoryBar from '../../components/category/CategoryBar'
import ProductList from '../../components/product/ProductList'
import Pagination from '../../components/Pagination'
import Filter from '../../components/filter/Filter'
import Loading from '../../components/Loading'

import { Context } from '../..'


const SearchPage = observer(() => {

    const { product, category, brand } = useContext(Context)
    
    const [ loadingCategory, setLoadingCategory ] = useState(true)
    const [ loadingBrand, setLoadingBrand ] = useState(true)
    const [ loadingProduct, setLoadingProduct ] = useState(false)

    const [value, setValue] = useQueryParam('value', StringParam)

    // const history = useHistory()

    useEffect(() => {
        if (product.allProducts.length) {
            let length = 0
            product.setProducts(product.allProducts.filter(i => {
                if (value) {
                    if (i.article.includes(value)) {
                        length++
                        return true
                    }
                }
                return false
            }))
            product.setTotalCount(length)
            setLoadingProduct(false)
        }
    },[product.allProducts, value])

    useEffect(() => {
        if (category.allCategories.length) {
            category.setCategories(category.allCategories)
            category.setSelectedCategory({})
            setLoadingCategory(false)
        }
    },[category.allCategories])

    useEffect(() => {
        if (brand.allBrands.length) {
            brand.setBrands(brand.allBrands)
            setLoadingBrand(false)
        }
    },[brand.allBrands])


    return (
        <Container
            className="Shop Mobile"
        >
        <div className="ShopRow">
            <div className="ShopColCategory">
                {loadingCategory ? <Loading /> : <CategoryBar search />}
            </div>
            <div className="ShopColContent">
                {loadingBrand ? <Loading /> : <BrandBar />}
                <Filter />
                {loadingProduct 
                ? <Loading /> 
                : <>
                    <ProductList search />
                    <Pagination />
                </>}
                
            </div>
        </div>
        </Container>
    )
})

export default SearchPage;
