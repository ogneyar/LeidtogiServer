import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { Row } from 'react-bootstrap'
import ProductItem from './ProductItem'

const ProductList = observer(() => {
    const {product} = useContext(Context)
    return (
        <Row className='d-flex'>
            {product.totalCount > 0 
            ?
                product.products.map(product => 
                    <ProductItem key={product.id} product={product}/>    
                )
            : 
                <div class="m-4 p-4">
                    <p>
                        Таких товаров ещё нет...
                    </p>
                </div>
            }
        </Row>
    )
})

export default ProductList
