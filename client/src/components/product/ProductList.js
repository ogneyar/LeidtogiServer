import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
// import { Row } from 'react-bootstrap'
import ProductItem from './ProductItem'
import './Product.css'


const ProductList = observer(() => {

    const { product } = useContext(Context)


    return (
        <div className='ProductList'>

            {product.totalCount > 0 && Array.isArray(product.products)
            ?
                product.products.map(product => 
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
