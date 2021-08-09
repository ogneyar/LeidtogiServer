import React, { useEffect, useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Category from '../../components/category/Category'
import BrandBar from '../../components/BrandBar'
import ProductList from '../../components/product/ProductList'
import Pagination from '../../components/Pagination'
import Filter from '../../components/filter/Filter'
import Loading from '../../components/Loading'

import { fetchProducts } from '../../http/productAPI'
import { fetchAllCategories } from '../../http/categoryAPI'
import { fetchBrands } from '../../http/brandAPI'

import { Context } from '../..'
import './Shop.css'


const Shop = observer(() => {

    const { product, category, brand } = useContext(Context)

    const [ loadingCategory, setLoadingCategory ] = useState(true)
    const [ loadingBrand, setLoadingBrand ] = useState(true)
    const [ loadingProduct, setLoadingProduct ] = useState(true)

    const { name } = useParams()

    useEffect(() => {
        const reOpenCategory = (array, item) => { // рекурсивная функция для открытия выбраных подкаталогов
            let response = []
            array.forEach(i => {
                if (item && item === i.id) {
                    response = [...response, i.id]
                    response = [...response, ...reOpenCategory(array, i.sub_category_id)]
                }
            })
            return response
        }
        // fetchProducts(null, null, 1, product.limit).then(data => {
        //     product.setProducts(data.rows)
        //     product.setTotalCount(data.count)
        // }).finally(data => setLoadingProduct(false))
        fetchAllCategories().then(data => {
            let arrayCategory = []
            data.forEach(i => {
                if (name && i.url === name) { // если в url указан категория (напиример: /instrumenti)
                    category.setSelectedCategory(i) // то сделать её выделенной (таким образом fetchProducts вызовится в следующем useEffect)
                    arrayCategory = [...arrayCategory, i.id]
                    arrayCategory = [...arrayCategory, ...reOpenCategory(data, i.sub_category_id)]
                }
            })
            category.setCategories(data.map(i => {
                if (name) { // если в url указана категория (напиример: /lopata)
                    let yes = false
                    arrayCategory.forEach(k => {
                        if (i.id === k) yes = true
                    })
                    if (yes) return {...i,open:true} // то её надо открыть
                }
                return {...i,open:false}
            }))
            if (!name) category.setSelectedCategory({}) // таким образом fetchProducts вызовится в следующем useEffect
        }).finally(data => setLoadingCategory(false))
        fetchBrands()
            .then(data => brand.setBrands(data))
            .finally(() => setLoadingBrand(false))
    },[])
    
    useEffect(() => {
        setLoadingProduct(true)

        const filterSubCategory = (id) => { // функция фильтрует из store все категории, которые не подходят для подкатегории id
            return category.categories.filter(i => i.sub_category_id === id) // и возвращает новый массив категорий
        }
    
        const reArray = (array) => { // рекурсивная функция принимает массив и возвращает увеличеный массив категорий
            let newArray = array
            array.forEach(i => {
                let arr = filterSubCategory(i.id) // функция фильтрует из store все категории
                newArray = [...newArray, ...arr] // наращивается массив
                newArray = [...newArray, ...reArray(arr)] // функция вызывает саму себя и наращивает массив
            })
            return newArray
        }
    
        const filterIsProduct = (array) => { // функция
            let arr = array.filter(i => i.is_product)
            return arr.map(i => i.id)
        }

        let selectedCategory // выбрана категория
        if (category.selectedCategory?.is_product || category.selectedCategory.id === undefined) { // если выбранная категория содержит товар || или пустой объект {- значит выбрано ВСЕ КАТЕГОРИИ} 
            selectedCategory = category.selectedCategory.id || null
        }else {
            let array = filterSubCategory(category.selectedCategory.id) // удаляем все категории, которые не подходят для подкатегории id
            selectedCategory = filterIsProduct( // удаляем категории в которых нет товаров - !is_product
                reArray(array) // наращиваем массив рекурсивной функцией
            )
        }
        fetchProducts(selectedCategory, brand.selectedBrand.id, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        }).finally(data => setLoadingProduct(false))
    },[product.page, product.limit, category.selectedCategory, brand.selectedBrand])
   

    return (
        <Container
            className="Shop Mobile"
        >
            <div className="ShopRow">
                <div className="ShopColCategory">
                    {loadingCategory ? <Loading /> : <Category />}
                </div>
                <div className="ShopColContent">
                    {loadingBrand ? <Loading /> : <BrandBar />}
                    <Filter />
                    {loadingProduct 
                    ? <Loading /> 
                    : <>
                        <ProductList />
                        <Pagination />
                    </>}
                    
                </div>
            </div>
        </Container>
    )
})

export default Shop
