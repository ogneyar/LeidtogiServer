import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
// import { Row } from 'react-bootstrap'
import ProductItem from './ProductItem'
import './Product.css'


const ProductList = observer(() => {

    const { product } = useContext(Context)

    const [info, setInfo] = useState([])

    useEffect(() => {
        let offset = product.page * product.limit - product.limit // отступ
        let limit = 0

        setInfo(product.products.filter((i,index) => {
            if (index + 1 > offset) {
                limit += 1
                if (limit <= product.limit) return true
            }
            return false
        }))
    },[product.limit, product.page, product.selectedCategory, product.products])
    

    return (
        <div className='ProductList'>

            {info && product.totalCount > 0 && Array.isArray(info)
            ?
                info.map(product => 
                    <ProductItem key={product.id} product={product}/>
                )
            :
                <div className="m-4 p-4">
                    <p>
                        Таких товаров ещё нет...
                    </p>
                </div>
            }

        </div>
    )
})

export default ProductList
