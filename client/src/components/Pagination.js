import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Pagination } from 'react-bootstrap'
import uuid from 'react-uuid'
import $ from 'jquery'

import { Context } from '..'


const Pages = observer(() => {

    const { product } = useContext(Context)

    // const [ doted, setDoted ] = useState(false)
    let doted = false
    
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []
    
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    
    // const [ mobile, setMobile ] = useState(false)

    // useEffect(() => {
    //     if (window.innerWidth < 430) setMobile(true)
    //     else setMobile(false)
    // }, [window.innerWidth])
    
    const onClick = (page) => {
        if (window.innerWidth > 991) {
            $('html, body').animate(
                {scrollTop: 240}, 
                700, 
                function(){}
            )
        }else {
            $('html, body').animate(
                {scrollTop: 130}, 
                700, 
                function(){}
            )
        }
        product.setPage(page)
    }

    return (
        <Pagination 
            size={window.innerWidth < 430 && "sm"} 
            className="mt-2"
        >
            {pages.length > 10 
            ? 
                <Pagination.First
                    onClick={() =>{product.page !== 1 && onClick(1)}}
                    disabled={product.page === 1 && true}
                /> 
            : null}
            {pages.length > 10 
            ? 
                <Pagination.Prev
                    onClick={() =>{product.page !== 1 && onClick(product.page - 1)}}
                    disabled={product.page === 1 && true}
                /> 
            : null}
            {pages.map(page => 
                (
                pages.length > 10 
                ? 
                    product.page < 5 // если выбраная страница от 1 до 4
                    ?
                        page < 8 // то показывать первые 7 кнопок
                        ?
                            <Pagination.Item
                                key={page}
                                active={product.page === page}
                                onClick={() => onClick(page)}
                            >
                                {page}
                            </Pagination.Item>
                        : 
                            !doted // если ещё небыло показано троеточие
                            ? // то показать
                                <Pagination.Item
                                    key={page}
                                    disabled
                                    >
                                    ...
                                    {doted = true}
                                </Pagination.Item>
                            : null
                    :
                        product.page >= pages.length - 3 // если выбраная страница от конца 4ая, 3ья, предпоследняя или последняя
                        ?
                            page > pages.length - 7 // то показывать последние 7 кнопок
                            ?
                                <Pagination.Item
                                    key={page}
                                    active={product.page === page}
                                    onClick={() => onClick(page)}
                                >
                                    {page}
                                </Pagination.Item>
                            : 
                                !doted // если ещё небыло показано троеточие
                                ? // то показать
                                    <Pagination.Item
                                        key={uuid()}
                                        disabled
                                        >
                                        ...
                                        {doted = true}
                                    </Pagination.Item>
                                : null

                        : // иначе, если выбраная страница где-то в середине
                            page <= product.page + 3 && page >= product.page - 3 // то показать 7 штук
                            ?
                                <Pagination.Item
                                    key={page}
                                    active={product.page === page}
                                    onClick={() => onClick(page)}
                                >
                                    {page}
                                    {doted = false}
                                </Pagination.Item>
                            : 
                                !doted // если ещё небыло показано троеточие
                                ? // то показать
                                    <Pagination.Item
                                        key={page}
                                        disabled
                                        >
                                        ...
                                        {doted = true}
                                    </Pagination.Item>
                                : null

                :
                    <Pagination.Item
                        key={page}
                        active={product.page === page}
                        onClick={() => onClick(page)}
                    >
                        {page}
                    </Pagination.Item>
               
                )
            )}
            {pages.length > 10 
            ? 
                <Pagination.Next
                    onClick={() =>{product.page !== pages.length && onClick(product.page + 1)}}
                    disabled={product.page === pages.length && true}
                /> 
            : null}
            {pages.length > 10 
            ? 
                <Pagination.Last
                    onClick={() =>{product.page !== pages.length && onClick(pages.length)}}
                    disabled={product.page === pages.length && true}
                /> 
            : null}
        </Pagination>
    )
})

export default Pages
