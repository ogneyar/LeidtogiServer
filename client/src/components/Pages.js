import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '..'

const Pages = observer(() => {
    const {product} = useContext(Context)
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-2">
            {/* {product.totalCount > product.limit ? <Pagination.First /> : ""}
            {product.totalCount > product.limit ? <Pagination.Prev /> : ""}             */}
            {pages.map(page => 
                <Pagination.Item
                    key={page}
                    active={product.page === page}
                    onClick={() => product.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
            {/* {product.totalCount > product.limit ? <Pagination.Next /> : ""}
            {product.totalCount > product.limit ? <Pagination.Last /> : ""} */}
        </Pagination>
    )
})

export default Pages
